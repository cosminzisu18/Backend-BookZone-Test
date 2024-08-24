using BookzoneAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserDto>> GetUsersWithOrdersOver1000Async()
    {
        var stopwatch = new Stopwatch();
        stopwatch.Start();

        var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);

        var result = await _context.Users
            .Where(u => _context.Orders
                .Where(o => o.UserId == u.Id && o.DateAdded >= sixMonthsAgo)
                .Join(_context.OrderProducts,
                    o => o.Id,
                    op => op.OrderId,
                    (o, op) => new { o, op })
                .GroupBy(x => x.o.UserId)
                .Select(g => new
                {
                    UserId = g.Key,
                    TotalSpent = g.Sum(x => x.op.Price * x.op.Quantity)
                })
                .Any(g => g.TotalSpent > 1000))
            .Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name
            })
            .ToListAsync();

        stopwatch.Stop();
        var elapsedMilliseconds = stopwatch.ElapsedMilliseconds;

  
        Console.WriteLine($"Query executed in {elapsedMilliseconds}ms");

        return result;
    }
}

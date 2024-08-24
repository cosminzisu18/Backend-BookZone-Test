using BookzoneAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddOrderAsync(Order order)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == order.UserId);
        if (!userExists)
        {
            throw new ArgumentException("User not found");
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
    }
}
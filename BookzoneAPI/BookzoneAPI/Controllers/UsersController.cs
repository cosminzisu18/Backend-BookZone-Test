using BookzoneAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("high-value-orders")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersWithHighValueOrders()
    {
        var users = await _userRepository.GetUsersWithOrdersOver1000Async();
        return Ok(users);
    }
}

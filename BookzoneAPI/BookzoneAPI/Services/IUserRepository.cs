using BookzoneAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserRepository
{
    Task<IEnumerable<UserDto>> GetUsersWithOrdersOver1000Async();
}

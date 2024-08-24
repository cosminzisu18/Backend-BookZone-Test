using BookzoneAPI.Models;
using System.Threading.Tasks;

public interface IOrderService
{
    Task AddOrderAsync(Order order);
}

using BookzoneAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookzoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDto orderDto)
        {
            if (orderDto == null || orderDto.OrderProducts == null || !orderDto.OrderProducts.Any())
            {
                return BadRequest("Invalid order data.");
            }

            var order = new Order
            {
                UserId = orderDto.UserId,
                DateAdded = orderDto.DateAdded
            };

            foreach (var orderProductDto in orderDto.OrderProducts)
            {
                var orderProduct = new OrderProduct
                {
                    ProductId = orderProductDto.ProductId,
                    Quantity = orderProductDto.Quantity,
                    Price = orderProductDto.Price
                };
                order.OrderProducts.Add(orderProduct);
            }

            _context.Orders.Add(order);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Database update error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}

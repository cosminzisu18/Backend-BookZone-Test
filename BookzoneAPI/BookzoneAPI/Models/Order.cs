using BookzoneAPI.Models;
using System.Text.Json.Serialization;

namespace BookzoneAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }

        public User User { get; set; } = new User();
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }


}

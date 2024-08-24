using System;
using System.Collections.Generic;

namespace BookzoneAPI.Models
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }
        public List<OrderProductDto> OrderProducts { get; set; } = new List<OrderProductDto>();
    }
}

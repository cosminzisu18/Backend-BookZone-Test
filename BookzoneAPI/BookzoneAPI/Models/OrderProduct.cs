using BookzoneAPI.Models;
using System.Text.Json.Serialization;

public class OrderProduct
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }

    // [JsonIgnore] to prevent serialization of circular references
    [JsonIgnore]
    public virtual Order? Order { get; set; }
    public virtual Product? Product { get; set; }
}
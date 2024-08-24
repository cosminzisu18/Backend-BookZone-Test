using BookzoneAPI.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Order> Orders { get; set; } = new List<Order>();  // Relație one-to-many cu Order
}

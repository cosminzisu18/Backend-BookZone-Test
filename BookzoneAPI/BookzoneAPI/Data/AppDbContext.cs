using Microsoft.EntityFrameworkCore;
using BookzoneAPI.Models;

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<User> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(b =>
        {
            b.Property(p => p.Name)
                .HasMaxLength(128)  // Specifică lungimea maximă pentru indexare
                .IsRequired();

            b.HasIndex(p => p.Name)  // Creează index pe coloana Name
                .HasDatabaseName("IDX_Products_Name");

            b.Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            b.HasKey(p => p.Id);
            b.ToTable("Products");
        });

        modelBuilder.Entity<Order>(b =>
        {
            b.HasKey(o => o.Id);
            b.HasIndex(o => o.UserId);  // Index pentru UserId
            b.HasIndex(o => o.DateAdded);  // Index pentru DateAdded
            b.ToTable("Orders");
        });

        modelBuilder.Entity<OrderProduct>(b =>
        {
            b.HasKey(op => op.Id);
            b.HasIndex(op => op.OrderId);  // Index pentru OrderId
            b.HasIndex(op => op.ProductId);  // Index pentru ProductId
            b.ToTable("OrderProducts");
        });

        modelBuilder.Entity<User>(b =>
        {
            b.HasKey(u => u.Id);
            b.ToTable("Users");
        });
    }


    public void SeedData()
    {
        if (!Products.Any())
        {
            var products = new List<Product>();
            for (int i = 1; i <= 10000; i++)
            {
                products.Add(new Product { Name = "Product" + i, Price = new Random().Next(1, 100) });
            }
            Products.AddRange(products);
            SaveChanges();
        }

        if (!Users.Any())
        {
            var users = new List<User>();
            for (int i = 1; i <= 10000; i++)
            {
                users.Add(new User { Name = "User" + i });
            }
            Users.AddRange(users);
            SaveChanges();
        }

        if (!Orders.Any())
        {
            var orders = new List<Order>();
            var random = new Random();
            for (int i = 1; i <= 100000; i++)
            {
                orders.Add(new Order
                {
                    UserId = random.Next(1, 10001),
                    DateAdded = DateTime.Now.AddDays(-random.Next(1, 365))
                });
            }
            Orders.AddRange(orders);
            SaveChanges();
        }

        if (!OrderProducts.Any())
        {
            var orderProducts = new List<OrderProduct>();
            var random = new Random();
            for (int i = 1; i <= 300000; i++)
            {
                orderProducts.Add(new OrderProduct
                {
                    OrderId = random.Next(1, 100001),
                    ProductId = random.Next(1, 10001),
                    Quantity = random.Next(1, 10),
                    Price = random.Next(1, 100)
                });
            }
            OrderProducts.AddRange(orderProducts);
            SaveChanges();
        }
    }
}

namespace BookzoneAPI.Models
{
    public class TopSellingProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int UnitsSold { get; set; }
        public decimal TotalSalesValue { get; set; }
    }
}

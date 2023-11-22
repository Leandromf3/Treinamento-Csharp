namespace Treinamento_C_.Entities
{
    public class SaleEntity
    {
        public List<string>? productCode { get; set; }
        public string seller { get; set; }
        public int code { get; set; }
        public string CEP { get; set; }
        public string? obs { get; set; }
        public float? value { get; set; }
        public string? location { get; set; }
        public DateTime? date { get; set; }
    }
}

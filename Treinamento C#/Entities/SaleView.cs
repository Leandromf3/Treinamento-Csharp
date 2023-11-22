namespace Treinamento_C_.Entities
{
    public class SaleView
    {
        public string vendedor { get; set; }
        public int cod { get; set; }
        public string Rua { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public DateTime dataVenda { get; set; }
        public string? obs { get; set; }
        public float price { get; set; }
    }
}

using System.Data;
using Treinamento_C_.Entities;
using System.Globalization;

namespace Treinamento_C_.Repository
{
    public class ProductRepository : BaseRepository
    {

        public string create(Product produto)
        {
            try
            {
                string query1 = $"SELECT * FROM dbo.products WHERE productCode = {produto.productCode}";
                DataTable dt1 = ExecQueryTeste(query1);

                if(dt1.Rows.Count > 0)
                {
                    throw new Exception();
                }

                string query = $"INSERT INTO dbo.products (productName, productCode, productQuant, productPrice) " +
                    $"VALUES('{produto.productName}', '{produto.productCode}', '{produto.productQuant}', '{produto.productPrice}')";
                DataTable dt = ExecQueryTeste(query);
                return dt.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public float getByCode(string code)
        {
            try
            {
                string query = $"SELECT * FROM dbo.products WHERE productCode='{code}'";
                DataTable result = ExecQueryTeste(query);

                if (result.Rows.Count == 0)
                {
                    return 0;
                }

                float price = 0;

                foreach (DataRow row in result.Rows)
                {
                    price = float.Parse(row["productPrice"].ToString(), CultureInfo.InvariantCulture);
                }

                return price;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Product> Get()
        {
            try
            {
        public List<Product> Get()
        {
            try
            {
                string query = $"SELECT * FROM dbo.products";
                List<Product> tudo = new List<Product>();
                DataTable result = ExecQueryTeste(query);

                if (result.Rows.Count == 0)
                {
                    return null;
                }

                foreach (DataRow row in result.Rows)
                {
                    var item = new Product
                    {
                        productName = Convert.ToString(row["productName"]),
                        productCode = Convert.ToString(row["productCode"]),
                        productPrice = Convert.ToDouble(row["productPrice"]),
                        productQuant = Convert.ToInt32(row["productQuant"])
                    };
                    tudo.Add(item);
                }

                return tudo;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}

using System.Data;
using Treinamento_C_.Entities;

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

        public ProductV Get()
        {
            try
            {
                string query = $@"SELECT Product.Name, ProductNumber, StandardCost, ListPrice, ProductCategory.Name as Cat, 
ProductSubcategory.Name as Sub
FROM Production.Product
INNER JOIN Production.ProductCategory ON ProductCategory.Name=Production.ProductCategory.Name 
INNER JOIN Production.ProductSubcategory ON ProductSubcategory.Name=Production.ProductSubcategory.Name
";
                //INNER JOIN Production.ProductModel ON ProductModel.CatalogDescription=Production.ProductModel.CatalogDescription
                //WHERE CatalogDescription IS NULL";


                List<ProductAll> tudo = new List<ProductAll>();
                DataTable result = ExecQuery(query);

                if (result.Rows.Count == 0)
                {
                    return null;
                }

                foreach (DataRow row in result.Rows)
                {
                    var item = new ProductAll
                    {
                        productName = Convert.ToString(row["Name"]),
                        productNumber = Convert.ToString(row["ProductNumber"]),
                        standartCost = Math.Round(Convert.ToDecimal(row["StandardCost"]), 2),
                        listPrice = Math.Round(Convert.ToDecimal(row["ListPrice"]), 2),
                        catalogDesc = Convert.ToString(row["CatalogDescription"]),
                        subcategoryName = Convert.ToString(row["Sub"]),
                        categoryName = Convert.ToString(row["Cat"])
                    };

                    if (item.standartCost > 0)
                    {
                        var diffP = Math.Round(item.listPrice - item.standartCost, 2);
                        var diffPor = Math.Round((item.listPrice - item.standartCost) / item.listPrice * 100, 2);
                        item.diferencaPreco = diffP;
                        item.diferencaPorcent = diffPor;
                    }

                    tudo.Add(item);

                }
                decimal totalCoast = Math.Round(tudo.Sum(x => x.standartCost), 2);
                decimal totalPrice = Math.Round(tudo.Sum(x => x.listPrice), 2);

                return new ProductV
                {
                    totalProducts = tudo.Count,
                    totalCost = totalCoast,
                    totalPrice = totalPrice,
                    totalDiffP = totalPrice,
                    totalDiffPor = Math.Round((totalPrice - totalCoast) / totalPrice * 100, 2),
                    allItens = tudo
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}

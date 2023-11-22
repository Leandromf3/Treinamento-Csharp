using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using Treinamento_C_.Entities;
using System.Globalization;


namespace Treinamento_C_.Repository
{
    public class saleRepository : BaseRepository
    {
        public List<SaleView> getAll()
        {
            try
            {
                string query = "SELECT * FROM dbo.vendas";
                List<SaleView> tudo = new List<SaleView>();
                DataTable dt = ExecQueryTeste(query);

                foreach (DataRow row in dt.Rows) 
                {
                    var aux = new SaleView()
                    {
                        vendedor = Convert.ToString(row["ST_NAME"]),
                        cod = Convert.ToInt32(row["codigo"]),
                        Rua = Convert.ToString(row["Rua"]),
                        Estado = Convert.ToString(row["Estado"]),
                        Cidade = Convert.ToString(row["Cidade"]),
                        dataVenda = Convert.ToDateTime(row["dataVenda"]),
                        obs = Convert.ToString(row["obs"]),
                        price = float.Parse(row["valor"].ToString(), CultureInfo.InvariantCulture)
                    };
                    tudo.Add(aux);
                }
                return tudo;

            }
            catch (Exception)
            {

                throw;
            }
            
        }

        public async Task<string> createSale(SaleEntity entity)
        {
            try
            {
                string queryVerify = $"SELECT * FROM dbo.vendas WHERE codigo='{entity.code}'";
                DataTable dataVeryfi = ExecQueryTeste(queryVerify);

                if (dataVeryfi.Rows.Count != 0)
                {
                    throw new Exception();
                }

                LocationEntity endereco = await request(entity.CEP);
                DateTime date = DateTime.Now;
                string dateformate = date.ToString("dd/MM/yyyy HH:mm");
                float valorTotal = this.calculo(entity.productCode);

                if (entity.obs != "")
                {
                    string query = $"INSERT INTO dbo.vendas (ST_NAME, codigo, Rua, Estado, Cidade, dataVenda, valor, obs) VALUES ('{entity.seller}', '{entity.code}', '{endereco.logradouro}','{endereco.uf}' ,'{endereco.localidade}','{dateformate}','{valorTotal}', '{entity.obs}')";
                    DataTable dt1 = ExecQueryTeste(query);
                }
                else
                {
                    string query = $"INSERT INTO dbo.vendas (ST_NAME, codigo, Rua, Estado, Cidade, dataVenda, valor) VALUES ('{entity.seller}', '{entity.code}', '{endereco.logradouro}', '{endereco.uf}', '{endereco.localidade}','{dateformate}','{valorTotal}')";
                    DataTable dt1 = ExecQueryTeste(query);
                }

                return "ok";
            }
            catch (Exception)
            {
                throw new BadHttpRequestException("Erro no cadastro");
            }
            
        }

        private float calculo(List<string> products)
        {
            float total = 0;
            foreach (var product in products)
            {
                float valor = new ProductRepository().getByCode(product);
                total = total + valor;

            }
            return total;
        }

        private static async Task<LocationEntity> request(string cep)
        {
            string url = $"https://viacep.com.br/ws/{cep}/json/";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);
                if(response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    LocationEntity jsonDeserialize = JsonConvert.DeserializeObject<LocationEntity>(jsonResponse);
                    return jsonDeserialize;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}

using BCrypt.Net;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System;
using System.Data;
using System.Data.SqlClient;
using Treinamento_C_.Entities;


namespace Treinamento_C_.Repository
{
    public class MainRepository : BaseRepository
    {

        public string register(UserEntity entity)
        {
            try
            {
                string query = $"SELECT * FROM dbo.usuarios WHERE ST_LOGIN='{entity.ST_LOGIN}'";
                List<UserEntity> user = new List<UserEntity>();
                DataTable resultUser = ExecQueryTeste(query);

                string passwordCrypt = BCrypt.Net.BCrypt.HashPassword(entity.ST_PASSWORD);

                if (resultUser.Rows.Count > 0)
                {
                    throw new BadHttpRequestException("Usuario não existe");
                }
                string query2 = $"INSERT INTO dbo.usuarios (ST_NAME, ST_EMAIL, ST_ROLE, ST_LOGIN, ST_PASSWORD) VALUES ('{entity.ST_NAME}', '{entity.ST_EMAIL}', '{entity.ST_ROLE}', '{entity.ST_LOGIN}', '{passwordCrypt}') ";
                List<UserEntity> register = new List<UserEntity>();
                DataTable registerUser = ExecQueryTeste(query2);

                return registerUser.ToString();

            }
            catch (Exception)
            {
                throw new BadHttpRequestException("Erro no login");
            }
        }

        public string login(UserEntity userEntity)
        {
            try
            {
                string query = $"SELECT * FROM dbo.usuarios WHERE ST_LOGIN='{userEntity.ST_LOGIN}'";
                List<UserEntity> user = new List<UserEntity>();
                DataTable resultUser = ExecQueryTeste(query);           

                if (resultUser.Rows.Count <= 0)
                {
                    throw new Exception();
                }
               
                DataRow row = resultUser.Rows[0];
                string pass = row["ST_PASSWORD"].ToString();
                bool passwordDecrypt = BCrypt.Net.BCrypt.Verify(userEntity.ST_PASSWORD, pass);
                
                if(passwordDecrypt == false)
                {
                    throw new Exception();
                }

                return "ok";
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<UserEntity> getUsers()
        {
            try
            {
                string query = "SELECT * FROM dbo.usuarios";
                List<UserEntity> user = new List<UserEntity>();
                DataTable resultUser = ExecQueryTeste(query);

                foreach (DataRow row in resultUser.Rows) 
                {
                    var users = new UserEntity()
                    {
                        ST_NAME = Convert.ToString(row["ST_NAME"]),
                        ST_PASSWORD = Convert.ToString(row["ST_PASSWORD"]),
                        ST_EMAIL = Convert.ToString(row["ST_EMAIL"]),
                        ST_ROLE = Convert.ToString(row["ST_ROLE"]),
                        ST_LOGIN = Convert.ToString(row["ST_LOGIN"])
                    };
                    user.Add(users);
                }
                return user;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<UserEntity> getUsersByLogin(UserEntity entity)
        {
            try
            {
                string query = $"SELECT * FROM dbo.usuarios WHERE ST_LOGIN='{entity.ST_LOGIN}'";
                List<UserEntity> user = new List<UserEntity>();
                DataTable resultUser = ExecQueryTeste(query);

                foreach (DataRow row in resultUser.Rows)
                {
                    DataRow data = resultUser.Rows[0];
                    string pass = data["ST_PASSWORD"].ToString();
                    bool passwordDecrypt = BCrypt.Net.BCrypt.Verify(entity.ST_PASSWORD, pass);

                    var users = new UserEntity()
                    {
                        ST_NAME = Convert.ToString(row["ST_NAME"]),
                        ST_PASSWORD = Convert.ToString(passwordDecrypt),
                        ST_EMAIL = Convert.ToString(row["ST_EMAIL"]),
                        ST_ROLE = Convert.ToString(row["ST_ROLE"]),
                        ST_LOGIN = Convert.ToString(row["ST_LOGIN"])
                    };
                    user.Add(users);
                }
                return user;
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

                if(result.Rows.Count == 0)
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

                return new ProductV{
                    totalProducts = tudo.Count,
                    totalCost = totalCoast,
                    totalPrice = totalPrice,
                    totalDiffP = totalPrice,
                    totalDiffPor = Math.Round((totalPrice - totalCoast)/totalPrice*100,2),
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

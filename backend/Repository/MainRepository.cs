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
                    throw new BadHttpRequestException("Usuario já existe");
                }
                string query2 = $"INSERT INTO dbo.usuarios (ST_NAME, ST_EMAIL, ST_ROLE, ST_LOGIN, ST_PASSWORD, ST_STATUS) VALUES ('{entity.ST_NAME}', '{entity.ST_EMAIL}', '{entity.ST_ROLE}', '{entity.ST_LOGIN}', '{passwordCrypt}', '1') ";
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
                DataTable resultUser = ExecQueryTeste(query);

                if (resultUser.Rows.Count < 0)
                {
                    throw new Exception("Usuário não existe");
                }
                
                DataRow row = resultUser.Rows[0];
                
                string pass = row["ST_PASSWORD"].ToString();
                bool passwordDecrypt = BCrypt.Net.BCrypt.Verify(userEntity.ST_PASSWORD, pass);
                
                if(passwordDecrypt == false)
                {
                    throw new Exception("Senha incorreta");
                }

                if (row["ST_STATUS"].Equals(false))
                {
                    throw new Exception("Usuário inativo.");
                }

                return "ok";
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public string updateUser(UserEntity userEntity) 
        {
            try
            {
                string query = $"UPDATE dbo.usuarios SET ST_NAME={userEntity.ST_NAME}, ST_EMAIL={userEntity.ST_EMAIL}, ST_LOGIN={userEntity.ST_LOGIN}, ST_ROLE={userEntity.ST_ROLE} WHERE CD_USUARIO={userEntity.Id}";
                ExecQueryTeste(query);
                return "ok";
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<UserEntity> getUserById(int id) 
        {
            try
            {
                string query = $"SELECT * FROM dbo.usuarios where CD_USUARIO={id}";
                List<UserEntity> user = new List<UserEntity>();
                DataTable resultUser = ExecQueryTeste(query);

                foreach (DataRow row in resultUser.Rows)
                {
                    var users = new UserEntity()
                    {
                        Id = (int)row["CD_USUARIO"],
                        ST_NAME = Convert.ToString(row["ST_NAME"]),
                        ST_PASSWORD = Convert.ToString(row["ST_PASSWORD"]),
                        ST_EMAIL = Convert.ToString(row["ST_EMAIL"]),
                        ST_ROLE = Convert.ToString(row["ST_ROLE"]),
                        ST_LOGIN = Convert.ToString(row["ST_LOGIN"]),
                        ST_STATUS = row["ST_STATUS"] != DBNull.Value ? Convert.ToBoolean(row["ST_STATUS"]) : true
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
                        Id = (int)row["CD_USUARIO"],
                        ST_NAME = Convert.ToString(row["ST_NAME"]),
                        ST_PASSWORD = Convert.ToString(row["ST_PASSWORD"]),
                        ST_EMAIL = Convert.ToString(row["ST_EMAIL"]),
                        ST_ROLE = Convert.ToString(row["ST_ROLE"]),
                        ST_LOGIN = Convert.ToString(row["ST_LOGIN"]),
                        ST_STATUS = row["ST_STATUS"] != DBNull.Value ? Convert.ToBoolean(row["ST_STATUS"]) : true
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

        public string reactiveUser(int id)
        {
            try
            {
                string query = $"UPDATE dbo.usuarios SET ST_STATUS = 1 WHERE CD_USUARIO = '{id}' ";
                ExecQueryTeste(query);
                return "ok";
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
        public string softDeleteUser(int id)
        {
            try
            {
                string query = $"UPDATE dbo.usuarios SET ST_STATUS = '0' WHERE CD_USUARIO = ${id}";
                ExecQueryTeste(query);
                return "ok";
            }
            catch (Exception)
            {

                throw;
            }
            
        }
    }
}

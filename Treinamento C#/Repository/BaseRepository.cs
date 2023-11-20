using System.Data;
using System.Data.SqlClient;

namespace Treinamento_C_.Repository
{
    public class BaseRepository
    {
        public static string DBConnection;
        public static string DBCTeste;

        public void ExecCommand(string query)
        {
            using (SqlConnection connection = new SqlConnection(DBConnection))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {

                        throw ex;
                    }
                }
            };
        }
        public DataTable ExecQuery(string query)
        {
            try
            {
                DataTable table = new DataTable();
                using (SqlConnection connection = new SqlConnection(DBConnection))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter
                        {
                            SelectCommand = command
                        };
                        adapter.Fill(table);
                    };
                }

                return table;
            }
            catch (Exception)
            {

                throw;
            }
        }
        //SEPARAÇÃO DE QUERYS-------------------------------------------------------------------------------------- 
        public DataTable ExecQueryTeste(string query)
        {
            try
            {
                DataTable table = new DataTable();
                using (SqlConnection connection = new SqlConnection(DBCTeste))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter
                        {
                            SelectCommand = command
                        };
                        adapter.Fill(table);
                    };
                }

                return table;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void ExecCommandTeste(string query)
        {
            using (SqlConnection connection = new SqlConnection(DBCTeste))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {

                        throw ex;
                    }
                }
            };
        }

    }
}

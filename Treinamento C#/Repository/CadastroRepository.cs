using System.Data;
using Treinamento_C_.Entities;

namespace Treinamento_C_.Repository
{
    public class CadastroRepository
    {
        public UserEntity cad(string nome, string senha, string email, long numero)
        {
            string query = $@"INSERT INTO usuarios VALUES ({nome},{senha},{email},{numero})";
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Treinamento_C_.Entities;
using Treinamento_C_.Repository;

namespace Treinamento_C_.Middleware
{
    public class Authentication : ControllerBase
    {
        private readonly IConfiguration _config;
        public Authentication(IConfiguration config)
        {
            _config = config;
        }

        public ActionResult tokenCertificate(UserEntity entity)
        {
            var user = Authenticate(entity);
            if(user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }
            return NotFound("Usuário não encontrado");
        }
        private string GenerateToken(UserEntity user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.ST_NAME),
                new Claim(ClaimTypes.Role,user.ST_ROLE)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        //To authenticate user
        private UserEntity Authenticate(UserEntity userLogin)
        {
            List<UserEntity> users = new List<UserEntity>();
            users = new  MainRepository().getUsersByLogin(userLogin);
            UserEntity users2 = users[0];


            if(users2.ST_LOGIN == userLogin.ST_LOGIN && users2.ST_PASSWORD == "True")
            {
                var currentUser = users2;
                return currentUser;
            }
            return null;
        }
    }
}

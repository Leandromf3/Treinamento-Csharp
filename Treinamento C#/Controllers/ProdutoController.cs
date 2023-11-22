using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Treinamento_C_.Entities;
using Treinamento_C_.Middleware;
using Treinamento_C_.Repository;

namespace Treinamento_C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    { 


        [Authorize]
        [HttpPost]
        [Route("createProduct")]
        public ActionResult Create([FromBody] Product produto)
        {
            try
            {
                var result = new ProductRepository().create(produto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erro: " + ex.Message });
            }
        }
        [Authorize]
        [HttpGet]
        [Route("getProduct")]
        public ActionResult Get()
        {
            try
            {
                //getALL
                var result = new ProductRepository().Get();
                return result != null ? Ok(result) : StatusCode(250, "Nenhum resultado encontrado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"ocorreu o erro: {ex}");
            }
        }


    }
}
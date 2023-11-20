using Microsoft.AspNetCore.Mvc;
using Treinamento_C_.Entities;
using Treinamento_C_.Repository;

namespace Treinamento_C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : ControllerBase
    {

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

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                //getALL
                var result = new MainRepository().Get();
                return result != null ? Ok(result) : StatusCode(250, "Nenhum resultado encontrado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"ocorreu o erro: {ex}");
            }
        }


    }
}
/*[HttpGet]
public ActionResult GetItem(int id)
{
    try
    {
        //getALL
        List<Item> result = new ProductRepository().GetProduto();
        return result != null ? Ok(result) : StatusCode(250, "Nenhum resultado encontrado");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"ocorreu o erro: {ex}");
    }


}
}  }*/
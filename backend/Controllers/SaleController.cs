using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using Treinamento_C_.Entities;
using Treinamento_C_.Repository;

namespace Treinamento_C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SaleController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        [Route("createSale")]
        public ActionResult createSale([FromBody] SaleEntity entity)
        {
            try
            {
                var result = new saleRepository().createSale(entity);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erro: " + ex.Message });
            }
        }
        [Authorize]
        [HttpGet]
        [Route("getSale")]
        public ActionResult getAll()
        {
            try
            {
                var result = new saleRepository().getAll();
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

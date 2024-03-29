﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using Treinamento_C_.Entities;
using Treinamento_C_.Middleware;
using Treinamento_C_.Repository;

namespace Treinamento_C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly Authentication _authentication;

        public UserController(Authentication authentication)
        {
            _authentication = authentication;
        }

        [HttpPost]
        [Route("register")]
        public ActionResult registerUser([FromBody] UserEntity userEntity) 
        {
            try
            {
                var result = new MainRepository().register(userEntity);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new BadHttpRequestException("erro:"+ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> login([FromBody]UserEntity userEntity)
        {
            try
            { 
                var authi = _authentication.tokenCertificate(userEntity);

                var result = new MainRepository().login(userEntity);
                return Ok(authi);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = "Erro: "+ ex.Message});
            }
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public ActionResult updateUsers([FromBody] UserEntity entity)
        {
            try
            {
                var result = new MainRepository().updateUser(entity);
                return result != null ? Ok() : StatusCode(255, "Erro durante o update");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize]
        [HttpGet]
        [Route("getUsers")]
        public ActionResult getUsers()
        {
            try
            {
                var result = new MainRepository().getUsers();
                return result != null ? Ok(result) : StatusCode(250, "ERRO");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Authorize]
        [HttpGet]
        [Route("getUserById")]
        public ActionResult getUserById(int id) 
        {
            try
            {
                var result = new MainRepository().getUserById(id);
                return result != null ? Ok(result) : NotFound(); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("deleteUser")]
        public ActionResult softDeleteUser(int id)
        {
            try
            {
                var result = new MainRepository().softDeleteUser(id);
                return result != null ? Ok(result) : StatusCode(250, "Erro");
            }
            catch (Exception)
            {

                throw;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("reactiveUser")]
        public ActionResult Reactive(int id)
        {
            try
            {
                var result = new MainRepository().reactiveUser(id);
                return result != null ? Ok(result) : StatusCode(250, "ERRO");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

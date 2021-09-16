using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace upload
{
    public static class Httpfileupload
    {
        [FunctionName("Httpfileupload")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                 
                var formdata = await req.ReadFormAsync();
                var file = req.Form.Files["file"];
                return new OkObjectResult(file.FileName + " - " + file.Length.ToString());
                
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    };
    
}

/**
 * Azure Function saveToBlob
 *
 * This function can be used to upload a file to a blob storage
 * https://AZURE_FUNCTION_NAME.azurewebsites.net/saveToBlob?filename=my-file.txt
 *
 * - return 400 if request is empty or if the filename is not defined
 * - save file to the storage defined
 */
 const multipart = require("parse-multipart");
 module.exports = (context, req) => {
   try {
     if (!req.query.filename) {
       return endWithBadResponse(context, `filename is not definedd`);
     }
     if (req.body) {
       const bodyBuffer = Buffer.from(req.body);
 
       const boundary = multipart.getBoundary(req.headers["content-type"]);
       const parts = multipart.Parse(bodyBuffer, boundary);
 
       context.bindings.storage = parts[0].data;
       context.done();
     } else {
       return endWithBadResponse(context, `Request Body is not definedd`);
     }
   } catch (err) {
     context.log.error(err.message +"this blcok");
     throw err;
   }
 };
 
 function endWithBadResponse(context, message = "Bad Requestd") {
   context.log.error(message);
   context.bindings.response = {
     status: 400,
     body: message,
   };
   context.done();
 }
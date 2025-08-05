const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
      if(req.url === "/favicon.ico")
         return res.end();
      const log = `${Date.now()} : method is ${req.method} url is ${req.url} \n`;
      
      const myUrl = url.parse(req.url, true)
    //   console.log(myUrl); 

      fs.appendFile("log.txt",log,(err, data)=>{
           switch(myUrl.pathname){
             case "/":
                   qp=myUrl.query;
                   res.end(`Welcome ${qp.name} to my main page\n`);
                   break;
              case "/about":
                   res.end("This is about page of the website\n");
                   break;
              case "/query":
                   res.end("query page\n");
                   break;
              default:
                   res.end("404 Page not found!");
           }
      });
});

myServer.listen(8000, ()=>{
    console.log("Server Started Successfully");
});
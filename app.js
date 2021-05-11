const express = require('express');
const https =require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

      res.sendFile(__dirname + "/index.html");
});
  //res.send("Server is up and running");

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "6d17c7ebe364583d00f329ad6f4b46ed";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey + "&units=" + unit;
  https.get(url,function(response){
    // console.log(response.statusCode);

    response.on("data",function(data){
      // JSON parse is used to convert the data into JSON format as we had recieved it into hexadecimal form from the server
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<p>The weather is currently " + weatherDescription+".</p>");
      res.write("<h1>Temperature in " +query + " is "+ temp +" degree celsius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});


app.listen(3000, ()=>{
  console.log("Server started on port 3000.");
});

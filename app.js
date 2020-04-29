
const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstname=req.body.fName;
  const lastname=req.body.Lname;
  const email=req.body.email;
//from mailchimp guide on lists
  const data={
  members:[
  {
  email_address:email,
  status:"subscribed",
  merge_fields:{
    FNAME:firstname,
    LNAME:lastname,

  },

  }
  ]

  };
//converting data into json
  const jsonData=JSON.stringify(data);
  //url of mailchimp with server no and list id as it is external
  const url="https://us8.api.mailchimp.com/3.0/lists/504af5e209";
  const options={
    method:"POST",
    auth:"somethig:0b27bcb7012ded6b3c736b88d7464590-us8",
  };
  //refer node mdn for external http usage
  const req1=https.request(url,options,function(response){
console.log(response);
    if(response.statusCode === 200){res.sendFile(__dirname + "/success.html");}
  else{res.sendFile(__dirname +"/failure.html");}

response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
req1.write(jsonData);
req1.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})






app.listen(process.env.PORT || 3000,function(){
  console.log("server is starting");
});
//mailchimp Api
//0b27bcb7012ded6b3c736b88d7464590-us8

//list ID
//504af5e209

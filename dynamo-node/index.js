const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/create", async (req, res) => {
  // create dynamodb sample data
}); 

app.get("/sample", async (req, res) => {
  // query dynamodb and pagination logic
}); 

app.listen(3000, function(){
  console.log("listening on port 3000");
});
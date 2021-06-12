// Setup empty JS object to act as endpoint for all routes
projectData  = {};

//express to run server and route init
const express = require('express');

//start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('app'));


const port = 8000;
//spin up the server 
const server = app.listen(port, ()=>{
  console.log(`server is running on port: ${port}`)
})

//Require Express to run the server and routes
// get all data by the : http://127.0.0.1:8000/all
app.get('/all', function(req, res){
  res.send(projectData);
})

// get all data by the : http://127.0.0.1:8000/addData
app.post('/addData', addData);

function addData(request, response){
  let data = request.body;
  console.log('server data site' , data)
  projectData["date"] = data.date;
  projectData["temp"] = data.temp; // temperature
  projectData["content"] = data.content; // user feeling
  response.send(projectData);
  console.log({message: 'POST Recieved'});
}
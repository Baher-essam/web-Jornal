// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();
/* Global Variables */
const baseUrl =`https://api.openweathermap.org/data/2.5/weather?zip=`;
const apikey = '&appid=2b2ba16893949d7d46b3a88a0a0cbdf0&units=metric'; // Celcius
//event listeners
document.getElementById('form').addEventListener('submit', performAction);

//main functions
function performAction (e) {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const feelings = document.querySelector('#feeling').value;
  //to check if the user enterd any data
  if(!zipCode) 
    //if there is no data entered before submit show this alert
    alert('please enter your zip code!');
  else
    {
      // callback function to get data from the API
      getWeatherData(baseUrl ,zipCode , apikey)
      .then(function (data) { 
        //adding POST request
        postData('/addData', {
          date:newDate,
          temp:data.main.temp,
          content:feelings,
        })
        //callback updateUI function to view data when submit
        updateUI();
       })
      //to clear inputs after submitting
      form.reset();
    }
  };

const getWeatherData = async (baseUrl , zipCode , apikey) => {
   // 1.fetch the api url
   const res = await fetch(baseUrl + zipCode + apikey)
     try {
       const data = await res.json();
       console.log(data)
        return data;
     }  catch(error) {
       // appropriately handle the error
       console.log("error", error);
     }
}

// Async POST
const postData = async (url="", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
            'Content-Type': 'application/json',
       },
       body: JSON.stringify(data) //Body data-type matches the 'Content-Type' header   
  });
  try {
      const newData = await response.json();
      console.log('from post data', newData);
      return newData;
  } catch (error) {
            console.log("error", error);
  }
};

// Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
      const allData = await request.json();
      console.log('all data', allData);
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML =  `Temperature: ${allData.temp}`;
      document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
  } catch (error) {
            console.log("error", error);
  }
};
// Create a new date instance dynamically with JS
let d = new Date();
let fullDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Global Variables */
let baseUrl =`https://api.openweathermap.org/data/2.5/weather?zip=`;
let key = '&appid=2b2ba16893949d7d46b3a88a0a0cbdf0';
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
      getWeatherData(baseUrl ,zipCode , key)
      .then(function (data) { 
        //adding POST request
        postData('/add', {
          date:fullDate,
          city: data.name,
          icon:data.weather[0].icon, 
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

const getWeatherData = async (baseUrl , zipCode , key) => {
   // 1.fetch the api url
   const res = await fetch(baseUrl + zipCode + key)
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
      console.log(newData);
      return newData;
  } catch (error) {
            console.log("error", error);
  }
};

// Update UI
const updateUI = async () => {
  //remove hide class form container to show recevied data 
  document.getElementById('journal').classList.remove('hide');
  const request = await fetch('/all');
  try {
    //set DOM elements for API to be shown at client side
      const allData = await request.json();
      document.getElementById('date').textContent = `date : ${allData[0].date}`;
      document.getElementById('temp').innerHTML =  (allData[0].temp - 273).toFixed(1)+ ` <span>C</span>`;
      document.getElementById('content').textContent = `I'm feeling : ${allData[0].content}`;
      document.getElementById('icon').innerHTML = `<img src="icons/${allData[0].icon}.svg">`;
      document.getElementById('city').textContent= allData[0].city;
  } catch (error) {
            console.log("error", error);
  }
};
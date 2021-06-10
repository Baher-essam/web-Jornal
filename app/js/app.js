/* Global Variables */
const key = '&appid=2b2ba16893949d7d46b3a88a0a0cbdf0';
const baseUrl =`https://api.openweathermap.org/data/2.5/weather?zip=`;
const form =  document.getElementById('form');

const feelings = document.querySelector('#feeling').value;
const date = document.querySelector('#date');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//event listeners
form.addEventListener('submit', performAction);


//functions
function performAction (e) {
  e.preventDefault();
  let zipCode = document.getElementById('zip').value;
  let url = baseUrl+ zipCode+  key;
  if(!zipCode) 
    //if there is no data entered before submit show this alert
    alert('please enter your zip code!');
  else
    {
      
    }
         // callback function to get data from the API
         getWeatherData(url)
         .then(function (projectData) { 
           return projectData;
          })
         //to clear input numbers
         form.reset();
  };
let url = baseUrl + zipCode + key;
const getWeatherData = async (url="") => {
   // 1.fetch the api url
   const res = await fetch(url)
   // 2. Call Fake API
     // const res = await fetch('/fakeAnimalData')
     try {
       const data = await res.json();
       console.log(data)
        //Add data to post request
        postData('/addWeather', {
          name: data['name'], 
          icon: data['weather'][0]['icon'], 
          description: data['weather'][0]['description'],
          temp: data['main']['temp'],
          // country: data['sys'],
        
      }),
      updateUI();
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
                  //  'Accept': 'application/json'
                 'Content-Type': 'application/json',
       },
       body: JSON.stringify(data) //Body data-type matches the 'Content-Type' header   
  })
  try {
      const newData = await response.json();
      console.log(newData);
      return newData;
  } catch (error) {
            console.log({message: 'Bad response recieved!'});
            
  }
};

// Update UI
const updateUI = async () => {
  document.getElementById('journal').classList.remove('hide');
  const feelings = document.querySelector('#feeling').value;
  const response = await fetch('/all');
  try {
          //set DOM elements for API to be shown at client side
            const allData = await response.json();
            const name = document.querySelector('#name');
            const date = document.querySelector('#date');
            const temp = document.querySelector('.degree');
            const icon = document.querySelector('.icon');
            const description = document.querySelector('.description');
            const mood = document.querySelector('#mood');
     
            
            name.textContent = allData.name;
            temp.textContent = (allData.temp - 273).toFixed(1)+ ` <span>C</span>`;
            description.textContent = allData.description;
            date.textContent = allData.date = new Date().toDateString();
            icon.innerHTML =`<img src="icons/${alldata.icon}.svg">`;
            mood.innerHTML = feelings;
            console.log(feelings)
           
  } catch (error) {
            console.log({message: 'Invalid zipcode input!'}); 
  }
};
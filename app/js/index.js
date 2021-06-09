/* Global Variables */
const btn =  document.getElementById('zipCodeBtn');
const form =  document.getElementById('form');
const key = '&appid=2b2ba16893949d7d46b3a88a0a0cbdf0';
const baseUrl =`https://api.openweathermap.org/data/2.5/weather?zip=`;
let cityName = document.querySelector('.city');
let countryName = document.querySelector('.country');
let weatherDesc = document.querySelector('.description');
let weatherIcon = document.querySelector('.icon');
let currentDegree = document.querySelector('.degree');
//event listeners
form.addEventListener('submit', performAction);


//functions
function performAction (e) {
  e.preventDefault();
  let zipCode = document.getElementById('zip').value;
  if(!zipCode) 
    //if there is no data entered before submit show this alert
    alert('please enter your zip code!');
  else
    {
      // callback function to get data from the API
      getWeatherData(baseUrl,zipCode, key);
      //to clear input numbers
      form.reset();
    }
  };

const getWeatherData = async (baseUrl , zipCode, key) => {
   // 1.fetch the api url
   const res = await fetch(baseUrl+zipCode+key)
   // 2. Call Fake API
     // const res = await fetch('/fakeAnimalData')
     try {
       const data = await res.json();
       console.log(data)
       // 1. We can do something with our returned data here-- like chain promises!
        const {country} = data.sys;
        const name  = data.name;
        const {temp} = data.main;
        const {description, icon} = data.weather[0];
        console.log( country, name, temp, description);
        //set DOM elements for API to be shown at client side
        cityName.innerHTML= name+',';
        countryName.innerHTML= country;
        weatherDesc.innerHTML= description;
        currentDegree.innerHTML= (temp- 273).toFixed(1) + ` <span>C</span>`;
        weatherIcon.innerHTML =`<img src="icons/${icon}.svg">`;
        return data;
       // 2. 
       // postData('/addAnimal', data)
     }  catch(error) {
       // appropriately handle the error
       console.log("error", error);
     }
}

import React from "react";
import Titles from "./components/Titles"
import Form from "./components/form"
import Weather from  "./components/Weather"



const API_KEY = "7507a1d27c9f49290cdf93091393a477";

class App extends React.Component {
  state = {
   temperature: '',
   city : '',
   country: '',
   humidity: '',
   description : '',
   error: ''
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
   const data = await api_call.json();

   if(city && country){
    console.log(data);
   this.setState({
    temperature: data.main.temp,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    description:data.weather[0].description,
    error: ""
     });
   }else{
    this.setState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description:undefined,
    error: "Please enter the values"
   });
  }
}
  render(){
    return (
      <div>
      <Titles />
        <Form getWeather={this.getWeather}/>
      <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
      />
      </div>
      
     
      );
  }
}

export default App;
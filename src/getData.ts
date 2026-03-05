import { fetchWeatherApi } from "openmeteo";
import {
  setCity,
  setCountry,
  setDay,
  setDayDate,
  setMonth,
  setYear,
  setWeather,
} from "../src/statemanagement/latidutes"
import { setFeelsLike, setHumanity, setPrecipitation, setWindSpeed  } from "../src/statemanagement/windSpeeds"; 
import { addTuesdayForcast, addWednesdayForcast, addThursdayForcast, addFridayForcast, addSaturdayForcast, addSundayForcast, addMondayForcast, clearForcast } from "./statemanagement/hourlyForcast";
import { store } from "./statemanagement/store";
import { addDailyForcast, clearValues } from "./statemanagement/dialyCast";
import { loadUnload } from "./statemanagement/loadSlice";
import { searchError } from "./statemanagement/currentError";

function getDayName(dayNumber: number): string {
  switch (dayNumber) {
        case 0:
        return "Sunday";
          break;

        case 1:
        return "Monday";
          break;
        case 2:
        return "Tuesday";
          break;
        case 3:
        return "Wednesday";
          break;

        case 4:
        return "Thursday";
          break;

        case 5:
        return "Friday";
          break;

        case 6:
        return "Saturday";
          break;

        case 7:
        return "Sunday";
          break;

        default:
        return "";
          break;
      }//end of switch case
}//end of get day function

function theWeatherIs(code: number): string {
  if(code == 0) return `${import.meta.env.BASE_URL}images/icon-sunny.webp`
  else if(code >= 1 && code <= 3) return `${import.meta.env.BASE_URL}images/icon-partly-cloudy.webp`
  else if(code >= 45 && code <= 48) return `${import.meta.env.BASE_URL}images/icon-fog.webp`
  else if(code >= 51 && code <= 57) return `${import.meta.env.BASE_URL}images/icon-drizzle.webp`
  else if(code >= 61 && code <= 67) return `${import.meta.env.BASE_URL}images/icon-rain.webp`
  else if(code >= 71 && code <= 77) return `${import.meta.env.BASE_URL}images/snowflake.png`
  else if(code >= 80 && code <= 82) return `${import.meta.env.BASE_URL}images/rain_shower.png`
  else if(code >= 85 && code <= 86) return `${import.meta.env.BASE_URL}images/icon-snow.webp`
  else if(code >= 95) return `${import.meta.env.BASE_URL}images/icon-storm.webp`
  else return ""
}//end of weatherName

export async function getDataAction(loacation: string, data_type:string ) {

    // getting geo coordinates from the location name
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${loacation}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      const { name, latitude, longitude, country } = geoData.results[0];
      
      store.dispatch(setCity(name));
      store.dispatch(setCountry(country));

      // getting display time and place component infor
      const crrTempetatureUrl = data_type == "metric" ?
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      :`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;

      const tempResponse = await fetch(crrTempetatureUrl);
      const crrTemperature = await tempResponse.json();

      const mainWeather = crrTemperature.current_weather.weathercode
      const time = crrTemperature.current_weather.time;
      const mainTemperature = crrTemperature.current_weather.temperature;
      const windSpeedy = crrTemperature.current_weather.windspeed;

      store.dispatch(setWeather({temperature: mainTemperature, forcast: theWeatherIs(mainWeather)}));

      const date = new Date(time);
      const  dayDate = date.getDate();
      const day = getDayName(date.getDay());
      let month = "";
      
      switch (date.getMonth()) {
        case 0:
          month = "Jan";
          break;

        case 1:
          month = "Feb";
          break;

        case 2:
          month = "Mar";
          break;

        case 3:
          month = "Apr";
          break;

        case 4:
          month = "May";
          break;

        case 5:
          month = "Jun";
          break;

        case 6:
          month = "Jul";
          break;

        case 7:
          month = "Aug";
          break;

        case 8:
          month = "Sep";
          break;

        case 9:
          month = "Oct";
          break;

        case 10:
          month = "Nov";
          break;

        case 11:
          month = "Dec";
          break;

        default:
          month = "";
          break;
      }

      store.dispatch(setDay(day));
      store.dispatch(setMonth(month));
      store.dispatch(setDayDate(dayDate));
      store.dispatch(setYear(date.getFullYear()));

      // getting feels like and humadity and wind speed values
      const responses = await fetchWeatherApi(
        "https://api.open-meteo.com/v1/forecast",
        {
          latitude,
          longitude,
          current: [
            "apparent_temperature",
            "relative_humidity_2m",
            "precipitation",
          ],
          temperature_unit: data_type == "metric" ? "celsius" : "fahrenheit",
          precipitation_unit: data_type == "metric" ? "mm" : "inch",
        },
      );

      const response = responses[0];
      const current = response.current();

      if (current != null) {
        const variables1 = current.variables(0);
        const variables2 = current.variables(1);
        const variables3 = current.variables(2);

        if (
          variables1 != null &&
          variables2 != null &&
          variables3 != null
        ) {
          const value1 = variables1.value();
          const value2 = variables2.value();
          const value3 = variables3.value();

          if (
            value1 != null &&
            value2 != null &&
            value3 != null
          ) {
         
           store.dispatch(setFeelsLike(Number(value1.toFixed(1))))
           store.dispatch(setHumanity(Number(value2.toFixed(1))))
           store.dispatch(setPrecipitation(Number(value3.toFixed(1))))
           store.dispatch(setWindSpeed(windSpeedy))
          }
        }
      }

      // daily forcast data
      const dialFocast = data_type == "metric" ?
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timezone=auto` 
      : `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`
      const DailyFocastResponse = await fetch(dialFocast);
      const DailyForcastData = await DailyFocastResponse.json();
      store.dispatch(clearValues());

      for(let i = 0; i < 7; i++){

      const hotTemperature = DailyForcastData.daily.temperature_2m_max[i].toFixed(1);
      const coldTemperature = DailyForcastData.daily.temperature_2m_min[i].toFixed(1);
      const currentWeather = theWeatherIs(DailyForcastData.daily.weathercode[i])
    
      store.dispatch(addDailyForcast(
        {
        dayName: getDayName(new Date(DailyForcastData.daily.time[i]).getDay()),
        hot: hotTemperature,
        cold: coldTemperature,
        forcast: currentWeather
          }
          ))
       }//end o 4 loop

      const hourlyUrl = data_type == "metric" 
      ? `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=auto&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm` 
      : `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=auto&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`
      const hourlyResponse = await fetch(hourlyUrl);
      const hourlforcastData = await hourlyResponse.json();
      
      if(hourlforcastData.hourly.time == undefined) throw new Error("Not time data found!.");
      store.dispatch(clearForcast())
      
      for(let i = 0; i < hourlforcastData.hourly.time.length; i++){
        
        const fullTime = new Date(hourlforcastData.hourly.time[i]);
        const hour = fullTime.getHours();
        let formattedHour = "";

        if(hour >= 13) formattedHour = `${hour - 12} PM`;
        else if(hour == 0) formattedHour = "12 AM";
        else formattedHour = `${hour} AM`;
        
        const hourlyTemperature = hourlforcastData.hourly.temperature_2m[i].toFixed(1);
        const forcastData = hourlforcastData.hourly.weathercode[i]

        switch (getDayName(fullTime.getDay())) {
        case "Sunday":
        store.dispatch(addSundayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Monday":
        store.dispatch(addMondayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Tuesday":
        store.dispatch(addTuesdayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Wednesday":
        store.dispatch(addWednesdayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Thursday":
        store.dispatch(addThursdayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Friday":
        store.dispatch(addFridayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
          break;

        case "Saturday":
        store.dispatch(addSaturdayForcast({time: formattedHour, weather: {temperature: hourlyTemperature, forcast: theWeatherIs(forcastData)}}));
        break;

        default:
        return 
        break;
      }//end of switch case


      }//end of 4 loop

      store.dispatch(setCity(name));
    } catch (error) {

      if(store.getState().load) store.dispatch(loadUnload())
      console.log("error fetching data", error);
      store.dispatch(searchError())
    }
  } //end of get data function
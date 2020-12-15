import React, { useState }from  'react'
import axios from 'axios'

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const apiKey = "1e75805480e99d4ceba35fd50dd7e649"

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&`
const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    root1: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      },
  }));
  


const WeatherApi = ()=>{
    const classes = useStyles();


    const [city, setCity] = useState()
    const [weatherData, setWeatherData]= useState({})

    const renderWeatherData =  ()=>{
        
       var convertSpeedInKm = (speed)=>{
            let speedInMiles = speed*2.23694
            let speedInKm = speedInMiles*1.60934
            return speedInKm.toFixed(2)
       } 

       var  kelvinToCelsius = (kelvin)=>{ 
                return kelvin-273.15
        }
        if(weatherData == null){
            return (
                <h1>Please Enter Correct City Name</h1>
            )
        }
        if(Object.keys(weatherData).length === 0 && weatherData.constructor === Object){
            return console.log("empty Obj")
        }else{
            return (
                <React.Fragment>
                    <div className={classes.root1}> 
                        <h1>City : {weatherData.name}</h1><br/>
                          <h2>Temp : {kelvinToCelsius(weatherData.main.temp).toFixed(2)+"°C"}</h2>
                          <h2>Max Temp : {kelvinToCelsius(weatherData.main.temp_max).toFixed(2)+"°C"}</h2>
                          <h2>Min Temp : {kelvinToCelsius(weatherData.main.temp_min).toFixed(2)+"°C"}</h2>
                          <h2>Cloudiness : {weatherData.clouds.all+"%"}</h2>
                          <h2>Feels Like : {kelvinToCelsius(weatherData.main.feels_like).toFixed(2)+"°C"}</h2>
                          <h2>Humidity : {weatherData.main.humidity+"%"}</h2>
                          <h2>Wind Speed : {convertSpeedInKm(weatherData.wind.speed) +" Km/ Hours"}</h2>
                          
                    </div>
                </React.Fragment>
            )
        }
       
    }
    
    var handleInputChange =(event)=>{
        setCity(event.target.value)
        // console.log(city)
    }

    var handleButton =  ()=>{
        axios.get(apiUrl+`q=${city}`)
        .then((response)=>{ setWeatherData(response.data)})
        .catch(err=>{
            setWeatherData(null)
        })

        console.log(weatherData)
    }

    return(
        <React.Fragment>
                 <Card className={classes.root}>
                        <CardContent>
                             <TextField className={classes.root}
                                    id="standard-textarea"
                                    label="Enter City Name"
                                    placeholder="ex : Indore"
                                    multiline 
                                    onChange={handleInputChange}
                                    />
                             <Button variant="contained" color="primary" onClick= {handleButton}>
                                 Find
                             </Button>  
                                {renderWeatherData()}

                                {/* <h1>hello</h1> */}
                        </CardContent>
            </Card>

        </React.Fragment>
    )
}

export default WeatherApi;
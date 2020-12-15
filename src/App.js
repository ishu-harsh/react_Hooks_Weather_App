import React from 'react'
import WeatherApi from './components/WeatherApi'
import Container from '@material-ui/core/Container';


const App = ()=>{
    return (
        <React.Fragment>
              <Container maxWidth="sm">
              <WeatherApi></WeatherApi>

              </Container>
        </React.Fragment>
    )
}

export default App;
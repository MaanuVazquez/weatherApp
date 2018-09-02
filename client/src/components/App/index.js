import React, {Component} from 'react'
import SelectForm from '../SelectForm'
import WeatherCard from '../WeatherCard'
import {fetchApi} from '../../utils'
import {Grid, Row, Col} from 'react-bootstrap'
import './global.css'

class App extends Component {
  state = {
    loading: true,
    weather: [],
    location: {},
    error: null,
    currentLocation: null
  }

  componentDidMount() {
    this.initializeComponent()
  }

  initializeComponent = async() => {
    try {
      const [location, currentWeather] = await Promise.all([fetchApi('location'), fetchApi('current')])
      this.setState({loading: false, location, weather: currentWeather.weather})
    } catch (error) {
      this.setState({error: error.message})
      console.error(error)
    }
  }

  renderWeather = () => {
    const {weather, loading, error, currentLocation, location} = this.state
    if (error) return <div>Error...</div>
    if (loading) return <div>Loading...</div>
    return (
      <Row>
        <h2>{currentLocation || location.city}</h2>
        {weather.length === 1 ? (
          <Col md={4} mdOffset={3}>
            <WeatherCard weather={weather[0]}/>
          </Col>
        ) : (
          this.renderForecast()
        )}
      </Row>
    )
  }

  renderForecast = () => {
    const {weather} = this.state
    let minTemp = 0
    let maxTemp = 0
    return (
      <Row>
        {weather.map((w, i) => {
          if (w.main.temp_min < minTemp || minTemp === 0) minTemp = w.main.temp_min
          if (w.main.temp_max > maxTemp) maxTemp = w.main.temp_max
          if (i % 8 === 0) {
            const completeWeather = {
              ...w,
              main: {...w.main, temp_min: minTemp, temp_max: maxTemp}
            }
            minTemp = 0
            maxTemp = 0
            return (
              <Col key={i} md={2}>
                <WeatherCard weather={completeWeather} forecast/>
              </Col>
            )
          }
        })}
      </Row>
    )
  }

  onSearchFormSubmit = (city, option) => {
    const API_ENDPOINT = `${option}/${city === 'current' ? '' : city}`
    this.setState({loading: true}, async() => {
      try {
        const apiResponse = await fetchApi(API_ENDPOINT)
        this.setState({
          loading: false,
          weather: apiResponse.weather,
          currentLocation: city === 'current' ? null : city
        })
      } catch (error) {
        console.error(error)
        this.setState({error: error.message})
      }
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <header>
              <h1>Weather App ⛅</h1>
            </header>
            <SelectForm onSubmit={this.onSearchFormSubmit}/>
            {this.renderWeather()}
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App

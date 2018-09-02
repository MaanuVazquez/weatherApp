import React, {Component} from 'react'
import {weatherToEmoji} from '../../utils'
import moment from 'moment'
import styles from './styles.css'

export default class WeatherCard extends Component {
  render() {
    const {
      weather: {
        main: {humidity, pressure, temp, temp_max: tempMax, temp_min: tempMin},
        weather,
        dt_txt
      },
      forecast
    } = this.props

    const {description} = weather[0]

    return (
      <div className={styles.card}>
        {forecast && <h5 className={styles.textCenter}>{moment(dt_txt).format('DD/MM/YYYY')}</h5>}
        <h1 className={styles.textCenter}>{weatherToEmoji(description)}</h1>
        {!forecast && <h3 className={styles.textCenter}>{Math.floor(temp)}°</h3>}
        <p>Min temperature: {Math.floor(tempMin)}°</p>
        <p>Max temperature: {Math.floor(tempMax)}°</p>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} mb</p>
      </div>
    )
  }
}

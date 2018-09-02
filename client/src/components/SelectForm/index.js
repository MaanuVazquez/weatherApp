import React, {Component} from 'react'
import {FormControl, ButtonToolbar, ToggleButtonGroup, ToggleButton, Button, Col, Row} from 'react-bootstrap'

export default class SelectForm extends Component {
  state = {
    city: '',
    option: 'current'
  }

  handleSelectOnChange = e => {
    this.setState({city: e.target.value})
  }

  handleRadioGroupOnChange = option => {
    this.setState({option})
  }

  handleFormOnSubmit = e => {
    e.preventDefault()
    const {city, option} = this.state
    this.props.onSubmit(city, option)
  }

  render() {
    const {option, city} = this.state
    return (
      <form onSubmit={this.handleFormOnSubmit}>
        <Row>
          <Col md={6}>
            <FormControl componentClass='select' value={city} onChange={this.handleSelectOnChange}>
              <option value='current'>Current Location</option>
              <option value='Buenos Aires'>Buenos Aires</option>
              <option value='El Cairo'>El Cairo</option>
              <option value='London'>London</option>
              <option value='Miami'>Miami</option>
              <option value='Rio de Janeiro'>Rio de Janeiro</option>
              <option value='Santiago'>Santiago</option>
            </FormControl>
          </Col>
          <Col md={3}>
            <ButtonToolbar>
              <ToggleButtonGroup type='radio' name='options' value={option} onChange={this.handleRadioGroupOnChange}>
                <ToggleButton value={'current'}>Current Weather</ToggleButton>
                <ToggleButton value={'forecast'}>5-day Forecast</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col md={3}>
            <Button type='submit'>Submit</Button>
          </Col>
        </Row>
      </form>
    )
  }
}

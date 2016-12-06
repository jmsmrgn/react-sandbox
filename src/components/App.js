import React, { Component } from 'react';
import Ships from './Ships';
import { Link } from 'react-router';
import css from '../css/styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ships: []
    };
  }

  componentDidMount() {
    fetch('http://swapi.co/api/starships/')
      .then(data => data.json())
      .then(data => {
        const ships = data.results.map(data => data.name);
        this.setState({ ships });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Ships data={this.state} />
    );
  }
}

export default App;

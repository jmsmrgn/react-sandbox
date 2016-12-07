import React, { Component } from 'react';
import Ships from './Ships';
import '../css/styles.scss';

class App extends Component {
  constructor () {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount () {
    fetch('http://swapi.co/api/starships/')
      .then(data => data.json())
      .then(json => {
        this.setState({
          data: json.results
        });
      })
      .catch(err => console.error(err));
  }

  render () {
    return (
      <div className='ship-wrap'>
        <img src='assets/imperial.jpg' />
        {this.state.data.map((data, key) => {
          return (
            <Ships key={key} data={data} />
          );
        })}
      </div>
    );
  }
}

export default App;

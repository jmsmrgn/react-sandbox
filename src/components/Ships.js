import React from 'react';

const Ships = (props) => (
  <div>
    <ul className='ship-list'>
      {props.data.ships.map((ship, index) =>
        <li key={index}>{ship}</li>
      )}
    </ul>
  </div>
);

export default Ships;

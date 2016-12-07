import React from 'react';

const Ships = (props) => {
  const { name, model, manufacturer } = props.data;

  return (
    <div>
      <ul className='ship-list'>
        <li>Name: <strong>{name}</strong></li>
        <li>Model: <strong>{model}</strong></li>
        <li>Manufacturer: <strong>{manufacturer}</strong></li>
      </ul>
    </div>
  );
};

Ships.propTypes = {
  data: React.PropTypes.object
};

export default Ships;

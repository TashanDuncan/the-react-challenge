import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ index, score, changeScore, checkScore }) => {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={() =>{ changeScore(index, -1); checkScore();}}> - </button>
      <span className="counter-score">{ score }</span>
      <button className="counter-action increment" onClick={() => {changeScore(index, 1); checkScore();}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  index: PropTypes.number,
  score: PropTypes.number,
  changeScore: PropTypes.func  
};

export default Counter;
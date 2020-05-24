import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

class Card extends Component {
  render() {
    return (
      <div id="body-container">
        <Cards number="1223" name="adrian" expiry="ass" cvc="asss" focused="" />
      </div>
    );
  }
}

export default Card;

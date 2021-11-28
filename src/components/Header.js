import { useState } from 'react';
import styled from 'styled-components';

const ChangeSign = styled.h2`
  margin-top: 7px;
  margin-bottom: 7px;
  padding-right: 10px;
  color: ${props => props.change > 0 ? '#507E11' : 'red'} // green for a positive change, red for a negative one
`

const ColoredH3 = styled.h3`
  margin-top: 7px;
  margin-bottom: 7px;
  color: ${props => props.change > 0 ? '#507E11' : 'red'} // green for a positive change, red for a negative one
`

function Header() {
  const [realTimeData, setRealTimeData] = useState({});
  const fxeWebSocket = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon');
  
  fxeWebSocket.onopen = () => {
    fxeWebSocket.send('{"type":"SUBSCRIBE","instruments":["cc-btc-usd-cccagg"]}');
  }

  fxeWebSocket.onmessage = event => {
    const message = JSON.parse(event.data);
    setRealTimeData(message['cc-btc-usd-cccagg']);
}

  const numToFomatedString = (num, isChange) => {
    if(Number.isFinite(num)) { // varifying num is a Number
      const sign = num > 0 ? '+' : '';
      num = num.toLocaleString(undefined, { // formating with commas
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 // always display 2 decimal places
      })
      if (isChange) num = sign + num;
    }
    return num;
  }

  return (
    <div className='header'>
      <div className='leftSideHeader'>
        <div className='leftSideHeaderRow'>
          <img id='btcLogo' src='btc.png' alt="bitcoin logo" width="35" height="35" />
          <h2>Bitcoin</h2>
        </div>
        <div className='leftSideHeaderRow'>
          <p>
            {!!Object.keys(realTimeData).length ?
              `As of: ${realTimeData.lastUpdate}` :
              'Getting the latest information...' }
          </p>
        </div>
      </div>
      {!!Object.keys(realTimeData).length
      ?
        <div className='rightSideHeader'>
          <div className='rightSideHeaderRow'>
            <ChangeSign change={realTimeData.change}>
              {realTimeData.change > 0 ? '▲' : '▼'}
            </ChangeSign>
            <h1>${numToFomatedString(realTimeData.last)}</h1>  
          </div>
          <div className='rightSideHeaderRow'>
            <ColoredH3 change={realTimeData.change}>
              {numToFomatedString(realTimeData.change, true)}
            </ColoredH3>
            <ColoredH3 change={realTimeData.change}>
              ({numToFomatedString(realTimeData.percentChange, true)}%)
            </ColoredH3>
          </div>
        </div>
      :
        <div></div>
      }
    </div>
  );
}

export default Header;

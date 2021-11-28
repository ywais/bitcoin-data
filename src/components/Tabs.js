import { useEffect, useState } from 'react';
import OverviewTab from './OverviewTab';
import HistoryTab from './HistoryTab';
import axios from 'axios';

function Tab() {
  const [timeGap, setTimeGap] = useState({gap: 1, unit: 'minute'});
  const [bitcoinData, setBitcoinData] = useState({});
  const [showOverview, setShowOverview] = useState(true); // if true, display overview tab. else, history tab

  const getData = async () => {
    const { data } = await axios.get(
      `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histo${timeGap.unit}?aggregate=${timeGap.gap}&limit=29&e=CCCAGG&fsym=BTC&tsym=usd`
    );
    setBitcoinData(data.data);
  }
  
  useEffect(() => {
    getData();
  }, [timeGap]);

  const onButtonClick = (newGap, newUnit) => {
    setTimeGap({gap: newGap, unit: newUnit});
  }

  return (
    <div className='tabsContainer'>
      <div className='tabsNavBar'>
        <button id='Overview' onClick={() => setShowOverview(true)} disabled={showOverview}>Overview</button> {/* disable active button */}
        <button id='History' onClick={() => setShowOverview(false)} disabled={!showOverview}>History</button>
      </div>
      <div className='timeFrameSelectors'>
        <button
          id='oneMin'
          onClick={() => onButtonClick(1, 'minute')}
          disabled={timeGap.gap === 1 && timeGap.unit === 'minute'} // disable active button
        >
          1 Minute
        </button>
        <button
          id='fiveMin'
          onClick={() => onButtonClick(5, 'minute')}
          disabled={timeGap.gap === 5}
        >
          5 Minutes
        </button>
        <button
          id='oneHour'
          onClick={() => onButtonClick(1, 'hour')}
          disabled={timeGap.unit === 'hour'}
        >
          1 Hour
        </button>
        <button
          id='oneMin'
          onClick={() => onButtonClick(7, 'day')}
          disabled={timeGap.unit === 'day'}
        >
          1 Week
        </button>
      </div>
      <OverviewTab visibility={showOverview ? 'block' : 'none'} chartData={bitcoinData}></OverviewTab>
      <HistoryTab visibility={!showOverview ? 'block' : 'none'} tableData={bitcoinData}></HistoryTab>
    </div>
  );
}

export default Tab;

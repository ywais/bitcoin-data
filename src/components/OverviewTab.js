import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function OverviewTab(props) {
  return (
    <div className='innerTab overviewTab' style={{display: props.visibility}}>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={props.chartData}>
          <defs>
            <linearGradient id='closeLine' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='20%' stopColor='#DCE6F5' stopOpacity={1}/>
              <stop offset='80%' stopColor='#DCE6F5' stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <XAxis dataKey='Date' />
          <YAxis orientation='right' domain={['auto', 'auto']} tickFormatter={tickValue => tickValue.toLocaleString()} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area type='monotone' dataKey='Close' stroke='#8FB5EE' strokeWidth={2} fillOpacity={1} fill='url(#closeLine)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverviewTab;

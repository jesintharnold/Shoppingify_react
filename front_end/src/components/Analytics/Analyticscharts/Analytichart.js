import {LineChart,Line,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer, Legend} from 'recharts';
import data from './AnalyticData.json';
import './Analytichart.scss';


function Analyticschart(){
    return (  
        <div className='analytics_chart'>
         <div className='chart_name'>Monthly Summary</div>
        <ResponsiveContainer  width="90%" aspect={3}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5" stroke="#aaa" />
            <XAxis dataKey="name" strokeDasharray="3" stroke="#707070" style={{fontSize:'0.8rem'}}/>
            <YAxis strokeDasharray="3" stroke="#707070" style={{fontSize:'0.75rem'}}  />
            <Tooltip />
            <Legend/>
            <Line type="monotone" strokeWidth={1} dataKey="uv" stroke="rgba(249, 161, 9, 1)"  dot={{ stroke: 'rgba(249, 161, 9, 1)', strokeWidth: 3,r:4 }}  />
          </LineChart>
        </ResponsiveContainer>
      </div>
    
)}
export default Analyticschart;
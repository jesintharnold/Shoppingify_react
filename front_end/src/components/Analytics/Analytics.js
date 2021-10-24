import './Analytics.scss';
import Analyticprogress from './AnalyticsProgress/ProgressAnalytics';

function Analytics(){
    return (
        <div className="analytics_main">

            <div className="analytic_progress_container">
            <div className="left_prog_cont">
            <span className="ana_prog_cont_name">Top items</span>
            <Analyticprogress item="Banana-1" className="golden" progressval={20} />
            <Analyticprogress item="Banana-2" className="golden" progressval={50} />
            <Analyticprogress item="Banana-3" className="golden" progressval={90} />
            </div>
            <div className="right_prog_cont">
            <span className="ana_prog_cont_name">Top Categories</span>
            <Analyticprogress item="Banana-4" className="blue" progressval={20} />
            <Analyticprogress item="Banana-5" className="blue" progressval={10} />
            <Analyticprogress item="Banana-6" className="blue" progressval={70} />
            
            </div>
            </div>

        </div>
        )
}

export default Analytics;
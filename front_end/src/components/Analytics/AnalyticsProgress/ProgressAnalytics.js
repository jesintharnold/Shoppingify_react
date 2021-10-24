import './ProgressAnalytics.scss';

function Analyticprogress({progressval,className,item}){
    return (
        <div className="Progress_cont">
        <div className="Progress_cont_name">
        <span>{item}</span>
        <span>{`${progressval|0}%`}</span>
        </div>
        <progress value={progressval} className={className} max="100" ></progress >
        </div>
    )
}

export default Analyticprogress;
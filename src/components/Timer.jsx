import { useState,useEffect} from "react"
const Timer = () =>{
    const [running , setRunning] = useState(false)
    const [second,setSecond] = useState(0)

    useEffect(()=>{
        let interval = null
        if(running){
            interval =setInterval(()=>{
                setSecond(second+1)
            } , 1000)
        }
        return ()=>clearInterval(interval)
        
    },[running,second])


    function runClick(){
        setRunning(!running)
    }
    function resetClick(){
        setRunning(false)
        setSecond(0)
    }

    
    
    const convertToString = (sec) =>{
        const MINUTE_SECOND = 60
        const HOUR_SECOND = 60 * MINUTE_SECOND
        const DAY_SECOND = 24 * HOUR_SECOND

        const days = Math.floor(sec/DAY_SECOND)
        const hours = Math.floor((sec%DAY_SECOND)/HOUR_SECOND)
        const minute = Math.floor((sec%HOUR_SECOND)/MINUTE_SECOND)
        const second = sec % MINUTE_SECOND

        if(days > 0){return days + 'd ' + hours + 'h ' + minute + 'm ' + second + 's '}
        else if(hours > 0){return hours + 'h ' + minute + 'm ' + second + 's '}
        else if(minute > 0){return minute + 'm ' + second + 's '}
        else {return second + 's '}
    }

    return(
    <>
    <div className="border border-black border-2 rounded-3 mx-auto p-2 mt-3 bg-secondary-subtle"
        style={{ width: "fit-content" }}>
    <h1 className="text-center fw-bold text-primary">TIMER</h1>
    <input className="border border-black border-2 rounded-3 text-end fw-bold" value={convertToString(second)}></input>
    <div className="d-flex justify-content-between align-items-center gap-2 mt-3">
        <button className="btn btn-danger" onClick={resetClick}><i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset</button>
        <button className={'btn ' + (running ?'btn-warning' : 'btn-success')} onClick={runClick}><i className={'bi ' + (running ? 'bi-pause' : 'bi-play')}></i>&nbsp;{running ? 'Pause':'Run'}</button>
    </div>
    </div>
    </>
    )
}
export default Timer
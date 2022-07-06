import {FC, useEffect, useState} from "react";

interface IStopwatchProps {
}

function getUnits(time: number) {
    const seconds = time / 1000;

    const min = Math.floor(seconds / 60).toString();
    const sec = Math.floor(seconds % 60).toString();
    const msec = (seconds % 1).toFixed(3).substring(2);

    return `${min}:${sec}:${msec}`;
}

const Stopwatch: FC<IStopwatchProps> = () => {
    const [runningTime, setRunningTime] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number>(0);

    const handleClick = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
        } else {
            const startTime = Date.now() - runningTime;

            setIntervalId(setInterval(() => {
                setRunningTime(Date.now() - startTime);
            }));
        }
    };

    const handleReset = () => {
        clearInterval(intervalId);
        setIntervalId(0);
        setRunningTime(0);
    };

    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    useEffect(() => () => setIntervalId(0), []);

    return (
        <div>
            <p>{getUnits(runningTime)}</p>
            <button onClick={handleClick}>
                {intervalId ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
        </div>
    );
};

export default Stopwatch;

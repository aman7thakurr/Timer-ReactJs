import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [initialHour, setInitialHour] = useState(0);
  const [initialMinute, setInitialMinute] = useState(0);
  const [initialSecond, setInitialSecond] = useState(0);
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCurrentHour(initialHour);
    setCurrentMinute(initialMinute);
    setCurrentSecond(initialSecond);
  }, [initialHour, initialMinute, initialSecond]);

  useEffect(() => {
    let timerID;

    if (isRunning) {
      timerID = setInterval(() => {
        if (currentHour === 0 && currentMinute === 0 && currentSecond === 0) {
          clearInterval(timerID);
          setIsRunning(false);
        } else {
          let newHour = currentHour;
          let newMinute = currentMinute;
          let newSecond = currentSecond;

          if (newSecond === 0) {
            if (newMinute === 0) {
              newHour -= 1;
              newMinute = 59;
            } else {
              newMinute -= 1;
            }
            newSecond = 59;
          } else {
            newSecond -= 1;
          }

          setCurrentHour(newHour);
          setCurrentMinute(newMinute);
          setCurrentSecond(newSecond);
        }
      }, 1000);
    }

    return () => clearInterval(timerID);
  }, [isRunning, currentHour, currentMinute, currentSecond]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentHour(initialHour);
    setCurrentMinute(initialMinute);
    setCurrentSecond(initialSecond);
  };

  return (
    <div className="App">
      <div className="c-timers">
        <div className="timerContainer">
          <div className="countdownList">
            <div className="c-timer">
              <div className="timeCount">
                <span className="timeLeft">  
                  {String(currentHour).padStart(2, '0')}:{String(currentMinute).padStart(2, '0')}:{String(currentSecond).padStart(2, '0')}
                </span>
                <div className="toolbox">
                  {!isRunning && <button type="button" className="c-timer__btn-start" onClick={startTimer}>Start</button>}
                  {isRunning && <button type="button" className="c-timer__btn-pause" onClick={pauseTimer}>Pause</button>}
                  <button type="button" className="c-timer__btn-reset" onClick={resetTimer} disabled={isRunning}>Reset</button>
                </div>
              </div>
              <div className="c-timer__title">
                <span className="tad-sortable-anchor">Timer 1 </span>
                (<span className="tad-sortable-anchor">{String(currentHour).padStart(2, '0')}:{String(currentMinute).padStart(2, '0')}:{String(currentSecond).padStart(2, '0')}</span>)
                <span className="small soft"></span>
                <span className="c-timer__edit-wrap">
                  <span className='label'>
                    <label className='txt'>Hrs</label>
                    <input type='number' className='ip' min={0} value={initialHour} onChange={(e) => setInitialHour(parseInt(e.target.value))}></input>
                  </span>
                  <span className='label'>
                    <label className='txt'>Mins</label>
                    <input type='number' className='ip' min={0} value={initialMinute} onChange={(e) => setInitialMinute(parseInt(e.target.value))}></input>
                  </span>
                  <span className='label'>
                    <label className='txt'>Sec</label>
                    <input type='number' className='ip' min={0} max={60} value={initialSecond} onChange={(e) => setInitialSecond(parseInt(e.target.value))}></input>
                  </span>
                  <button className="c-timer__edit"><i className="i-font"> </i> Edit</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="progressbar" title="Progress bar">
          <div className="currentProgress currentProgress--start">
            <span className="timeAfter"></span><br/>
          </div>
        </div>
      </div>
      <div className="c-timer__footer">
        <div className="six-columns">
          <i className="i-font-i-add"></i><br/>+ Add another timer
        </div>
        <div className="six-columns">
          <div className="totalTimeLeft">Total: <span>{initialHour}:{initialMinute}:{initialSecond}</span></div>
        </div>
      </div>
    </div>
  );
}

export default App;

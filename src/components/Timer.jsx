import React, { useState, useEffect, useRef } from 'react'
import {calculateTime, formatTime} from '../utils/auxiliaryFunctions'

const Timer = () => {

  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
    second: "00"
  })

  const [inputBox, setInputBox] = useState({
    hour: false,
    minute: false,
    second: false
  })

  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState()
  const [initialTime, setInitialTime] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)

  const hourRef = useRef()
  const minuteRef = useRef()
  const secondRef = useRef()


  const inputHandler = (field) => {
    if (!isRunning) {
      setInputBox((prevData) => ({
        ...prevData,
        [field]: true
      }))
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    if (/^\d{0,2}$/.test(value)) {
      setTime((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }

    // Auto-move to Next Input Field on Two Digits
    if (value.length === 2) {
      if (name === "hour") {
        setInputBox({ hour: false, minute: true, second: false })
      } else if (name === "minute") {
        setInputBox({ hour: false, minute: false, second: true })
      }
    }
  }

  // blur functionality
  const handleBlur = (field) => {
    setTime((prevData) => ({
      ...prevData,
      [field]: prevData[field].padStart(2, "0")
    }))

    setInputBox((prevData) => ({
      ...prevData,
      [field]: false
    }))
  }

  // Tab functionality
  const handleKeyDown = (e, field) => {
    if (e.key === "Tab") {
      e.preventDefault();
      console.log("tab" + field)
      if (field === "hour") {
        console.log("hourtrue")
        if (!time.hour) {
          setTime((prevData) => ({
            ...prevData,
            hour: "00"
          }));
        } else if (time.hour.length < 2) {
          setTime((prevData) => ({
            ...prevData,
            hour: time.hour.padStart(2, 0)
          }))
        }
        setInputBox({ hour: false, minute: true, second: false });
      } else if (field === "minute") {
        console.log("minutetrue")
        if (!time.minute) {
          setTime((prevData) => ({
            ...prevData,
            minute: "00"
          }));
        } else if (time.minute.length < 2) {
          setTime((prevData) => ({
            ...prevData,
            minute: time.minute.padStart(2, 0)
          }))
        }
        setInputBox({ hour: false, minute: false, second: true });
      } else if (field === "second") {
        console.log("secondtrue")
        if (!time.second) {
          setTime((prevData) => ({
            ...prevData,
            second: "00"
          }));
        } 
        secondRef.current.blur();
      }
    }
  };

  const reset = () => {
    setIsRunning(false)
    clearInterval(intervalId)
    setTime({
      hour: "00",
      minute: "00",
      second: "00"
    })
    setInputBox({
      hour: false,
      minute: false,
      second: false
    })
    setInitialTime(0)
    document.documentElement.style.setProperty("--progress", `0%`);
  }

  // Main Timer logic
  const timer = () => {

    let calulatedTotalSeconds = calculateTime(time.hour, time.minute, time.second);
    setTotalSeconds(calulatedTotalSeconds)
    if (initialTime === 0){
      setInitialTime(calulatedTotalSeconds)
    }
    if (calulatedTotalSeconds === 0){
      alert("Please enter the time !!")
      document.documentElement.style.setProperty("--progress", `0%`);
      return;
    }

    if (isRunning) {
      setIsRunning(false)
      clearInterval(intervalId)
    } else {
      setIsRunning(true)
      
      setInputBox({
        hour: false,
        minute: false,
        second: false
      })
      const id = setInterval(() => {
        if (calulatedTotalSeconds > 0) {
          calulatedTotalSeconds--
          setTotalSeconds(calulatedTotalSeconds)
          const {hour, minute, second} = formatTime(calulatedTotalSeconds);
          setTime({hour, minute, second})
        } else {
          clearInterval(id)
          setIsRunning(false)
        }
      }, 1000);

      setIntervalId(id);
    }
  }

  // focus logic
  useEffect(() => {
    if (inputBox.hour) {
      hourRef.current.focus()
    } else if (inputBox.minute) {
      minuteRef.current.focus()
    } else if (inputBox.second) {
      secondRef.current.focus()
    }
  }, [inputBox])

  // progress logic 
  useEffect(() => {
    const progress = initialTime > 0 ? ((initialTime - totalSeconds) / initialTime) * 100 : 0;
    console.log(progress)
    document.documentElement.style.setProperty("--progress", `${progress}%`);
    console.log(time)
  }, [totalSeconds])

  return (
    <div className='timerApp'>
      <div className='timerCard'>
        <div className="timerCircle">
          <div className="time">
            {
              inputBox.hour 
              ? <input 
                  className="timeInput" 
                  type="text" 
                  name='hour' 
                  ref={hourRef}
                  value={time.hour} 
                  onChange={handleChange} 
                  onBlur={() => handleBlur("hour")} 
                  onKeyDown={(e) => handleKeyDown(e, "hour")}
                /> 
              : <div className='timebtn' onClick={() => inputHandler("hour")}>{time.hour}</div>
            }
            : {
              inputBox.minute 
              ? <input 
                  className="timeInput" 
                  type="text" 
                  name='minute' 
                  ref={minuteRef}
                  value={time.minute} 
                  onChange={handleChange} 
                  onBlur={() => handleBlur("minute")} 
                  onKeyDown={(e) => handleKeyDown(e, "minute")}
                /> 
              : <div className='timebtn' onClick={() => inputHandler("minute")}>{time.minute}</div>
            }
            : {
              inputBox.second 
              ? <input 
                  className="timeInput" 
                  type="text" 
                  name='second' 
                  ref={secondRef}
                  value={time.second} 
                  onChange={handleChange} 
                  onBlur={() => handleBlur("second")} 
                  onKeyDown={(e) => handleKeyDown(e, "second")}
                /> 
              : <div className='timebtn' onClick={() => inputHandler("second")}>{time.second}</div>
            }       
          </div>
        </div>
        <div className="actionButtons">
          <button className="actionButton" onClick={timer}>{isRunning ? "Pause" : "Start"}</button>
          <button className="actionButton" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Timer

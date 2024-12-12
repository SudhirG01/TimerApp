import React from 'react'
import Timer from './components/Timer'
import './style.css'

const App = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }}>
      <Timer />
    </div>
  )
}

export default App

import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    console.log("useEffect fired!")
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        console.log("DATA FROM API:", data)
        setBackendData(data)
      }
    )
  }, [])
  
  return (
    <div>App</div>
  )
}

export default App
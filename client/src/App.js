import React, {useEffect, useState} from 'react';

function App() {

  const [backendDate, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
  
      {(typeof backendDate.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendDate.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}

    </div>
  );
}

export default App
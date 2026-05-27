import { useState, useEffect } from 'react'

function App() {
  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setBackendData(data))
  }, [])

  return (
    <div>
      {typeof backendData.users === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={user.id}>{user.name}</p>
        ))
      )}
    </div>
  )
}

export default App
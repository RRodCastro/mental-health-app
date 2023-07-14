import { useState } from 'react'
import './style/App.scss'
import { Button, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typography variant="h1">Hello Vite + React!</Typography>
      <Button onClick={() => setCount((count) => count + 1)} color="primary" variant="contained"> Press me </Button>
      <Typography variant="h2"> {count} </Typography>

    </>
  )
}

export default App

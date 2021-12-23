import React from 'react'
import Index from '../HarmonyRevamp/index'
import ModeContext from '../HarmonyRevamp/context/modeContext'

export default function Harmony() {
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    const mode = JSON.parse(localStorage.getItem('mode'))
    if (mode === null) {
      localStorage.setItem('mode', JSON.stringify(darkMode))
    } else {
      setDarkMode(mode)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#15171B' }}>
      <ModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Index />
      </ModeContext.Provider>
    </div>
  )
}

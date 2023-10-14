import React, { useState } from 'react'
import './middle.css'
import {Link} from 'react-router-dom'

export default function Navigation({onclick}) {
  const [sendCount, setSendCount] = useState(0);

  const handleCountLocal = () => {
    setSendCount(sendCount + 1)
    onclick(sendCount + 1)
  }

  const handleCountGlobal = () => {
    setSendCount(sendCount + 1)
    onclick(sendCount + 1)
  }
  return (
    <div className='nav-class'>
        <nav className='nav-tag'>
            <Link to='/' className='local-nav-button' onClick={handleCountLocal}>Local</Link>
            <div className='mid-line'></div>
            <Link to='/globalInfo' className='global-nav-button' onClick={handleCountGlobal}>Global</Link>
        </nav>
    </div>
  )
}

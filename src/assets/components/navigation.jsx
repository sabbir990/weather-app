import React from 'react'
import './middle.css'
import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
    <div className='nav-class'>
        <nav className='nav-tag'>
            <Link to={'/'} className='local-nav-button'>Local</Link>
            <div className='mid-line'></div>
            <Link to={'/globalInfo'} className='global-nav-button'>Global</Link>
        </nav>
    </div>
  )
}

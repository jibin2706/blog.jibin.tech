import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import ToggleThemeButton from './toggleViewButton'

import './navigation.scss'

function Navigation() {
  const [isSidebarOpen, toggleSidebar] = useState(false)
  const mobileNavLinks = useRef(null)

  useEffect(() => {
    const navbar = document.getElementById('nav-mobile')
    const checkbox = document.getElementById('checkbox1')
    const links = mobileNavLinks.current.children

    if (isSidebarOpen) {
      navbar.classList.add('tap')
      document.documentElement.style.overflow = 'hidden'
      checkbox.checked = true
      // staggered animation of nav items using js animate api
      Array.from(links).forEach((link, index) => {
        link.animate(
          [
            { opacity: 0, transform: 'translateX(-100px)' },
            { opacity: 1, transform: 'translateX(0px)' },
          ],
          {
            delay: 500,
            duration: (index + 1) * 250,
            easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
            fill: 'backwards',
            iterations: 1,
          }
        )
      })
    } else {
      navbar.classList.remove('tap')
      document.documentElement.style.overflow = 'auto'
      checkbox.checked = false
    }
  }, [isSidebarOpen])

  return (
    <>
      <nav id="nav-desktop" className="nav">
        <Link className="nav__item" to="/" activeClassName="nav__item--active">
          Home
        </Link>
        <Link className="nav__item" to="/about/" activeClassName="nav__item--active">
          About Me
        </Link>
        <Link className="nav__item" to="/blog/" activeClassName="nav__item--active">
          Blog
        </Link>
        <Link className="nav__item" to="/contact/" activeClassName="nav__item--active">
          Contact
        </Link>
        <ToggleThemeButton />
      </nav>

      <input
        type="checkbox"
        id="checkbox1"
        aria-label="Toggle Sidemenu on Mobile"
        className="checkbox1 visuallyHidden"
        onChange={() => toggleSidebar(!isSidebarOpen)}
      />
      <label htmlFor="checkbox1" aria-labelledby="checkbox1" aria-label="toggle navigation" id="hamburger">
        <div className="hamburger">
          <span className="bar bar1" />
          <span className="bar bar2" />
          <span className="bar bar3" />
          <span className="bar bar4" />
        </div>
      </label>

      <nav id="nav-mobile">
        <div className="nav-mobile__container" ref={mobileNavLinks}>
          <Link className="nav__item" to="/" activeClassName="nav__item--active">
            Home
          </Link>
          <Link className="nav__item" to="/about/" activeClassName="nav__item--active">
            About Me
          </Link>
          <Link className="nav__item" to="/blog/" activeClassName="nav__item--active">
            Blog
          </Link>
          <Link className="nav__item" to="/contact/" activeClassName="nav__item--active">
            Contact
          </Link>
          <ToggleThemeButton />
        </div>
      </nav>
    </>
  )
}

export default Navigation

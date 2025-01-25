import { useState } from "react"
import { NavLink } from 'react-router-dom'
import styles from "./Nav.module.css"

function Nav() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink className={styles.brand} to='/'>
          <span>Amor</span> & Filmes
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/' className={({isActive}) => (isActive ? styles.active : styles.notactive)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/adicionar' className={({isActive}) => (isActive ? styles.active : styles.notactive)}>
              Adicionar
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}>
              Cadastrar
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </>
  )
}

export default Nav

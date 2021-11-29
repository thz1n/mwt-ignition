import styles from './styles.module.scss'
export const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <img src='/images/logo.svg' alt=""/>
        <ul>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Server info</a>
          </li>
          <li>
            <a href='#'>Castle Siege</a>
          </li>
        </ul>
      </div>
    </header>
  )
}
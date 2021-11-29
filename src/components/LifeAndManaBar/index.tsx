import styles from './styles.module.scss'

export function LifeBar(props) {
  const widthLife = Math.round((Math.round(props.maxLife) / Math.round(props.life)) * 100);
  console.log(props.lifeValue)
  return (
    <div className={styles.lifeBarWrapper}>
      <span className={styles.maxLifeValue}>
        {Math.round(props.maxLife)} / {Math.round(props.life)}
      </span>
      <div className={styles.lifeBar}>
        <style jsx>{`width:${widthLife}%`}</style>
      </div>
    </div>
  )
}

export function ManaBar(props) {
  const widthMana = Math.round((Math.round(props.maxMana) / Math.round(props.mana)) * 100);
  return (
    <div className={styles.manaBarWrapper}>
      <span className={styles.maxManaValue}>
        {Math.round(props.maxMana)} / {Math.round(props.mana)}
      </span>
      <div className={styles.manaBar}>
        <style jsx>{`width:${widthMana}%`}</style>
      </div>
    </div>
    )
}
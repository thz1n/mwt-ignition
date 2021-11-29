import styles from './styles.module.scss';
import { RiTrophyLine } from 'react-icons/ri'

export function GuildScore(props) {
  return (
    <div className={styles.guildScoreWrapper}>
      <span className={styles.guildScoreTitle}>
        <RiTrophyLine size={14} /> GUILD SCORE
      </span>
      <h1 className={styles.position}>{props.score}</h1>
    </div>
  )
}
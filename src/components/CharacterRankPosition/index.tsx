import styles from './styles.module.scss';
import { RiTrophyLine } from 'react-icons/ri'

export function CharacterRankPosition(props) {
  return (
    <div className={styles.rankPositionWrapper}>
      <span className={styles.rankPositionTitle}>
        <RiTrophyLine size={14} /> RANK POSITION
      </span>
      <h1 className={styles.position}>{props.position}º</h1>
    </div>
  )
}
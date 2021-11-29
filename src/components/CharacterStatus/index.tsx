import styles from './styles.module.scss'

export function CharacterStatus({ str, agi, vit, ene, cmd }) {
  return (
    <div className={styles.CharacterStatusWrapper}>
      <span>Str: <span>{str}</span></span>
      <span>Agi: <span>{agi}</span></span>
      <span>Vit: <span>{vit}</span></span>
      <span>Ene: <span>{ene}</span></span>
      <span>Cmd: <span>{cmd}</span></span>
    </div>
  )
}
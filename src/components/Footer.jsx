import styles from './Footer.module.css'
import HandwrittenText from './HandwrittenText'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© {year} Kamjula ChandraSekhar</p>
        <HandwrittenText className={styles.closing}>
          Built with precision, microservices performance, and clean architecture.
        </HandwrittenText>
      </div>
    </footer>
  )
}

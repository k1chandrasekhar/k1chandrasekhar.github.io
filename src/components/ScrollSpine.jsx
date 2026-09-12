import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import styles from './ScrollSpine.module.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'systems', label: 'Systems' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollSpine() {
  const [hovered, setHovered] = useState(false)
  const [activeSectionLabel, setActiveSectionLabel] = useState('Overview')
  const [progressPercent, setProgressPercent] = useState(0)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  })

  // Top offset as percentage for dot position
  const dotTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgressPercent(Math.round(latest * 100))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const found = SECTIONS.find((s) => s.id === e.target.id)
            if (found) setActiveSectionLabel(found.label)
          }
        })
      },
      { threshold: 0.3 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={styles.spineContainer}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rail background */}
      <div className={styles.rail} />

      {/* Progress fill */}
      <motion.div
        className={styles.progressFill}
        style={{ scaleY: smoothProgress }}
      />

      {/* Glowing cursor dot */}
      <motion.div className={styles.dotWrap} style={{ top: dotTop }}>
        <div className={styles.dot} />
        <div className={styles.dotGlow} />

        {/* Hover / Active section tooltip */}
        <motion.div
          className={styles.tooltip}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.65, x: hovered ? 6 : 2 }}
          transition={{ duration: 0.2 }}
        >
          <span className={styles.percentText}>{progressPercent}%</span>
          {hovered && (
            <span className={styles.sectionLabel}> · {activeSectionLabel}</span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

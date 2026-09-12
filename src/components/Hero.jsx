import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  stagger,
} from 'motion/react'
import styles from './Hero.module.css'
import RollingLabel from './RollingLabel'
import DeskSketch from './DeskSketch'
import HandwrittenText from './HandwrittenText'
import { revealTransition } from './MotionReveal'
import { onDeskDrawStart } from '../utils/introChoreography'

const LINKEDIN_HREF = 'https://www.linkedin.com/in/k1chandrasekhar/'
const RESUME_PDF_HREF = '/Chandrasekhar_Resume.pdf'

const PROOF = [
  { value: '5+ yrs', label: 'experience' },
  { value: '<1s', label: 'API latency' },
  { value: '10M+', label: 'daily events' },
]

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', visualDuration: 0.45, bounce: 0 },
  },
}

const noteTextItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
}

function MagneticCta({
  href,
  className,
  ariaLabel,
  onClick,
  target,
  rel,
  children,
}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (event) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.22)
    y.set(dy * 0.22)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [contentReady, setContentReady] = useState(() => !!prefersReduced)

  useEffect(() => {
    if (prefersReduced) {
      setContentReady(true)
      return undefined
    }
    return onDeskDrawStart(() => setContentReady(true))
  }, [prefersReduced])

  const showCopy = prefersReduced || contentReady

  return (
    <section className={styles.hero} id="about">
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.content}
          variants={{
            hidden: {},
            show: { transition: { delayChildren: stagger(0.07) } },
          }}
          initial={prefersReduced ? false : 'hidden'}
          animate={showCopy ? 'show' : 'hidden'}
        >
          <HandwrittenText
            className={styles.hand}
            active={showCopy}
            delay={0.02}
          >
            Hi. I build high-throughput microservices & cloud systems.
          </HandwrittenText>

          <motion.h1 className={styles.name} variants={heroItem}>
            <span className={styles.nameLine}>
              <motion.span
                className={styles.nameWord}
                initial={prefersReduced ? false : { y: '115%' }}
                animate={showCopy ? { y: '0%' } : { y: '115%' }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        visualDuration: 0.5,
                        bounce: 0,
                        delay: 0.06,
                      }
                }
              >
                ChandraSekhar
              </motion.span>
            </span>
            <span className={styles.nameLine}>
              <motion.span
                className={styles.nameWord}
                initial={prefersReduced ? false : { y: '115%' }}
                animate={showCopy ? { y: '0%' } : { y: '115%' }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        visualDuration: 0.5,
                        bounce: 0,
                        delay: 0.14,
                      }
                }
              >
                Kamjula
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className={styles.role} variants={heroItem}>
            Associate Project Lead @ KFintech · Node.js/NestJS + AWS · 2x OS Rating
          </motion.p>

          <motion.p className={styles.bio} variants={heroItem}>
            5+ years of progressive experience re-architecting legacy monoliths into high-performance Node.js microservices, cutting API response latency from <strong>&gt;30s to sub-second (&lt;1s)</strong>, scaling AWS cloud data pipelines for <strong>10M+ daily events</strong>, and leading a team of 5 software engineers with <strong>2 consecutive Outstanding (OS) performance ratings</strong>.
          </motion.p>

          <motion.div className={styles.ctaRow} variants={heroItem}>
            <MagneticCta
              href={LINKEDIN_HREF}
              className={styles.ctaPrimary}
              ariaLabel="LinkedIn Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RollingLabel>LinkedIn</RollingLabel>
            </MagneticCta>
            <MagneticCta
              href={RESUME_PDF_HREF}
              className={styles.ctaSecondary}
              ariaLabel="Download Resume PDF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RollingLabel>Resume PDF</RollingLabel>
            </MagneticCta>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.noteStage}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={
            showCopy ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: 'spring', visualDuration: 0.55, bounce: 0 }
          }
        >
          <motion.aside
            className={styles.noteCard}
            aria-label="A note from the desk"
            animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
            transition={
              prefersReduced
                ? undefined
                : {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: showCopy ? 0.9 : 0,
                  }
            }
          >
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { delayChildren: stagger(0.08) } },
              }}
              initial={prefersReduced ? false : 'hidden'}
              animate={showCopy ? 'show' : 'hidden'}
            >
              <HandwrittenText
                className={styles.noteHand}
                active={showCopy}
                delay={0.18}
              >
                a note from the desk
              </HandwrittenText>
              <DeskSketch />
              <motion.p className={styles.noteBody} variants={noteTextItem}>
                Most days I am refactoring legacy financial monoliths into sub-second microservices, watching AWS Athena turn 10M+ daily log events into instant queries, or leading code reviews for my team of 5 engineers.
              </motion.p>
              <motion.div
                className={styles.proofRow}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: stagger(0.08, { startDelay: 0.12 }),
                    },
                  },
                }}
              >
                {PROOF.map((item) => (
                  <motion.div
                    key={item.label}
                    className={styles.proofChip}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: revealTransition,
                      },
                    }}
                  >
                    <span className={styles.proofValue}>{item.value}</span>
                    <span className={`mono ${styles.proofLabel}`}>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}

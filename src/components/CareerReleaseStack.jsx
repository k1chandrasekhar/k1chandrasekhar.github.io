import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  stagger,
} from 'motion/react'
import styles from './CareerReleaseStack.module.css'
import HandwrittenText from './HandwrittenText'

const CARDS = [
  {
    id: 'kfin-lead',
    slot: 'slotKfin',
    company: 'KFin Technologies',
    role: 'Associate Project Lead',
    dates: 'APR 2024 - PRESENT',
    year: 'NOW',
    lesson:
      'Promoted after 2 consecutive Outstanding (OS) performance ratings. Currently leading 5 software engineers, driving microservices delivery, cutting API latency (>30s to <1s), and architecting 10M+ daily event AWS log pipelines.',
    stack: 'TEAM LEAD (5) / NODE.JS / AWS CDK / 2X OS RATING',
    tone: 'paper',
    card: 'cardKfin',
    motion: { fromX: -72, fromY: 96, restRotate: -1 },
  },
  {
    id: 'kfin-sr',
    slot: 'slotAirdit',
    company: 'KFin Technologies',
    role: 'Senior Software Engineer',
    dates: 'APR 2024 - APR 2025',
    year: '24',
    lesson:
      'Re-architected core LAMF lending backend, built event-driven SQS+Lambda PDF notifications, and integrated mTLS CERSAI KYC wrapper for 30,000+ daily verification requests.',
    stack: 'MICROSERVICES / mTLS / SQS + LAMBDA / ATHENA',
    tone: 'panel',
    card: 'cardAirdit',
    motion: { fromX: 86, fromY: 120, restRotate: 1.2 },
  },
  {
    id: 'techm',
    slot: 'slotTechno',
    company: 'Tech Mahindra',
    role: 'Software Engineer',
    dates: 'MAR 2021 - DEC 2023',
    year: '21',
    lesson:
      'Designed and maintained large-scale Python/Hadoop ETL pipelines for Three UK Networks, automating schedules with 99.9% uptime and boosting SQL query throughput by >75%.',
    stack: 'PYTHON / SQL / HADOOP / THREE UK NETWORKS',
    tone: 'panelAlt',
    card: 'cardTechno',
    motion: { fromX: -78, fromY: 138, restRotate: -1.1 },
  },
  {
    id: 'techm-intern',
    slot: 'slotIdeas',
    company: 'Tech Mahindra',
    role: 'Software Engineer Intern',
    dates: 'DEC 2020 - MAR 2021',
    year: '20',
    lesson:
      'Fundamentals of backend data transformation, SQL query optimization, Agile standups, and unit testing for enterprise internal reporting tools.',
    stack: 'PYTHON / SQL / AGILE / UNIT TESTING',
    tone: 'deep',
    card: 'cardIdeas',
    motion: { fromX: -96, fromY: 150, restRotate: -1.6 },
  },
  {
    id: 'reva',
    slot: 'slotBtech',
    company: 'REVA University',
    role: 'B.Tech, Computer Science & Engineering',
    dates: 'AUG 2016 - MAY 2020',
    year: '16',
    lesson:
      'Core computer science foundation in microservices, database management, cloud computing, and operating systems.',
    stack: 'B.TECH CSE / BANGALORE, INDIA',
    tone: 'steel',
    card: 'cardBtech',
    motion: { fromX: 92, fromY: 170, restRotate: 1.4 },
  },
]

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', visualDuration: 0.48, bounce: 0 },
  },
}

function CareerCard({ item }) {
  return (
    <article
      className={`${styles.card} ${styles[item.card]} ${styles[item.tone]}`}
      aria-label={`${item.company}, ${item.role}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.identity}>
          <h3 className={styles.company}>{item.company}</h3>
          <p className={styles.role}>{item.role}</p>
        </div>
        <p className={`mono ${styles.dates}`}>{item.dates}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.footerCopy}>
          <p className={styles.lesson}>{item.lesson}</p>
          <p className={`mono ${styles.stack}`}>{item.stack}</p>
        </div>
        <p className={styles.year} aria-hidden="true">
          {item.year}
        </p>
      </div>
    </article>
  )
}

function CareerSlot({ item, index, prefersReduced }) {
  const slotRef = useRef(null)
  const entersFirst = index % 2 === 0
  const { scrollYProgress } = useScroll({
    target: slotRef,
    offset: [
      `start ${entersFirst ? 78 : 74}%`,
      `start ${entersFirst ? 44 : 40}%`,
    ],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.38,
    restDelta: 0.001,
  })
  const range = [0, 0.16, 1]
  const x = useTransform(
    progress,
    range,
    [item.motion.fromX * 0.58, item.motion.fromX * 0.4, 0]
  )
  const y = useTransform(
    progress,
    range,
    [item.motion.fromY * 0.3, item.motion.fromY * 0.2, 0]
  )
  const rotate = useTransform(
    progress,
    range,
    [
      item.motion.restRotate * 3.8,
      item.motion.restRotate * 2.8,
      item.motion.restRotate,
    ]
  )
  const rotateX = useTransform(progress, range, [-15, -10, 0])
  const scale = useTransform(progress, range, [0.92, 0.95, 1])
  const opacity = useTransform(progress, range, [0.28, 0.55, 1])

  return (
    <motion.div
      ref={slotRef}
      className={`${styles.slot} ${styles[item.slot]}`}
      style={
        prefersReduced
          ? undefined
          : {
              x,
              y,
              rotate,
              rotateX,
              scale,
              opacity,
            }
      }
    >
      <CareerCard item={item} />
    </motion.div>
  )
}

export default function CareerReleaseStack() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className={styles.section}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          variants={{
            hidden: {},
            show: { transition: { delayChildren: stagger(0.08) } },
          }}
          initial={prefersReduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <HandwrittenText className={styles.hand} delay={0.04}>
            I kept scaling the impact & responsibility
          </HandwrittenText>
          <motion.h2
            id="experience-title"
            className={styles.title}
            variants={revealItem}
          >
            <span className={styles.titleLine}>Career &amp; Engineering</span>
            <span className={styles.titleLine}>Milestone Stack.</span>
          </motion.h2>
          <motion.p className={styles.intro} variants={revealItem}>
            From Intern to Associate Project Lead — driving microservices, AWS pipelines, and leading a team of 5 engineers.
          </motion.p>
        </motion.header>

        <div className={styles.stage}>
          {CARDS.map((item, index) => (
            <CareerSlot
              key={item.id}
              item={item}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

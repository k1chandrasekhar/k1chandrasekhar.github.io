import { useState } from 'react'
import {
  LayoutGroup,
  motion,
  useReducedMotion,
  stagger,
} from 'motion/react'
import styles from './SystemsUnderPressure.module.css'

const STAGES = [
  { index: '01', role: 'INGEST', name: 'Kinesis Firehose', detail: '10M+ daily log stream' },
  { index: '02', role: 'CATALOG', name: 'AWS Glue', detail: 'schema catalog & ETL' },
  { index: '03', role: 'STORE', name: 'S3 Parquet', detail: 'columnar log storage' },
  { index: '04', role: 'QUERY', name: 'AWS Athena', detail: 'log query latency <3s' },
]

const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', visualDuration: 0.45, bounce: 0 },
  },
}

const lamfReveal = {
  hidden: {
    opacity: 0,
    y: 68,
    scale: 0.92,
    rotateX: 7,
    rotateZ: -0.7,
    transformPerspective: 1200,
    transformOrigin: '50% 0%',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateZ: 0,
    transformPerspective: 1200,
    transition: {
      default: {
        type: 'spring',
        stiffness: 145,
        damping: 22,
        mass: 0.84,
      },
      opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      when: 'beforeChildren',
      delayChildren: 0.1,
    },
  },
}

const corridorSequence = {
  hidden: {},
  show: {
    transition: {
      delayChildren: stagger(0.12, { startDelay: 0.12 }),
    },
  },
}

const corridorItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', visualDuration: 0.4, bounce: 0 },
  },
}

const pipelineStage = {
  hidden: (index) => ({
    opacity: 0,
    y: index % 2 === 0 ? -24 : 24,
    rotateX: -8,
    scale: 0.96,
  }),
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 24,
      mass: 0.75,
    },
  },
}

const caseReveal = {
  hidden: (index) => {
    const entrances = [
      { x: -86, y: 46, rotate: -2.4, rotateY: -5 },
      { x: 46, y: 76, rotate: 2.6, rotateY: 6 },
      { x: 82, y: 42, rotate: -2.2, rotateY: -6 },
    ]
    return {
      opacity: 0,
      scale: 0.9,
      transformPerspective: 1100,
      transformOrigin: '50% 50%',
      ...entrances[index],
    }
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    rotateY: 0,
    scale: 1,
    transformPerspective: 1100,
    transition: {
      default: {
        type: 'spring',
        stiffness: 150,
        damping: 21,
        mass: 0.8,
      },
      opacity: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
    },
  },
}

function CorridorStack({ prefersReduced }) {
  const [activeStage, setActiveStage] = useState(STAGES.length - 1)

  return (
    <motion.div
      className={styles.corridor}
      variants={corridorSequence}
      onPointerLeave={() => setActiveStage(STAGES.length - 1)}
    >
      <motion.div className={styles.metricHeader} variants={corridorItem}>
        <div className={styles.metricLeft}>
          <p className={styles.eventValue}>10,000,000+</p>
          <p className={styles.eventLabel}>
            daily log &amp; transaction events streaming through AWS
          </p>
        </div>
        <div className={styles.queryMetric} aria-label="API response latency cut from 30 seconds to sub-second under 1s">
          <span className={`mono ${styles.queryOld}`}>&gt;30s</span>
          <span className={styles.queryArrow} aria-hidden="true">→</span>
          <strong className={`mono ${styles.queryGain}`}>&lt;1s</strong>
          <span className={`mono ${styles.queryLabel}`}>API LATENCY</span>
        </div>
      </motion.div>

      <LayoutGroup id="lamf-signal-path">
        <motion.div
          className={styles.pipeline}
          role="list"
          aria-label="Pipeline stages"
          variants={{
            hidden: {},
            show: { transition: { delayChildren: stagger(0.09) } },
          }}
        >
          <div className={styles.pipelineRoute} aria-hidden="true">
            <motion.span
              className={styles.pipelineRouteFill}
              initial={prefersReduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.85, ease: [0.65, 0, 0.35, 1] }
              }
            />
          </div>

          {STAGES.map((stage, index) => (
            <motion.div
              key={stage.index}
              className={styles.stageSlot}
              custom={index}
              variants={pipelineStage}
              role="listitem"
            >
              <motion.div
                className={styles.stage}
                data-active={activeStage === index ? 'true' : undefined}
                tabIndex={0}
                aria-current={activeStage === index ? 'step' : undefined}
                aria-label={`${stage.role}: ${stage.name}`}
                onPointerEnter={() => setActiveStage(index)}
                onFocus={() => setActiveStage(index)}
                onClick={() => setActiveStage(index)}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                whileTap={prefersReduced ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {activeStage === index && (
                  <motion.span
                    className={styles.stageActive}
                    layoutId="lamf-active-stage"
                    style={{
                      borderRadius: 14,
                      boxShadow:
                        'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -18px 34px rgba(9, 12, 18, 0.08)',
                    }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 320,
                            damping: 30,
                            mass: 0.7,
                          }
                    }
                    aria-hidden="true"
                  />
                )}
                <div className={styles.stageTop}>
                  <span className={`mono ${styles.stageIndex}`}>
                    {stage.index}
                  </span>
                  <span className={`mono ${styles.stageRole}`}>
                    {stage.role}
                  </span>
                </div>
                <strong className={styles.stageName}>{stage.name}</strong>
                <span className={`mono ${styles.stageDetail}`}>
                  {stage.detail}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>

      <motion.div className={styles.obsRail} variants={corridorItem}>
        <span className={styles.obsLine} aria-hidden="true" />
        <div className={styles.obsCopy}>
          <span className={`mono ${styles.obsLabel}`}>
            FULL OPERATIONAL OBSERVABILITY
          </span>
          <span className={`mono ${styles.obsTools}`}>
            Prometheus &nbsp;/&nbsp; Tempo &nbsp;/&nbsp; Grafana
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SystemsUnderPressure() {
  const prefersReduced = useReducedMotion()
  const [activeCase, setActiveCase] = useState('sip')

  const activeSurface = (id) =>
    activeCase === id ? (
      <motion.span
        className={styles.caseActive}
        layoutId="secondary-case-active"
        style={{
          borderRadius: id === 'sip' ? 22 : 20,
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -24px 42px rgba(9, 12, 18, 0.08)',
        }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.72,
              }
        }
        aria-hidden="true"
      />
    ) : null

  return (
    <section
      className={styles.section}
      id="systems"
      aria-labelledby="systems-title"
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
          <motion.h2
            id="systems-title"
            className={styles.title}
            variants={revealItem}
          >
            <span className={styles.titleLine}>Systems &amp; Architecture</span>
            <span className={styles.titleLine}>Built for High Scale.</span>
          </motion.h2>
          <motion.p className={styles.intro} variants={revealItem}>
            From legacy monolithic .NET refactoring to AWS log streaming pipelines handling 10M+ daily events.
          </motion.p>
        </motion.header>

        <motion.article
          className={styles.lamf}
          aria-label="LAMF flagship case"
          variants={lamfReveal}
          initial={prefersReduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.lamfNarrative}>
            <div className={styles.lamfIntro}>
              <p className={styles.lamfName}>LAMF</p>
              <p className={styles.lamfSubName}>Loan Against Mutual Fund Platform</p>
              <p className={styles.lamfStatement}>
                High-frequency financial transaction platform where throughput, sub-second API response latency, and mTLS security are paramount.
              </p>
              <p className={`mono ${styles.lamfStack}`}>
                NODE.JS &nbsp;/&nbsp; NESTJS &nbsp;/&nbsp; AWS KINESIS &nbsp;/&nbsp; S3 PARQUET &nbsp;/&nbsp; mTLS
              </p>
            </div>
            <div className={styles.lamfLesson}>
              <p className={`mono ${styles.lessonLabel}`}>THE HARD PART</p>
              <p className={styles.lessonText}>
                Reduce API latency from &gt;30s to sub-second (&lt;1s) while cutting primary MS-SQL database load by 40%.
              </p>
            </div>
          </div>

          <CorridorStack prefersReduced={prefersReduced} />
        </motion.article>

        <LayoutGroup id="secondary-casework">
          <motion.div
            className={styles.secondary}
            onPointerLeave={() => setActiveCase('sip')}
            variants={{
              hidden: {},
              show: {
                transition: {
                  delayChildren: stagger(0.13, { startDelay: 0.04 }),
                },
              },
            }}
            initial={prefersReduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.article
              className={`${styles.caseCard} ${styles.sip}`}
              data-active={activeCase === 'sip' ? 'true' : undefined}
              custom={0}
              variants={caseReveal}
              aria-label="Group SIP"
              tabIndex={0}
              onPointerEnter={() => setActiveCase('sip')}
              onFocus={() => setActiveCase('sip')}
              onClick={() => setActiveCase('sip')}
              whileHover={prefersReduced ? undefined : { y: -5 }}
              whileTap={prefersReduced ? undefined : { scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              {activeSurface('sip')}
              <div className={styles.sipHeader}>
                <h3 className={styles.sipName}>Group SIP (GSIP)</h3>
                <p className={styles.sipRole}>Corporate investment portal</p>
                <p className={styles.sipSummary}>
                  Led backend engineering, mentoring a team of 5 engineers, deploying containerized microservices on AWS ECS via AWS CDK and Jenkins CI/CD.
                </p>
              </div>

              <div className={styles.sipProof}>
                <div className={styles.sipTeam}>
                  <p className={styles.sipTeamValue}>05</p>
                  <p className={styles.sipTeamLabel}>engineers led</p>
                </div>
                <div className={styles.sipShip}>
                  <p className={styles.sipShipValue}>ECS</p>
                  <p className={`mono ${styles.sipShipStack}`}>
                    CDK &nbsp;/&nbsp; JENKINS &nbsp;/&nbsp; NESTJS
                  </p>
                </div>
              </div>

              <p className={styles.sipLesson}>
                Salary-linked investment parsing across multiple AMCs with automated payroll validation routines.
              </p>
            </motion.article>

            <div className={styles.labs}>
              <motion.article
                className={`${styles.caseCard} ${styles.lab} ${styles.labSimplete}`}
                data-active={activeCase === 'comms' ? 'true' : undefined}
                custom={1}
                variants={caseReveal}
                aria-label="Comms Dispatcher"
                tabIndex={0}
                onPointerEnter={() => setActiveCase('comms')}
                onFocus={() => setActiveCase('comms')}
                onClick={() => setActiveCase('comms')}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                whileTap={prefersReduced ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                {activeSurface('comms')}
                <div>
                  <p className={`mono ${styles.labKind}`}>EVENT-DRIVEN PLATFORM</p>
                  <h3 className={styles.labName}>Comms Dispatcher</h3>
                  <p className={styles.labBody}>
                    Multi-channel message delivery (Email, SMS, WhatsApp) using Apache Kafka queues and React real-time dashboard.
                  </p>
                </div>
                <p className={`mono ${styles.labStack}`}>
                  Spring Boot / Kafka / MongoDB / React
                </p>
              </motion.article>

              <motion.article
                className={`${styles.caseCard} ${styles.lab} ${styles.labArtha}`}
                data-active={activeCase === 'cersai' ? 'true' : undefined}
                custom={2}
                variants={caseReveal}
                aria-label="CERSAI KYC Wrapper"
                tabIndex={0}
                onPointerEnter={() => setActiveCase('cersai')}
                onFocus={() => setActiveCase('cersai')}
                onClick={() => setActiveCase('cersai')}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                whileTap={prefersReduced ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                {activeSurface('cersai')}
                <div>
                  <p className={`mono ${styles.labKind}`}>REGULATORY SECURITY</p>
                  <h3 className={styles.labName}>CERSAI KYC Wrapper</h3>
                  <p className={styles.labBody}>
                    Two-way mTLS &amp; JWE/JWS payload encryption serving 30,000+ daily regulatory verification requests for KFin NPS.
                  </p>
                </div>
                <p className={`mono ${styles.labStack}`}>
                  mTLS / JWE / JWS / Node.js
                </p>
              </motion.article>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

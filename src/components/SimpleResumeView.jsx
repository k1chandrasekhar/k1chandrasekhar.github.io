import { motion, useReducedMotion } from 'motion/react'
import styles from './SimpleResumeView.module.css'

const EXPERIENCE = [
  {
    company: 'KFin Technologies',
    location: 'Hyderabad, India',
    role: 'Associate Project Lead (Promoted from Senior Software Engineer)',
    dates: 'Apr 2024 - Present',
    points: [
      'Earned Outstanding (OS) performance ratings for 2 consecutive financial years and promoted to Associate Project Lead; leading and mentoring 5 software engineers.',
      'Re-architected legacy monolithic .NET APIs into asynchronous Node.js microservices, cutting API response latency from >30s to sub-second (<1s).',
      'Architected core backend for Loan Against Mutual Fund (LAMF) platform with event-driven SQS + Lambda PDF generation.',
      'Engineered AWS log streaming data pipeline (Kinesis Firehose → Glue → S3 Parquet → Athena) processing 10M+ daily events, reducing query latency from 15s to <3s and DB load by 40%.',
      'Built mTLS & JWE/JWS regulatory security wrapper for CERSAI KYC verification handling 30,000+ daily requests for KFin NPS.',
      'Established full operational observability using Prometheus, Grafana, and Tempo.',
    ],
  },
  {
    company: 'Tech Mahindra',
    location: 'Hyderabad, India',
    role: 'Software Engineer',
    dates: 'Mar 2021 - Dec 2023',
    points: [
      'Designed, deployed, and maintained large-scale ETL data pipelines using Python, SQL, and Hadoop workflows for Three UK Networks.',
      'Automated daily Hadoop batch processing schedules using Shell scripts and crontabs, maintaining 99.9% pipeline execution availability.',
      'Optimized complex SQL queries, indexing, and partitioning strategies, boosting query throughput by >75% across multi-terabyte tables.',
    ],
  },
  {
    company: 'Tech Mahindra',
    location: 'Bengaluru, India',
    role: 'Software Engineer Intern',
    dates: 'Dec 2020 - Mar 2021',
    points: [
      'Developed backend data transformation scripts and optimized database queries in Python and SQL to support internal enterprise reporting tools.',
      'Participated in daily Agile standups, code reviews, and unit test automation.',
    ],
  },
]

const SYSTEM_GROUPS = [
  {
    title: 'Production Systems',
    items: [
      {
        name: 'Group SIP (GSIP)',
        meta: 'NestJS · MongoDB · AWS ECS · AWS CDK · Jenkins',
        text: 'Corporate investment portal enabling salary-linked SIP investments across multiple Asset Management Companies (AMCs).',
      },
      {
        name: 'Comms Dispatcher',
        meta: 'Java Spring Boot · Apache Kafka · MongoDB · React',
        text: 'High-concurrency, event-driven communication microservice for multi-channel message delivery (Email, SMS, WhatsApp) with real-time React monitoring.',
      },
      {
        name: 'AetherProxy',
        meta: 'JavaScript · Chrome Extension API · Published Tool',
        text: 'Published developer proxy switcher and IP management browser extension available on the Chrome Web Store.',
      },
    ],
  },
  {
    title: 'Enterprise Architecture',
    items: [
      {
        name: 'LAMF Platform',
        meta: 'Node.js · SQS + Lambda · Athena · Kinesis',
        text: 'Core lending backend processing 10M+ daily events with sub-second API latency and automated PDF dispatch.',
      },
      {
        name: 'CERSAI KYC Security',
        meta: 'mTLS · JWE/JWS · Node.js · KFin NPS',
        text: 'Two-way mutual TLS and encrypted payload wrapper for regulatory compliance handling 30,000+ daily requests.',
      },
    ],
  },
]

const SKILL_GROUPS = [
  {
    title: 'Microservices & Core Stack',
    rows: [
      ['Backend', 'Node.js, NestJS, Express.js, Java Spring Boot, RESTful APIs, Async Workflows'],
      ['Security', 'mTLS, JWE/JWS Encryption, Two-Way Authentication'],
      ['Languages', 'JavaScript, TypeScript, Python, Java, SQL, Shell Scripting'],
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    rows: [
      ['AWS Cloud', 'ECS, CDK, S3, Athena, Glue, Kinesis Firehose, Lambda, SQS'],
      ['DevOps', 'Docker, Jenkins CI/CD, Containerization'],
      ['Observability', 'Prometheus, Grafana, Tempo, CloudWatch'],
    ],
  },
  {
    title: 'Databases & Data Engineering',
    rows: [
      ['Databases', 'MS-SQL, MongoDB, PostgreSQL, Query Optimization & Indexing'],
      ['Big Data', 'Hadoop Workflows, PySpark, Apache Parquet, Apache Kafka'],
      ['Leadership', 'Engineering Team Lead (5 Engineers), Sprint Planning, Architecture Reviews'],
    ],
  },
]

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

function Reveal({ children, className = '', amount = 0.16 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

export default function SimpleResumeView() {
  return (
    <article className={styles.simpleView}>
      <header className={styles.hero} id="simple-profile">
        <Reveal className={styles.heroGrid} amount={0.4}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Associate Project Lead &amp; Senior Software Engineer</p>
            <h1>Kamjula ChandraSekhar</h1>
            <p className={styles.role}>
              High-throughput microservices &amp; cloud data pipelines.
            </p>
            <p className={styles.summary}>
              5+ years of experience re-architecting legacy monoliths into sub-second microservices (&lt;1s latency), scaling AWS cloud data pipelines for 10M+ daily events, and leading a team of 5 software engineers with 2 consecutive Outstanding (OS) performance ratings.
            </p>
            <div className={styles.contactLine}>
              <a href="mailto:chandrasekhar.k.work@gmail.com">
                chandrasekhar.k.work@gmail.com
              </a>
              <a
                href="https://github.com/k1chandrasekhar"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/k1chandrasekhar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="/Chandrasekhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', fontWeight: 600 }}
              >
                Download PDF Resume ↗
              </a>
            </div>
          </div>

          <dl className={styles.profileFacts}>
            <div>
              <dt>Current Role</dt>
              <dd>Associate Project Lead @ KFintech</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Microservices, AWS Cloud, Telemetry</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Hyderabad, India</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className={styles.metrics}>
          {[
            ['5+', 'years engineering'],
            ['<1s', 'API response latency'],
            ['10M+', 'events / day'],
            ['2x OS', 'ratings achieved'],
          ].map(([value, label]) => (
            <div className={styles.metric} key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
      </header>

      <section
        className={`${styles.section} ${styles.sectionTint}`}
        id="simple-experience"
        aria-labelledby="simple-experience-title"
      >
        <Reveal className={styles.sectionHeading}>
          <h2 id="simple-experience-title">Professional Experience</h2>
          <p>
            Career progression at KFin Technologies and Tech Mahindra in microservices, AWS cloud, and data pipelines.
          </p>
        </Reveal>

        <div className={styles.experienceList}>
          {EXPERIENCE.map((job) => (
            <Reveal className={styles.job} key={job.company + job.role}>
              <div className={styles.jobMeta}>
                <h3>{job.company}</h3>
                <p>{job.location}</p>
                <span>{job.dates}</span>
              </div>
              <div className={styles.jobBody}>
                <h4>{job.role}</h4>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className={styles.section}
        id="simple-systems"
        aria-labelledby="simple-systems-title"
      >
        <Reveal className={styles.sectionHeading}>
          <h2 id="simple-systems-title">Featured Projects &amp; Systems</h2>
          <p>
            Production engineering deliverables across microservices, cloud pipelines, and developer tooling.
          </p>
        </Reveal>

        <div className={styles.systemGroups}>
          {SYSTEM_GROUPS.map((group) => (
            <Reveal className={styles.systemGroup} key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => (
                <article className={styles.system} key={item.name}>
                  <h4>{item.name}</h4>
                  <p>{item.text}</p>
                  <span>{item.meta}</span>
                </article>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionTint}`}
        id="simple-skills"
        aria-labelledby="simple-skills-title"
      >
        <Reveal className={styles.sectionHeading}>
          <h2 id="simple-skills-title">Technical Competencies</h2>
        </Reveal>

        <div className={styles.skillGroups}>
          {SKILL_GROUPS.map((group) => (
            <Reveal className={styles.skillGroup} key={group.title}>
              <h3>{group.title}</h3>
              <dl>
                {group.rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.closing}`}
        id="simple-contact"
        aria-labelledby="simple-contact-title"
      >
        <Reveal className={styles.credentials}>
          <div>
            <h2>Education &amp; Verified Certifications</h2>
            <dl>
              <div>
                <dt>B.Tech, Computer Science &amp; Engineering</dt>
                <dd>
                  REVA University (Bangalore, India) · 2016 — 2020
                </dd>
              </div>
              <div>
                <dt>Back End with Node.js</dt>
                <dd>Full Stack Development Credentials</dd>
              </div>
              <div>
                <dt>Microsoft Certified: Azure AI Fundamentals</dt>
                <dd>Cloud &amp; Artificial Intelligence</dd>
              </div>
            </dl>
          </div>
          <div className={styles.contactBlock}>
            <h2 id="simple-contact-title">Contact</h2>
            <p>
              Open to technical leadership, backend architecture, and lead software engineering roles.
            </p>
            <a
              className={styles.emailLink}
              href="mailto:chandrasekhar.k.work@gmail.com"
            >
              Email me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </section>
    </article>
  )
}

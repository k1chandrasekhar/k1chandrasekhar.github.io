/**
 * Key Projects data for Kamjula ChandraSekhar
 */
export const projects = [
  {
    name: 'Group SIP (GSIP) — Corporate Investment Portal',
    description:
      'Led backend engineering for a corporate investment platform enabling salary-linked SIP investments across multiple Asset Management Companies (AMCs). Architected NestJS microservices and MongoDB schemas, deploying containerized infrastructure on AWS ECS provisioned via AWS CDK with automated Jenkins CI/CD pipelines.',
    tags: ['NestJS', 'MongoDB', 'AWS ECS', 'AWS CDK', 'Jenkins'],
    github: 'https://github.com/k1chandrasekhar',
    live: null,
    color: 'accent',
    category: 'microservices',
  },
  {
    name: 'Comms Dispatcher Microservice',
    description:
      'Developed a high-concurrency, event-driven communication microservice for multi-channel message delivery (Email, SMS, WhatsApp) utilizing Apache Kafka for distributed queue processing. Designed unified REST APIs and created a real-time React monitoring dashboard.',
    tags: ['Java Spring Boot', 'Apache Kafka', 'MongoDB', 'React', 'REST APIs'],
    github: 'https://github.com/k1chandrasekhar',
    live: null,
    color: 'purple',
    category: 'microservices',
  },
  {
    name: 'AetherProxy Chrome Extension',
    description:
      'Built and published AetherProxy on the Chrome Web Store, providing developers with an intuitive proxy switcher and IP management tool. Engineered background web request interceptors and a responsive popup interface to streamline network proxy routing.',
    tags: ['JavaScript', 'Chrome Extension API', 'Web APIs'],
    github: 'https://github.com/k1chandrasekhar',
    live: 'https://chromewebstore.google.com/search/AetherProxy?hl=en-US&utm_source=ext_sidebar',
    color: 'amber',
    category: 'tools',
  },
  {
    name: 'LAMF Platform & Log Telemetry Pipeline',
    description:
      'Architected core backend services and log streaming pipelines (AWS Kinesis Firehose → Glue → S3 Parquet → Athena) processing 10M+ daily events. Built event-driven SQS + Lambda PDF generation and reduced database load by 40%.',
    tags: ['AWS Kinesis', 'AWS Glue', 'S3 Parquet', 'Athena', 'Lambda', 'SQS', 'Node.js'],
    github: 'https://github.com/k1chandrasekhar',
    live: null,
    color: 'blue',
    category: 'data',
  },
  {
    name: 'CERSAI Regulatory KYC Verification Wrapper',
    description:
      'Engineered secure API integration wrapper for CERSAI Regulatory KYC verification using two-way mutual TLS (mTLS) and JWE/JWS payload encryption, serving 30,000+ daily verification requests for KFin NPS.',
    tags: ['mTLS', 'JWE/JWS Encryption', 'Node.js', 'Regulatory Tech'],
    github: 'https://github.com/k1chandrasekhar',
    live: null,
    color: 'accent',
    category: 'microservices',
  },
  {
    name: 'Three UK Networks Telemetry ETL Pipelines',
    description:
      'Designed and maintained large-scale ETL data pipelines using Python, SQL, and Hadoop workflows for Three UK Networks. Automated daily processing schedules ensuring 99.9% uptime and boosting SQL query throughput by >75%.',
    tags: ['Python', 'SQL', 'Hadoop Workflows', 'Shell Automation'],
    github: 'https://github.com/k1chandrasekhar',
    live: null,
    color: 'emerald',
    category: 'data',
  },
]

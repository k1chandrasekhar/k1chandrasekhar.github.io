/**
 * Work experience data for Kamjula ChandraSekhar
 */
export const experiences = [
  {
    title: 'Associate Project Lead',
    company: 'KFin Technologies',
    subtitle: 'Promoted from Senior Software Engineer',
    location: 'Hyderabad, India',
    start: 'Apr 2024',
    end: 'Present',
    tags: ['Node.js', 'NestJS', 'AWS ECS', 'AWS CDK', 'Kinesis Firehose', 'SQS + Lambda', 'mTLS', 'JWE/JWS', 'MS-SQL', 'MongoDB', 'Prometheus', 'Grafana', 'Tempo'],
    bullets: [
      'Earned Outstanding (OS) performance ratings for 2 consecutive financial years and achieved promotion to Associate Project Lead; currently leading, mentoring, and driving technical delivery for a team of 5 software engineers.',
      'Re-architected legacy monolithic .NET APIs into asynchronous Node.js microservices, reducing average API response latency from >30 seconds to sub-second (<1s) for high-frequency financial transaction workflows.',
      'Architected core backend services for the Loan Against Mutual Fund (LAMF) platform, building event-driven notification systems (SQS + Lambda) for asynchronous PDF generation and real-time email dispatch.',
      'Engineered scalable log streaming data pipelines (AWS Kinesis Firehose → Glue → S3 Parquet → Athena) processing 10M+ daily events, reducing log query latency from 15s to <3s while reducing primary MS-SQL database load by 40%.',
      'Built a secure API integration wrapper for CERSAI Regulatory KYC verification using two-way mutual TLS (mTLS) and JWE/JWS payload encryption, serving 30,000+ daily verification requests for KFin NPS.',
      'Established full operational observability using Prometheus, Grafana, and Tempo, enabling real-time metrics monitoring and proactive incident resolution.',
      'Lead sprint planning, architectural design reviews, code quality audits, and automated CI/CD pipeline deployments across AWS environments.'
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Tech Mahindra',
    location: 'Hyderabad, India',
    start: 'Mar 2021',
    end: 'Dec 2023',
    tags: ['Python', 'SQL', 'Hadoop Workflows', 'Shell Scripting', 'ETL Pipelines', 'Three UK Networks', 'Query Optimization'],
    bullets: [
      'Designed, deployed, and maintained large-scale ETL data pipelines using Python, SQL, and Hadoop workflows for Three UK Networks, processing and transforming high-volume network telemetry data feeds.',
      'Automated daily Hadoop batch processing schedules using Shell scripts and crontabs, eliminating manual operational steps and ensuring 99.9% pipeline execution availability.',
      'Implemented automated data validation scripts and quality checks to detect schema drifts and corrupted telemetry records prior to database ingestion.',
      'Optimized complex SQL queries, database indexing, and table partitioning strategies, boosting query throughput by >75% across multi-terabyte data tables.',
      'Collaborated closely with international product managers and technical stakeholders to scope requirements, align pipeline architecture, and deliver key engineering milestones on schedule.'
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Tech Mahindra',
    location: 'Bengaluru, India',
    start: 'Dec 2020',
    end: 'Mar 2021',
    tags: ['Python', 'SQL', 'Data Transformation', 'Agile/Scrum', 'QA & Unit Testing'],
    bullets: [
      'Developed backend data transformation scripts and optimized database queries in Python and SQL to support internal enterprise reporting tools.',
      'Participated in daily Agile standups, code reviews, and automated unit test creation for backend data ingestion components.'
    ],
  },
]

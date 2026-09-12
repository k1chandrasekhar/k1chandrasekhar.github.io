/**
 * Skills data for Kamjula ChandraSekhar
 */
const skill = (label, icon = null) => ({ label, icon })

export const skills = [
  {
    category: 'Microservices & API Architecture',
    color: 'accent',
    items: [
      skill('Node.js', 'nodejs'),
      skill('NestJS', 'nestjs'),
      skill('Express.js', 'express'),
      skill('Java Spring Boot', 'java'),
      skill('RESTful APIs', 'rest'),
      skill('Asynchronous Workflows', 'async'),
      skill('mTLS Security', 'mtls'),
      skill('JWE/JWS Security', 'jwe-jws'),
      skill('JavaScript', 'javascript'),
      skill('TypeScript', 'typescript'),
    ],
  },
  {
    category: 'Cloud Infrastructure & DevOps',
    color: 'accent',
    items: [
      skill('AWS ECS', 'aws-ecs'),
      skill('AWS CDK', 'aws-cdk'),
      skill('AWS S3', 'aws-s3'),
      skill('AWS Athena', 'aws-athena'),
      skill('AWS Glue', 'aws-glue'),
      skill('Kinesis Firehose', 'aws-firehose'),
      skill('AWS Lambda', 'aws-lambda'),
      skill('AWS SQS', 'aws-sqs'),
      skill('Docker', 'docker'),
      skill('Jenkins CI/CD', 'jenkins'),
    ],
  },
  {
    category: 'Data Engineering & Pipelines',
    color: 'green',
    items: [
      skill('Big Data ETL Pipelines', 'etl'),
      skill('Hadoop Workflows', 'hadoop'),
      skill('PySpark', 'python'),
      skill('Apache Parquet', 'parquet'),
      skill('Apache Kafka Messaging', 'kafka'),
      skill('Python', 'python'),
      skill('Shell Automation', 'shell'),
    ],
  },
  {
    category: 'Databases & Observability',
    color: 'purple',
    items: [
      skill('MS-SQL', 'mssql'),
      skill('MongoDB', 'mongodb'),
      skill('PostgreSQL', 'postgresql'),
      skill('Query Optimization', 'sql'),
      skill('Prometheus', 'prometheus'),
      skill('Grafana', 'grafana'),
      skill('Tempo Observability', 'tempo'),
    ],
  },
  {
    category: 'Leadership & Engineering Practices',
    color: 'blue',
    items: [
      skill('Team Leadership (5 Engineers)', 'team-lead'),
      skill('Technical Mentorship', 'mentorship'),
      skill('Sprint Planning', 'agile'),
      skill('System Design', 'system-design'),
      skill('Code Reviews', 'code-review'),
      skill('Agile/Scrum', 'scrum'),
    ],
  },
]

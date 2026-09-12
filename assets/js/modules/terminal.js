/**
 * CLI Terminal Drawer Module
 * Gives recruiters & developers an interactive command line interface (Ctrl+K or terminal button)
 */
export function initTerminal() {
  const terminalModal = document.querySelector('[data-terminal-modal]');
  const terminalToggle = document.querySelector('[data-terminal-toggle]');
  const terminalClose = document.querySelector('[data-terminal-close]');
  const terminalBody = document.querySelector('[data-terminal-body]');
  const terminalInput = document.querySelector('[data-terminal-input]');

  if (!terminalModal || !terminalInput) return;

  function openTerminal() {
    terminalModal.classList.add('open');
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('open');
  }

  if (terminalToggle) {
    terminalToggle.addEventListener('click', openTerminal);
  }

  if (terminalClose) {
    terminalClose.addEventListener('click', closeTerminal);
  }

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) {
      closeTerminal();
    }
  });

  // Global Ctrl+K / Cmd+K shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
      closeTerminal();
    }
  });

  // Commands registry
  const commands = {
    help: () => `
Available Commands:
  <span class="cmd">metrics</span>    - View key performance metrics (>30s -> <1s, 10M+ daily events)
  <span class="cmd">skills</span>     - View core technology stack
  <span class="cmd">projects</span>   - View featured projects (GSIP, Comms Dispatcher, AetherProxy)
  <span class="cmd">experience</span> - View professional experience breakdown
  <span class="cmd">resume</span>     - View resume download link & contact
  <span class="cmd">clear</span>      - Clear terminal screen
  <span class="cmd">contact</span>    - Copy direct email address
    `,
    metrics: () => `
<strong style="color: var(--emerald);">[KEY PERFORMANCE IMPACT METRICS]</strong>
• <strong>Latency Reduction:</strong> Re-architected legacy .NET monolith into async Node.js services, cutting latency from >30s to sub-second (<1s).
• <strong>AWS Log Data Pipeline:</strong> AWS Kinesis Firehose -> Glue -> S3 Parquet -> Athena processing 10M+ daily events. Query latency cut 15s -> <3s, DB load reduced by 40%.
• <strong>CERSAI KYC Wrapper:</strong> mTLS + JWE/JWS payload encryption serving 30,000+ daily verification requests.
• <strong>Performance Rating:</strong> 2 consecutive years of Outstanding (OS) performance ratings at KFin Technologies.
• <strong>Team Leadership:</strong> Leading and mentoring 5 software engineers as Associate Project Lead.
    `,
    skills: () => `
<strong style="color: var(--accent);">[CORE COMPETENCIES & TECH STACK]</strong>
• <strong>Languages:</strong> Node.js, TypeScript, JavaScript, Python, Java, SQL, Shell
• <strong>Frameworks:</strong> NestJS, Express.js, Java Spring Boot, React
• <strong>Cloud & DevOps:</strong> AWS (ECS, CDK, S3, Athena, Glue, Kinesis, Lambda, SQS), Docker, Jenkins CI/CD
• <strong>Messaging & Data:</strong> Apache Kafka, PySpark, Hadoop Workflows, Parquet
• <strong>Databases & Observability:</strong> MS-SQL, MongoDB, PostgreSQL, Prometheus, Grafana, Tempo
    `,
    projects: () => `
<strong style="color: var(--primary-hover);">[FEATURED PROJECTS]</strong>
1. <strong>Group SIP (GSIP):</strong> Corporate Investment Portal (NestJS, MongoDB, AWS ECS, AWS CDK, Jenkins)
2. <strong>Comms Dispatcher Microservice:</strong> Event-driven multi-channel messaging (Java Spring Boot, Kafka, MongoDB, React)
3. <strong>AetherProxy Chrome Extension:</strong> Published developer proxy switcher tool (JavaScript, Web APIs)
    `,
    experience: () => `
<strong style="color: var(--text);">[CAREER TIMELINE]</strong>
• <strong>KFin Technologies (Apr 2024 - Present):</strong> Associate Project Lead (Promoted from Sr. Software Engineer)
• <strong>Tech Mahindra (Mar 2021 - Dec 2023):</strong> Software Engineer (Three UK Networks ETL Data Pipelines)
• <strong>Tech Mahindra (Dec 2020 - Mar 2021):</strong> Software Engineer Intern
    `,
    resume: () => `
<strong style="color: var(--emerald);">[RESUME & CONTACT]</strong>
• PDF Resume: <a href="./assets/docs/Chandrasekhar_Resume.pdf" target="_blank" style="color: var(--primary-hover); text-decoration: underline;">Chandrasekhar_Resume.pdf</a>
• Email: chandrasekhar.k.work@gmail.com
• LinkedIn: linkedin.com/in/k1chandrasekhar
• GitHub: github.com/k1chandrasekhar
    `,
    contact: () => {
      navigator.clipboard.writeText('chandrasekhar.k.work@gmail.com');
      return `<span style="color: var(--emerald);">✓ Copied chandrasekhar.k.work@gmail.com to clipboard!</span>`;
    },
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      if (!inputVal) return;

      // Print prompt line
      const inputLine = document.createElement('div');
      inputLine.className = 'terminal-line';
      inputLine.innerHTML = `<span class="terminal-prompt">visitor@k1chandrasekhar:~$</span> ${escapeHTML(inputVal)}`;
      terminalBody.appendChild(inputLine);

      terminalInput.value = '';

      // Process command
      let responseHTML = '';
      if (commands[inputVal]) {
        responseHTML = commands[inputVal]();
      } else {
        responseHTML = `Command not found: '<span style="color: var(--danger);">${escapeHTML(inputVal)}</span>'. Type '<span style="color: var(--emerald);">help</span>' for available commands.`;
      }

      if (responseHTML) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.innerHTML = responseHTML;
        terminalBody.appendChild(responseLine);
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

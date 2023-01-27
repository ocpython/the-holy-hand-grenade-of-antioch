export const coreTechnologies = [
  {
    title: 'Django',
    description: 'Python web framework',
    detail: 'The web application framework that powers μblog',
    image: 'django.jpeg',
    documentationLink: 'https://www.djangoproject.com/',
  },
  {
    title: 'Django REST Framework',
    description: 'API Framework for Django',
    detail: 'Used for building APIs with Django',
    image: 'drf_square.png',
    documentationLink: 'https://www.django-rest-framework.org/',
  },
  {
    title: 'Vue 3',
    description: 'The latest version of Vue.js',
    detail: 'Used to build the frontend',
    image: 'vue3.png',
    documentationLink: 'https://vuejs.org/',
  },
  {
    title: 'Quasar',
    description: 'A Vue.js Framework for building web apps',
    detail: 'A Vue.js framework and component library',
    image: 'quasar.png',
    documentationLink: 'https://quasar.dev/',
  },
]

const otherTechnologies = [
  {
    title: 'Python',
    description: 'A general-purpose programming language',
    detail: 'The language used for programming the web backend',
    image: 'python.png',
    documentationLink: 'https://www.python.org/',
  },
  {
    title: 'Poetry',
    description: 'Python dependency management and packaging made easy',
    detail: 'A tool used to manage python dependencies',
    image: 'poetry.png',
    documentationLink: 'https://python-poetry.org/',
  },
  {
    title: 'Black',
    description: 'The uncompromising Python code formatter',
    detail: 'A tool used for formatting Python code',
    image: 'black.png',
    documentationLink: 'https://github.com/psf/black',
  },
  {
    title: 'pytest',
    description: 'helps you write better programs',
    detail: 'used for unit-testing backend python code',
    image: 'pytest.png',
    documentationLink: 'https://docs.pytest.org/en/latest/index.html',
  },

  {
    title: 'Celery',
    description: 'an open source asynchronous task queue based on distributed message passing',
    detail: 'a library used for processing tasks',
    image: 'celery.png',
    documentationLink: 'https://docs.celeryproject.org/en/stable/getting-started/introduction.html',
  },

  {
    title: 'Postgres',
    description: 'This is postgres',
    detail: 'This is more about postgres',
    image: 'elephant.png',
    documentationLink: 'https://www.postgresql.org/',
  },

  {
    title: 'Redis',
    description: 'An in memory database',
    detail: 'Used for caching and message brokering',
    image: 'redis.png',
    documentationLink: 'https://redis.io',
  },

  {
    title: 'NGINX',
    detail: 'Advanced Load Balancer, Web Server, & Reverse Proxy',
    description: 'NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more',
    image: 'nginx.png',
    documentationLink: 'https://www.nginx.com/',
  },

  {
    title: 'MailHog',
    description: 'Web and API based SMTP testing',
    detail: 'used locally for testing that involves sending emails to users',
    image: 'mailhog.png',
    documentationLink: '',
  },

  {
    title: 'docker',
    description: 'a tool for building and running containers',
    detail: 'used for local development, CI/CD and production',
    image: 'docker.png',
    documentationLink: 'https://www.docker.com/',
  },

  {
    title: 'TypeScript',
    description: 'A superset of TypeScript',
    detail: 'Used in several parts of the project tech stack',
    image: 'ts.png',
    documentationLink: 'https://www.typescriptlang.org/',
  },
  {
    title: 'Bootstrap 4',
    description: 'A UI Framework',
    detail: 'Used for styling Django templates',
    image: 'bootstrap.png',
    documentationLink: 'https://getbootstrap.com',
  },

  {
    title: 'Terraform',
    description: 'Infrastructure as Code',
    detail: 'Used for defining AWS infrastructure in code',
    image: 'terraform.webp',
    documentationLink: 'https://www.terraform.io/',
  },
  {
    title: 'GitHub Actions',
    description: 'GitHubs\'s CI/CD tool',
    detail: 'Used for test automation and deployment',
    image: 'ghactions.png',
    documentationLink: 'https://github.com/features/actions',
  },
  {
    title: 'ECS',
    description: 'A container orchestration tool for AWS',
    detail: 'A tool used to run the application containers in AWS',
    image: 'ecs.png',
    documentationLink: 'https://aws.amazon.com/ecs/',
  },

  {
    title: 'Sentry',
    description: 'Error Monitoring - Get Started in Minutes',
    detail: 'Open-source error tracking with full stacktraces & asynchronous context',
    image: 'sentry.png',
    documentationLink: 'https://sentry.io/',
  },

  {
    title: 'Jupyter',
    description: 'interactive python environment',
    detail: 'used for prototyping',
    image: 'jupyter.png',
    documentationLink: 'https://jupyter.org/',
  },
  {
    title: 'JWT',
    description: 'JSON Web Tokens',
    detail: 'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties',
    image: 'jwt.svg',
    documentationLink: 'https://jwt.io/',
  },

  {
    title: 'OpenAPI',
    description: 'defines a standard, language-agnostic interface to RESTful APIs',
    detail: 'used for documenting the REST API for this project',
    image: 'openapi.png',
    documentationLink: 'https://swagger.io/specification/',
  },

  {
    title: 'GNU Make',
    description: 'Make is a build automation tool that automatically builds executable programs and libraries from source code',
    detail: 'used to simplify local development and provide aliases for long commands',
    image: 'gnu.png',
    documentationLink: 'https://www.gnu.org/software/make/',
  },
  {
    title: 'diagrams.net',
    description: 'an open source diagramming tool',
    detail: 'used for generating diagrams for this project',
    image: 'diagrams.png',
    documentationLink: 'https://www.diagrams.net/',
  },
  {
    title: 'Jazzband',
    detail: 'Jazzband is a collaborative community to share the responsibility of maintaining Python-based projects',
    description: 'We are all part of this',
    image: 'jazzband.png',
    documentationLink: 'https://jazzband.co/',
  },

  {
    title: 'cloud-init',
    detail: 'Cloud-init is the industry standard multi-distribution method for cross-platform cloud instance initialization',
    description: 'Cloud-init is used in the project to configure cloud compute instances',
    image: 'cloud-init.png',
    documentationLink: 'https://cloudinit.readthedocs.io/en/latest/',
  },
]

export const allTechnologies = coreTechnologies.concat(otherTechnologies);

import type { Experience } from '@/types/content'

// Most recent first.
export const experience: Experience[] = [
  {
    id: 'telecom-nancy',
    title: 'Telecom Nancy (FISA)',
    period: '2026 - Today',
    description:
      "Engineering degree as an apprentice at TELECOM Nancy, the Université de Lorraine's digital engineering school.",
    url: 'https://telecomnancy.univ-lorraine.fr/',
  },
  {
    id: 'wm88-apprenticeship',
    title: 'WM88 (Apprenticeship)',
    period: 'Oct 2025 - Aug 2026',
    description: 'Full-stack developer at WM88, a furniture manufacturer in Châtenois (Vosges).',
    highlights: [
      'Designed and built a *sales forecasting* application.',
      'Wrote the functional specifications and designed the database model.',
      'Microservices architecture: Vue/Vite SPA, Symfony, and a Flask/Python API with a predictive engine (Prophet).',
    ],
    stack: ['Vue.js', 'Vite', 'Symfony', 'Transact-SQL', 'Apache', 'Flask', 'Prophet'],
    url: 'https://www.wm88.fr/',
  },
  {
    id: 'wm88-internship',
    title: 'WM88 (Internship)',
    period: 'Mar - Apr 2025',
    description: 'Full-stack developer internship at WM88, a furniture manufacturer in Châtenois (Vosges).',
    highlights: [
      "*Winner of the Société Industrielle de l'Est 2025 award*: a safety incident analysis app that helped reduce workplace accidents.",
      'Refactored an inventory management app into a layered architecture with shared business rules.',
      'Set up environment variables (.env), input validation and protection of sensitive data.',
    ],
    stack: ['PHP', 'Transact-SQL', 'MySQL', 'JavaScript', 'Git', 'Apache'],
    url: 'https://www.wm88.fr/',
  },
  {
    id: 'but-informatique',
    title: 'BUT Informatique (RA-IL)',
    period: '2023 - 2026',
    description:
      'Software development degree at IUT Nancy-Charlemagne, with a strong focus on backend engineering and system security.',
    url: 'https://iut-charlemagne.univ-lorraine.fr/informatique/but-informatique/',
  },
]

import type { SectionContent } from '@/types/content'

// Wrap words in *asterisks* to highlight them in red.
export const sections = {
  experience: {
    id: 'experience',
    title: 'Experience',
    kanji: '経験',
    intro:
      'From a software development degree to an engineering school, studying and working side by side, with a strong focus on *backend* engineering.',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    kanji: '作品',
    intro:
      'Things I build on my own time: full-stack apps and Discord bots, designed from the *database* to the *interface*.',
  },
  stack: {
    id: 'stack',
    title: 'Stack',
    kanji: '言語',
    intro:
      'The languages and frameworks I work with, with a soft spot for *TypeScript* and robust, secure back-end architectures.',
  },
  tools: {
    id: 'tools',
    title: 'Tools',
    kanji: '道具',
    intro: 'What I rely on to write, ship and document code, from the IDE to *production*.',
  },
} satisfies Record<string, SectionContent>

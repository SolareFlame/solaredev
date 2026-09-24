import camionLogo from '@/assets/projects/camion.svg'
import croustoLogo from '@/assets/projects/crousto.svg'
import myfigudbLogo from '@/assets/projects/myfigudb.svg'
import type { Project } from '@/types/content'

// Descriptions from the GitHub profile README.
export const projects: Project[] = [
  {
    id: 'myfigudb',
    name: 'MyFiguDB',
    description:
      'A full-stack figurine collection manager to search, track and organize your figures, monitor resellers and discover new releases.',
    logo: myfigudbLogo,
    theme: 'myfigudb',
    url: 'https://myfigudb.net/',
    featured: { title: 'MYFIGUDB' },
  },
  {
    id: 'crousto',
    name: 'Crousto v3',
    description:
      'A Discord bot that brings Crous restaurant menus straight to your server, using the Univ Lorraine API.',
    logo: croustoLogo,
    theme: 'crousto',
    url: 'https://github.com/solareflame/Crousto',
    featured: { title: 'CROUSTO v3' },
  },
  {
    id: 'camion',
    name: 'Camion',
    description:
      'A modular Discord bot that streams audio from YouTube Music, with full queue management.',
    logo: camionLogo,
    theme: 'camion',
    url: 'https://github.com/SolareFlame/camion',
  },
]

export const featuredProjects = projects.filter(
  (project): project is Project & Required<Pick<Project, 'featured'>> =>
    project.featured !== undefined,
)

// Logos: Iconify "logos" collection (CC0), exported as static SVGs.
import docker from '@/assets/tools/docker.svg'
import figma from '@/assets/tools/figma.svg'
import git from '@/assets/tools/git.svg'
import intellij from '@/assets/tools/intellij.svg'
import kubernetes from '@/assets/tools/kubernetes.svg'
import nginx from '@/assets/tools/nginx.svg'
import notion from '@/assets/tools/notion.svg'
import npm from '@/assets/tools/npm.svg'
import obsidian from '@/assets/tools/obsidian.svg'
import postman from '@/assets/tools/postman.svg'
import vscode from '@/assets/tools/vscode.svg'
import type { ToolGroup } from '@/types/content'

// TODO: WinSCP (no free logo in the icon sets used here).
export const tools: ToolGroup[] = [
  {
    id: 'development',
    label: 'Development',
    items: [
      {
        id: 'intellij',
        name: 'IntelliJ',
        description: 'And the whole JetBrains suite.',
        icon: intellij,
        href: 'https://www.jetbrains.com/idea/',
      },
      {
        id: 'vscode',
        name: 'VSCode',
        description: 'Code editor.',
        icon: vscode,
        href: 'https://code.visualstudio.com/',
      },
      {
        id: 'npm',
        name: 'npm',
        description: 'Package manager.',
        icon: npm,
        href: 'https://www.npmjs.com/',
      },
      {
        id: 'postman',
        name: 'Postman',
        description: 'API client.',
        icon: postman,
        href: 'https://www.postman.com/',
      },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    items: [
      {
        id: 'git',
        name: 'Git',
        description: 'Version control.',
        icon: git,
        href: 'https://git-scm.com/',
      },
      {
        id: 'docker',
        name: 'Docker',
        description: 'Containers.',
        icon: docker,
        href: 'https://www.docker.com/',
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        description: 'Container orchestration.',
        icon: kubernetes,
        href: 'https://kubernetes.io/',
      },
      {
        id: 'nginx',
        name: 'Nginx',
        description: 'Web server & proxy.',
        icon: nginx,
        href: 'https://nginx.org/',
      },
    ],
  },
  {
    id: 'design-notes',
    label: 'Design & notes',
    items: [
      {
        id: 'figma',
        name: 'Figma',
        description: 'Design tool.',
        icon: figma,
        href: 'https://www.figma.com/',
      },
      {
        id: 'notion',
        name: 'Notion',
        description: 'Notes & docs.',
        icon: notion,
        href: 'https://www.notion.com/',
      },
      {
        id: 'obsidian',
        name: 'Obsidian',
        description: 'Knowledge base.',
        icon: obsidian,
        href: 'https://obsidian.md/',
      },
    ],
  },
]

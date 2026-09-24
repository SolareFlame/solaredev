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
      { id: 'intellij', name: 'IntelliJ', description: 'And the whole JetBrains suite.', icon: intellij },
      { id: 'vscode', name: 'VSCode', description: 'Code editor.', icon: vscode },
      { id: 'npm', name: 'npm', description: 'Package manager.', icon: npm },
      { id: 'postman', name: 'Postman', description: 'API client.', icon: postman },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    items: [
      { id: 'git', name: 'Git', description: 'Version control.', icon: git },
      { id: 'docker', name: 'Docker', description: 'Containers.', icon: docker },
      { id: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration.', icon: kubernetes },
      { id: 'nginx', name: 'Nginx', description: 'Web server & proxy.', icon: nginx },
    ],
  },
  {
    id: 'design-notes',
    label: 'Design & notes',
    items: [
      { id: 'figma', name: 'Figma', description: 'Design tool.', icon: figma },
      { id: 'notion', name: 'Notion', description: 'Notes & docs.', icon: notion },
      { id: 'obsidian', name: 'Obsidian', description: 'Knowledge base.', icon: obsidian },
    ],
  },
]

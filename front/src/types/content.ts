/** Palettes defined in tokens.css as `--project-<theme>`, `-light`, `-deep` and `-on`. */
export type ProjectTheme = 'myfigudb' | 'crousto' | 'camion'

export type SocialNetwork = 'github' | 'instagram' | 'discord'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

export interface Stat {
  value: string
  /** Line breaks (`\n`) are kept when rendering. */
  label: string
}

export interface Profile {
  handle: string
  avatar: string
  avatarAlt: string
  taglines: string[]
  cta: string
  socials: SocialLink[]
  bio: string
  stats: Stat[]
}

export interface SectionContent {
  id: string
  title: string
  /** Decorative Japanese label displayed vertically next to the title. */
  kanji: string
  /** Wrap words in `*asterisks*` to highlight them. */
  intro: string
}

export interface Experience {
  id: string
  title: string
  period: string
  description: string
  /** Bullet points; wrap words in `*asterisks*` to highlight them. */
  highlights?: string[]
  stack?: string[]
  url?: string
}

export interface Project {
  id: string
  name: string
  description: string
  logo: string
  theme: ProjectTheme
  url?: string
  /** Present when the project is showcased in the hero. */
  featured?: { title: string }
}

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
}

export interface ToolGroup {
  id: string
  label: string
  items: Tool[]
}

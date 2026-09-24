// Logos: Iconify "logos" collection (CC0), discord.js from devicon (MIT), exported as static SVGs.
import c from '@/assets/stack/c.svg'
import discordjs from '@/assets/stack/discordjs.svg'
import express from '@/assets/stack/express.svg'
import htmlCss from '@/assets/stack/html-css.svg'
import java from '@/assets/stack/java.svg'
import mongodb from '@/assets/stack/mongodb.svg'
import mysql from '@/assets/stack/mysql.svg'
import nestjs from '@/assets/stack/nestjs.svg'
import nodejs from '@/assets/stack/nodejs.svg'
import php from '@/assets/stack/php.svg'
import postgresql from '@/assets/stack/postgresql.svg'
import prisma from '@/assets/stack/prisma.svg'
import python from '@/assets/stack/python.svg'
import react from '@/assets/stack/react.svg'
import redis from '@/assets/stack/redis.svg'
import symfony from '@/assets/stack/symfony.svg'
import tailwind from '@/assets/stack/tailwind.svg'
import typescript from '@/assets/stack/typescript.svg'
import type { ToolGroup } from '@/types/content'

export const stack: ToolGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { id: 'java', name: 'Java', description: 'Back-end & OOP.', icon: java },
      { id: 'typescript', name: 'TypeScript', description: 'Typed JavaScript.', icon: typescript },
      { id: 'c', name: 'C', description: 'Low-level & systems.', icon: c },
      { id: 'php', name: 'PHP', description: 'Server-side scripting.', icon: php },
      { id: 'python', name: 'Python', description: 'Scripting & automation.', icon: python },
      { id: 'html-css', name: 'HTML / CSS', description: 'Markup & styling.', icon: htmlCss },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    items: [
      { id: 'nodejs', name: 'Node.js', description: 'JavaScript runtime.', icon: nodejs },
      { id: 'express', name: 'Express', description: 'Web server.', icon: express },
      { id: 'nestjs', name: 'NestJS', description: 'Structured Node APIs.', icon: nestjs },
      { id: 'symfony', name: 'Symfony', description: 'PHP framework.', icon: symfony },
      { id: 'react', name: 'React', description: 'UI library.', icon: react },
      { id: 'tailwind', name: 'Tailwind', description: 'Utility-first CSS.', icon: tailwind },
      { id: 'discordjs', name: 'discord.js', description: 'Discord bots.', icon: discordjs },
      { id: 'prisma', name: 'Prisma', description: 'Type-safe ORM.', icon: prisma },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: [
      { id: 'mysql', name: 'MySQL', description: 'Relational database.', icon: mysql },
      { id: 'postgresql', name: 'Postgres', description: 'Relational database.', icon: postgresql },
      { id: 'mongodb', name: 'MongoDB', description: 'Document database.', icon: mongodb },
      { id: 'redis', name: 'Redis', description: 'In-memory store.', icon: redis },
    ],
  },
]

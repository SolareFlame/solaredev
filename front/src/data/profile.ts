import avatar from '@/assets/images/avatar.jpg'
import type { Profile } from '@/types/content'

export const profile: Profile = {
  handle: 'solaredev',
  avatar,
  avatarAlt: 'Manga-style avatar with red cat ears doodled on',
  taglines: ['Engineering student', 'Biker, anime nerd & gym rat'],
  cta: 'Check my socials!',
  socials: [
    { network: 'github', label: 'GitHub', href: 'https://github.com/SolareFlame' },
    { network: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/zac_hrtz/' },
    { network: 'discord', label: 'Discord (@solaredev)', href: 'https://discord.com/users/439366966801858570' },
  ],
  bio: "A fourth-year engineering student with a passion for science, motorcycles, and Japanese culture. When I'm not studying, I'm usually building personal projects, tinkering with new tech, or looking for the next thing to learn.",
  stats: [
    { value: '3', label: 'Years of\nexperience' },
    { value: '100', label: 'Commits made\nthis year' },
    { value: '5', label: 'Working\nprojects' },
  ],
}

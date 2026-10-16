export type EventType = 'liveMusic' | 'festivals' | 'cultural'

export type UpcomingEvent = {
  id: string
  type: EventType
  /** ISO 8601 datetime (local intent: Europe/Rome) */
  startsAt: string
  image: string
  link?: string
  phone?: string
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'postWorkingLucesci',
    type: 'liveMusic',
    startsAt: '2026-10-16T19:00:00',
    image: '/images/post-working/sciambaruto.jpg',
    link: 'https://giannisciambarruto.bandcamp.com/album/lucesci',
    phone: '+393663424199'
  },
  {
    id: 'postWorkingCordesVocales',
    type: 'liveMusic',
    startsAt: '2026-12-18T19:00:00',
    image: '/images/post-working/silvestrini.jpg',
    link: 'https://cordedautunno.centroasteria.it/team-members/sofia-silvestrini/',
    phone: '+393663424199'
  }
]

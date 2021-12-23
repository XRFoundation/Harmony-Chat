import type { ProjectConfigInterface } from '@xrengine/projects/ProjectConfigInterface'

const config: ProjectConfigInterface = {
  onEvent: undefined,
  thumbnail: '/static/xrengine_thumbnail.jpg',
  routes: {
    '/harmony': {
      component: () => import('./index')
    },
  },
  services: undefined,
  databaseSeed: undefined
}

export default config

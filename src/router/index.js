import { createRouter, createWebHistory } from 'vue-router'
import ShortenView from '../views/ShortenView.vue'
import ShortenerView from '../views/ShortenerView.vue'
import StatsView from '../views/StatsView.vue'
import UnshortenView from '../views/UnshortenView.vue'
import RedirectView from '../views/RedirectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shorten',
      component: ShortenView
    },
    {
      path: '/shortener',
      name: 'Shortener',
      component: ShortenerView,
      props: route => ({ shortcut: route.query.u })
    },
    {
      path: '/url-stats',
      name: 'Stats',
      component: StatsView,
      props: route => ({ shortcut: route.query.u })
    },
    {
      path: '/unshorten',
      name: 'Unshorten',
      component: UnshortenView,
      props: route => ({ shortcut: route.query.u })
    },
    {
      path: '/u/:id',
      name: 'Redirect',
      component: RedirectView,
      props: route => ({ shortcut: route.params.id })
    },
  ]
})

export default router

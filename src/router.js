import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import V1 from '@/views/V1.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/v1/:id',
      component: V1
    }
  ]
})

export default router

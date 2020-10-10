import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import V1 from '@/views/V1.vue'
import V3 from '@/views/V3.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/v1/:id',
      component: V1
    },
    {
      path: '/v3/:id',
      component: V3
    },
  ]
})

export default router

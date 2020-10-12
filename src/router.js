import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import V1 from '@/views/V1.vue'
import V2 from '@/views/V2.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/post/:id',
      component: Post
    },
    {
      path: '/v1/:id',
      component: V1
    },
    {
      path: '/v2/:id',
      component: V2
    },
  ]
})

export default router

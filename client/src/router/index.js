import Vue from 'vue'
import VueRouter from 'vue-router'
import VideoRecorder from '@/components/VideoRecorder'
//import sample from '@/components/sample'
Vue.use(VueRouter)

const routes = [
  { 
    path: '/:id', 
    component: VideoRecorder,
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router

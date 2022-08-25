import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '@/views/TodoList';
import UserLogin from '@/views/UserLogin';
import TodoWrite from '@/views/TodoWrite';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: TodoList
  },
  {
    path: '/todowrite',
    name: 'todowrite',
    component: TodoWrite
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

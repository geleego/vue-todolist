import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '@/views/TodoList';

Vue.use(VueRouter);

const routes = [
  {
    path: '/TodoList',
    name: 'TodoList',
    component: TodoList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

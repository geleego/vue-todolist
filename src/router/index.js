import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '@/views/UserLogin';
import TodoList from '@/views/TodoList';
import TodoWrite from '@/views/TodoWrite';
import TodoEdit from '@/views/TodoEdit';

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
  },
  {
    path: '/todoedit',
    name: 'todoedit',
    component: TodoEdit
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

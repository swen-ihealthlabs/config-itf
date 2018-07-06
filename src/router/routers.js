import Vue from 'vue';
import VueRouter from 'vue-router';
import ServerList from '@/components/ServerList';
import Main from '@/pages/Main';

export const abpmRouter = {
  path: '/abpm',
  name: 'Abpm',
  component: ServerList,
  props: true,
  children: [
    {
      path: ':env',
      component: resolve => require(['@/components/ConfigTable'], resolve)
    }
  ]
};

export const rootRouter = {
  path: '/',
  name: 'Main',
  component: Main
};

export const routers = [rootRouter, abpmRouter];

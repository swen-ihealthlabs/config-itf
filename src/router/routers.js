import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from '@/components/Foo';
import Main from '@/pages/Main';

export const abpmRouter = {
  path: '/abpm',
  name: 'abpm',
  component: Foo
};

export const rootRouter = {
  path: '/',
  name: 'main',
  component: Main
};

export const routers = [rootRouter, abpmRouter];

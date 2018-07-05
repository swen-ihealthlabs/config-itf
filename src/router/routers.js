import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from '@/components/Foo';

// const Foo = { template: '<div>foo</div>' };
export const abpmRouter = {
  path: '/abpm',
  name: 'abpm',
  component: Foo
};

export const routers = [abpmRouter];

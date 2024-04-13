import ErrorLayout from '@/layouts/error/ErrorLayout.vue';

const errorRoutes = [
  {
    path: '/:404(.*)',
    name: 'Not found',
    component: () => import('@/views/errors/NotFound.vue'),
    meta: {
      layout: ErrorLayout,
      title: 'Page Not Found'
    },
  },
]

export default errorRoutes;
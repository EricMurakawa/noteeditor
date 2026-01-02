import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppLayout from '@/Layouts/AppLayout'

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createInertiaApp({
  resolve: name => {
    const page = resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    )

    page.then(module => {
      module.default.layout ??= page => <AppLayout>{page}</AppLayout>
    })

    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

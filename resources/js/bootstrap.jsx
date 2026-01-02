import axios from 'axios';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createInertiaApp({
    resolve: name => import(`./Pages/${name}.jsx`),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})

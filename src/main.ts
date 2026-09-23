import 'virtual:uno.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LandingView from './views/LandingView.vue'
import CapabilityMapView from './views/CapabilityMapView.vue'
import CapabilityNodeDetailView from './views/CapabilityNodeDetailView.vue'
import RegistryView from './views/RegistryView.vue'
import RegistryEntryDetailView from './views/RegistryEntryDetailView.vue'

const router = createRouter({
  history: createWebHashHistory('/edugo/'),
  routes: [
    // Landing page at hash root — the product pitch
    { path: '/', component: LandingView },
    // Capability catalog (was /map)
    { path: '/catalog', component: CapabilityMapView },
    { path: '/catalog/:id', component: CapabilityNodeDetailView },
    // Tool registry (was /registry)
    { path: '/apps', component: RegistryView },
    { path: '/apps/:id', component: RegistryEntryDetailView },
    // Legacy redirects so old bookmarks still work
    { path: '/map', redirect: '/catalog' },
    { path: '/map/:id', redirect: to => `/catalog/${to.params.id}` },
    { path: '/registry', redirect: '/apps' },
    { path: '/registry/:id', redirect: to => `/apps/${to.params.id}` },
  ],
})

createApp(App).use(router).mount('#app')

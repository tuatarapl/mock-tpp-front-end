import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { login, loginGuard } from './routes/login'
Vue.use(VueRouter)
const routes: RouteConfig[] = [{
  name: 'main',
  path: '/',
  component: {
    template: `
      <div class="container mt-3">
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a class="navbar-brand" href="#">TPP Front End</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                      <router-link  :to="{ name: 'accounts'}" class="nav-link" >Accounts</router-link>
                  </li>
                  <li class="nav-item active">
                      <router-link  :to="{ name: 'transactions'}" class="nav-link" >Transactions</router-link>
                  </li>
                  <li class="nav-item active">
                      <router-link  :to="{ name: 'settings'}" class="nav-link" >Settings</router-link>
                  </li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
      </div>`
  },
  children: [
  ]
}, login]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})

router.beforeEach(loginGuard)
export default router
import axios from 'axios'
import * as _ from 'lodash'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { aspsp } from './routes/aspsp'
import { aspsps } from './routes/aspsps'
import { callbackResult } from './routes/callback-result'
import { login, loginGuard } from './routes/login'
function interactions() {
  return axios.get(`/api/interactions`).then((response) => response.data)
}

function updateInteraction(interactionId, state, event) {
  return axios.post(`/api/interactions/${interactionId}/state`,
  {state, event}).then((response) => response.data)
}

Vue.use(VueRouter)
const routes: RouteConfig[] = [{
  name: 'main',
  path: '/',
  component: Vue.extend({
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
              <router-link  :to="{ name: 'aspsps'}" class="nav-link" >ASPSPS</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown">
              Interactions <span class="badge badge-primary">{{interactions.length}}</span>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-item" v-for="interaction in interactions">
                Session {{interaction.context.session.sessionId}} with {{interaction.context.session.aspspId}}
                <a class="small" href="#" @click="executeInteraction(interaction)">
                  Redirect
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </nav>
  <router-view></router-view>
</div>`,
      data() {
        return {
            interactions: []
        }
      },
      beforeRouteEnter(to, from, next) {
        interactions().then((data) => {
              next((vm: any) => {
                  vm.interactions = _.filter(data, (interaction) => interaction.state === 'defined')
              })
          })
      },
      beforeRouteUpdate(to, from, next) {
        interactions().then((data) => {
              this.interactions = _.filter(data, (interaction) => interaction.state === 'defined')
              next()
          })
      },
      methods: {
        executeInteraction(interaction) {
            this.openRedirect(interaction.redirectUri)
            updateInteraction(interaction.interactionId,
                'in_progress', 'PSU sent to ASPSP').then((updated) => _.assign(interaction, updated))
        },
        openRedirect(uri: string) {
            window.open(uri, '_blank')
        }
      }
  }),
  children: [
    aspsps,
    aspsp
  ]
}, login, callbackResult]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})

router.beforeEach(loginGuard)
export default router

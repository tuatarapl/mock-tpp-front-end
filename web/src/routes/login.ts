import axios from 'axios'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function doLogin(username: string, password: string): Promise<any> {
    return axios.post('/login', {username, password})
}

export const login: RouteConfig = {
    name: 'login',
    path: '/login',
    component: Vue.extend({
      template: `
      <div class="container mt-3">
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a class="navbar-brand" href="#">TPP Front End</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="row>
          <div class="col-12>
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
              </div>
              <button type="button" class="btn btn-primary" @click="login()">Login</button>
            </form>
          </div>
        </div>
      </div>
      `,
      methods: {
          login() {
            doLogin(this.username, this.password).then(() => this.$router.push('/'))
          }
      },
      data() {
        return {
            username: null,
            password: null
        }
      }
    })
  }

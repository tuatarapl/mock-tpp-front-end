import axios from 'axios'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function list() {
    return axios.get('/api/aspsps').then((response) => response.data)
}

export const aspsps: RouteConfig = {
    name: 'aspsps',
    path: 'aspsps',
    component: Vue.extend({
      template: `
      <div class="row>
        <div class="col-12>
          <ul class="list-group">
            <li v-for="aspsp in aspsps" class="list-group-item">
              <router-link  :to="{ name: 'aspsp',params:{aspspId:aspsp.id}}" class="nav-link" >
                {{aspsp.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      `,
      data() {
        return {
          aspsps: null
        }
      },
      beforeRouteEnter(to, from, next) {
        list().then((data) => {
            next((vm: any) => { vm.aspsps = data })
        })
      },
      beforeRouteUpdate(to, from, next) {
        list().then((data) => {
            this.aspsps = data
            next()
        })
      }
    })
  }

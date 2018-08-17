import axios from 'axios'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function get(id) {
    return axios.get(`/api/aspsps/${id}`).then((response) => response.data)
}

export const aspsp: RouteConfig = {
    name: 'aspsp',
    path: 'aspsps/:aspspId',
    component: Vue.extend({
      template: `
      <div class="row>
        <div class="col-12>
            <h1>{{aspsp.name}}</h1>
        </div>
      </div>
      `,
      data() {
        return {
          aspsp: null
        }
      },
      beforeRouteEnter(to, from, next) {
        get(to.params.aspspId).then((data) => {
            next((vm: any) => { vm.aspsp = data })
        })
      },
      beforeRouteUpdate(to, from, next) {
        get(to.params.aspspId).then((data) => {
            this.aspsp = data
            next()
        })
      }
    })
  }

import axios from 'axios'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function get(id) {
    return axios.get(`/api/aspsps/${id}`).then((response) => response.data)
}

function requestConsent(id, kind) {
    return axios.post(`/api/aspsps/${id}/request`, {kind}).then((response) => response.data)
}

export const aspsp: RouteConfig = {
    name: 'aspsp',
    path: 'aspsps/:aspspId',
    component: Vue.extend({
      template: `
      <div class="row>
        <div class="col-12>
            <h1>{{aspsp.name}}</h1>
            <form class="form-group">
                <div class="form-group">
                    <label for="consentRequestKind">Consent request kind</label>
                    <select class="form-control" id="consentRequestKind" v-model="kind">
                        <option>AccountsList</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary" @click="doRequestConsent()">Request</button>
            </form>
            <ul class="list-group">
                <li class="list-group-item" v-for="request in aspsp.requests">
                    <h3>{{request.requestId}} <span class="badge badge-primary">{{request.status}}</span></h3>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="action in request.actions">
                            <a :href="action.uri" target="_blank">Redirect</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
      </div>
      `,
      data() {
        return {
          aspsp: null,
          kind: 'AccountsList'
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
      },
      methods: {
          doRequestConsent() {
            requestConsent(this.aspsp.id, this.kind)
          }
      }
    })
  }

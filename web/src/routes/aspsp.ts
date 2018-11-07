import axios from 'axios'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function get(id) {
    return axios.get(`/api/aspsps/${id}`).then((response) => response.data)
}

function requestConsent(id, kind) {
    return axios.post(`/api/aspsps/${id}/request`, {kind}).then((response) => response.data)
}

function callAPI(id, kind) {
    return axios.post(`/api/aspsps/${id}/call`, {kind}).then((response) => response.data)
}

export const aspsp: RouteConfig = {
    name: 'aspsp',
    path: 'aspsps/:aspspId',
    component: Vue.extend({
      template: `
      <div class="row>
        <div class="col-12>
            <h1>{{aspsp.name}}</h1>
            <h2>Consents </h2>
            <form class="form-group">
                <div class="form-group">
                    <label for="newConsentContent">Content/label>
                    <textarea class="form-control" id="newConsentContent" v-model="newConsentContent">
                    </textarea>
                </div>
                <button type="button" class="btn btn-primary" @click="doRequestConsent()">Request</button>
                <button type="button" class="btn btn-primary" @click="doCall()">Call</button>
            </form>
            <form class="form-group">
                <div class="form-group">
                    <label for="consentRequestKind">Consent request kind</label>
                    <select class="form-control" id="consentRequestKind" v-model="kind">
                        <option>AccountsList</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary" @click="doRequestConsent()">Request</button>
                <button type="button" class="btn btn-primary" @click="doCall()">Call</button>
            </form>
            <h2>Consent requests</h2>
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
            <h2>Results</h2>
            <ul>
                <li v-for="result in results">
                    {{result}}
                </li>
            </ul>
        </div>
      </div>
      `,
      data() {
        return {
          aspsp: null,
          kind: 'AccountsList',
          results: [],
          consent: {
            scope: 'ais ais-accounts',
            scope_details: {
                throttlingPolicy: 'psd2Regulatory',
                scopeTimeDuration: 90,
                scopeGroupType: 'ais',
                privilegeList: [],
                consentId: 'ais-consent'
            }
          }
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
            requestConsent(this.aspsp.id, this.kind).then((request) => this.aspsp.requests.push(request))
          },
          doCall() {
            callAPI(this.aspsp.id, this.kind).then((response) => this.results.push(response))
          }
      }
    })
  }

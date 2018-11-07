import axios from 'axios'
import * as _ from 'lodash'
import * as moment from 'moment'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function get(id) {
    return axios.get(`/api/aspsps/${id}`).then((response) => response.data)
}

function createSession(aspspId, kind, consent) {
    return axios.post(`/api/aspsps/${aspspId}/sessions`, {kind, consent}).then((response) => response.data)
}

function callAPI(id, kind) {
    return axios.post(`/api/aspsps/${id}/call`, {kind}).then((response) => response.data)
}

const consentTemplate = {
    scope: 'ais ais-accounts',
    scope_details: {
        throttlingPolicy: 'psd2Regulatory',
        scopeTimeLimit: moment().add(90, 'days').toISOString(),
        scopeTimeDuration: 90,
        scopeGroupType: 'ais',
        privilegeList: [],
        consentId: 'ais-consent'
    }
  }

export const aspsp: RouteConfig = {
    name: 'aspsp',
    path: 'aspsps/:aspspId',
    component: Vue.extend({
      template: `
      <div class="row>
        <div class="col-12>
            <h1>{{aspsp.name}}</h1>
            <h2>Sessions</h2>
            <ul class="list-group">
                <li class="list-group-item" v-for="session in aspsp.sessions">
                    <h3>{{session.identity.sessionId}}</h3>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="interaction in session.interactions">
                            <a @click="openRedirect(interaction.redirectUri)" href="#">Redirect</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <form class="form-group">
                <div class="form-group">
                    <label for="newSessionName">Name</label>
                    <input type="text" class="form-control" id="newSessionName" v-model="newSessionName"/>
                </div>
                <div class="form-group">
                    <label for="newSessionConsent">Consent</label>
                    <textarea class="form-control" id="newSessionConsent" rows="10"
                    v-bind:value="JSON.stringify(newSessionConsent,null,4)"
                    v-on:input="jsonInput('newSessionConsent',$event.target.value)">
                    </textarea>
                </div>
                <button type="button" class="btn btn-primary" @click="doCreateSession()">Create</button>
            </form>
            <form class="form-group">
                <div class="form-group">
                    <label for="consentRequestKind">Consent request kind</label>
                    <select class="form-control" id="consentRequestKind" v-model="kind">
                        <option>AccountsList</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary" @click="doCall()">Call</button>
            </form>
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
          newSessionName: '',
          newSessionConsent: _.cloneDeep(consentTemplate)
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
          doCall() {
            callAPI(this.aspsp.id, this.kind).then((response) => this.results.push(response))
          },
          doCreateSession() {
            createSession(this.aspsp.aspspId, this.newSessionName, this.newSessionConsent).then((newSession) => {
                this.aspsp.sessions.push(newSession)
                this.newSessionName = '',
                this.newSessionConsent = _.cloneDeep(consentTemplate)
            })
          },
          jsonInput: _.debounce((field: string, value: string) => {
              try {
              this[field] = JSON.parse(value)
              } catch (e) {
                  console.warn(e)
              }
          }, 1000),
          openRedirect(uri: string) {
            window.open(uri, '_blank')
          }

      }
    })
  }

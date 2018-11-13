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

function callAPI(aspspId, operation, session, payload) {
    return axios.post(`/api/aspsps/${aspspId}/call/${operation}`, {session, payload}).then((response) =>
        ({response: response.data, operation}))
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
const operations = ['getAccounts', 'getAccount', 'getTransactionsDone', 'getTransactionsPending',
    'getTransactionsRejected', 'getTransactionsScheduled', 'getTransactionsCancelled', 'getHolds',
    'getTransactionDetail']

export const aspsp: RouteConfig = {
    path: 'aspsps/:aspspId',
    component: Vue.extend({template: `
<div class="container mt-3">
    <nav class="nav nav-tabs">
        <router-link  :to="{ name: 'aspsp.sessions'}" class="nav-link" >Sessions</router-link>
        <router-link  :to="{ name: 'aspsp.operations'}" class="nav-link" >Operations</router-link>
    </nav>
    <router-view></router-view>
</div>
    `}),
    children: [
    {
        path: '',
        redirect: 'sessions'
    }, {
        name: 'aspsp.sessions',
        path: 'sessions',
        component: Vue.extend({
            template: `
<div class="row" >
    <div class="col-12" v-if="aspsp">
        <h1>{{aspsp.name}}</h1>
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
        <h3>New</h3>
        <form class="form-group">
            <div class="form-group">
                <label for="newSessionName">Name</label>
                <input type="text" class="form-control" id="newSessionName" v-model="newSessionName"/>
            </div>
            <consent-edit :consent="newSessionConsent"></consent-edit>
            <button type="button" class="btn btn-primary" @click="doCreateSession()">Create</button>
        </form>
    </div>
</div>
            `,
            data() {
            return {
                aspsp: null,
                session: null,
                newSessionName: '',
                newSessionConsent: _.cloneDeep(consentTemplate)
            }
            },
            beforeRouteEnter(to, from, next) {
                get(to.params.aspspId).then((data) => {
                    next((vm: any) => {
                        vm.aspsp = data
                        vm.session = data.sessions[0] ? data.sessions[0].identity.sessionId : null
                    })
                })
            },
            beforeRouteUpdate(to, from, next) {
                get(to.params.aspspId).then((data) => {
                    this.aspsp = data
                    next()
                })
            },
            methods: {
                doCreateSession() {
                    createSession(this.aspsp.aspspId, this.newSessionName, this.newSessionConsent)
                    .then((newSession) => {
                        this.aspsp.sessions.push(newSession)
                        this.newSessionName = '',
                        this.newSessionConsent = _.cloneDeep(consentTemplate)
                    })
                },
                openRedirect(uri: string) {
                    window.open(uri, '_blank')
                }
            }
        })
    }, {
        name: 'aspsp.operations',
        path: 'operations',
        component: Vue.extend({
            template: `
<div class="row" >
    <div class="col-12" v-if="aspsp">
        <h1>{{aspsp.name}}</h1>
        <form class="form-group">
            <div class="form-group">
                <label for="operation">Operation</label>
                <select class="form-control" id="operation" v-model="operation">
                    <option v-for="o in operations">{{o}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="session">Session</label>
                <select class="form-control" id="session" v-model="session">
                    <option v-for="session in aspsp.sessions">{{session.identity.sessionId}}</option>
                </select>
            </div>
            <edit-request :request="operationPayload" :operation="operation"></edit-request>
            <button type="button" class="btn btn-primary" @click="doCall()">Call</button>
        </form>
        <results-modal :results="results" ref="results"></results-modal>
    </div>
</div>
            `,
            data() {
            return {
                aspsp: null,
                operations,
                operation: operations[0],
                operationPayload: {},
                results: null
            }
            },
            beforeRouteEnter(to, from, next) {
                get(to.params.aspspId).then((data) => {
                    next((vm: any) => {
                        vm.aspsp = data
                        vm.session = data.sessions[0] ? data.sessions[0].identity.sessionId : null
                    })
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
                    callAPI(this.aspsp.aspspId, this.operation, this.session, _.pickBy(this.operationPayload))
                        .then((response) => {
                            this.results = response
                            this.$refs.results.show()
                        })
                }
            }
        })
    }]
}

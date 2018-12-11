import axios from 'axios'
import * as _ from 'lodash'
import * as moment from 'moment'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'

function get(id) {
    return axios.get(`/api/aspsps/${id}`).then((response) => response.data)
}

function createSession(aspspId, sessionId, consent) {
    return axios.put(`/api/aspsps/${aspspId}/sessions/${sessionId}`, {consent}).then((response) => response.data)
}

function updateInteraction(interactionId, state, event) {
    return axios.post(`/api/interactions/${interactionId}/state`,
    {state, event}).then((response) => response.data)
}

function callAPI(aspspId, operation, session, payload) {
    return axios.post(`/api/aspsps/${aspspId}/call/${operation}`, {session, payload}).then((response) =>
        ({response: response.data, operation}))
}

Vue.component('session-details', {
    props: ['session'],
    template: `
<div class="card">
    <div class="card-body">
        <h3>{{session.identity.sessionId}}</h3>
        <nav class="nav nav-tabs mb-4">
            <a class="nav-link" :class="{active: active =='interactions'}" @click="active ='interactions'">
                Interactions
            </a>
            <a class="nav-link" :class="{active: active =='requested'}" @click="active ='requested'">
                Requested Consent
            </a>
            <a class="nav-link" :class="{active: active =='granted'}" @click="active ='granted'">
                Granted Consent
            </a>
            <a class="nav-link" :class="{active: active =='response'}" @click="active ='response'"
                v-if="session.sessionData.response">
                Response
            </a>
        </nav>
        <ul v-if="active == 'interactions'">
            <li v-for="interaction in session.interactions">
                <span class="badge badge-pill badge-primary">{{interaction.state}}</span>
                <a @click="executeInteraction(interaction)" href="#">Redirect</a>
            </li>
        </ul>
        <consent-view :consent="session.sessionData.REQUESTED_CONSENT" v-if="active == 'requested'">
        </consent-view>
        <consent-view :consent="session.sessionData.GRANTED_CONSENT" v-if="active == 'granted'">
        </consent-view>
        <div v-if="active == 'response' && operation">
            <show-results :data="{operation: operation, response: session.sessionData.response}"></show-results>
        </div>
    </div>
</div>
    `,
    data() {
        return {
            active: 'interactions'
        }
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
    },
    computed: {
        operation(): string {
            if (this.session.identity.sessionId.indexOf(':') > -1) {
                return this.session.identity.sessionId.split(':')[0] + 'Result'
            } else {
                return null
            }
        }
    }
})

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
const operations = [
    {name: 'getAccounts', session: true},
    {name: 'getAccount', session: true},
    {name: 'getTransactionsDone', session: true},
    {name: 'getTransactionsPending', session: true},
    {name: 'getTransactionsRejected', session: true},
    {name: 'getTransactionsScheduled', session: true},
    {name: 'getTransactionsCancelled', session: true},
    {name: 'getHolds', session: true},
    {name: 'getTransactionDetail', session: true},
    {name: 'domestic', session: 'operation+transaction', template: {
            recipient: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            sender: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            transferData: {
                description: '<CHANGE ME>',
                amount: '0.00'
            },
            tppTransactionId: '<CHANGE ME>',
            deliveryMode: 'StandardD1',
            system: 'Elixir',
            executionMode: 'Immediate'
        }
    },
    {name: 'EEA', session: 'operation+transaction', template: {
            recipient: {
                accountNumber: '<CHANGE ME>',
                name: '<CHANGE ME>',
                address: ['<CHANGE ME>']
            },
            sender: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            transferData: {
                description: '<CHANGE ME>',
                amount: '0.00',
                currency: 'EUR'
            },
            tppTransactionId: '<CHANGE ME>',
            deliveryMode: 'StandardD1',
            system: 'SEPA',
            executionMode: 'Immediate'
        }
    },
    {name: 'nonEEA', session: 'operation+transaction', template: {
            recipient: {
                accountNumber: '<CHANGE ME>',
                name: '<CHANGE ME>',
                address: ['<CHANGE ME>']
            },
            recipientBank: {
                address: ['<CHANGE ME>']
            },
            sender: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            transferData: {
                description: '<CHANGE ME>',
                amount: '0.00',
                currency: 'EUR'
            },
            transferCharges: 'XXX',
            tppTransactionId: '<CHANGE ME>',
            deliveryMode: 'StandardD2',
            system: 'Swift',
            executionMode: 'Immediate'
        }
    },
    {name: 'tax', session: 'operation+transaction', template: {
            recipient: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            sender: {
                accountNumber: '<CHANGE ME>',
                nameAddress: {
                    value: ['<CHANGE ME>']
                }
            },
            usInfo: {
                payerInfo: {
                    payorId: '<CHANGE ME>',
                    payorIdType: 'N'
                },
                formCode: '<>',
                periodId: '<>',
                periodType: '<>',
                year: 2000,
                obligationId: '<CHANGE ME>'
            },
            transferData: {
                description: '<CHANGE ME>',
                amount: '0.00',
                currency: 'PLN'
            },
            tppTransactionId: '<CHANGE ME>',
            deliveryMode: 'StandardD1',
            system: 'Elixir',
            executionMode: 'Immediate'
        }
    },
    {name: 'bundle', session: 'operation+bundle'},
    {name: 'getPayment', session: false},
    {name: 'getBundle', session: false},
    {name: 'getMultiplePayments', session: false},
    {name: 'cancelPayments', session: false}
]

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
        <session-details v-for="session in aspsp.sessions" :session="session" :key="session.identity.sessionId"
            class="mt-4">
        </session-details>
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
                    <option v-for="o in operations" v-bind:value="o">{{o.name}}</option>
                </select>
            </div>
            <div class="form-group" v-if="operation && operation.session === true">
                <label for="session">Session</label>
                <select class="form-control" id="session" v-model="session">
                    <option v-for="session in aspsp.sessions">{{session.identity.sessionId}}</option>
                </select>
            </div>
            <edit-request :request="operationPayload" :operation="operation.name"></edit-request>
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
                determineSession(): string {
                    switch (this.operation.session) {
                        case 'operation': return this.operation.name
                        case 'operation+transaction':
                            return `${this.operation.name}:${this.operationPayload.tppTransactionId}`
                        case 'operation+bundle':
                            return `${this.operation.name}:${this.operationPayload.tppBundleId}`
                        case true: return this.session
                        default: return null
                    }
                },
                doCall() {
                    callAPI(this.aspsp.aspspId, this.operation.name, this.determineSession(),
                        _.pickBy(this.operationPayload, (value) => value !== undefined ))
                        .then((response) => {
                            this.results = response
                            this.$refs.results.show()
                        })
                }
            },
            watch: {
                operation(newOperation) {
                    if (newOperation.template) {
                        this.operationPayload = _.cloneDeep(newOperation.template)
                    }
                }
            }
        })
    }]
}

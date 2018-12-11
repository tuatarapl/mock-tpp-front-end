import * as $ from 'jquery'
import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-result',
    getAccount: 'get-account-result',
    getTransactionsDone: 'get-transactions-done-result',
    getTransactionsPending: 'get-transactions-pending-result',
    getTransactionsRejected: 'get-transactions-rejected-result',
    getTransactionsScheduled: 'get-transactions-result',
    getTransactionsCancelled: 'get-transactions-result',
    getHolds: 'get-holds-result',
    getTransactionDetail: 'get-transaction-result',
    domestic: 'session-results',
    EEA: 'session-results',
    nonEEA: 'session-results',
    tax: 'session-results',
    bundle: 'session-results',
    domesticResult: 'payment-result',
    EEAResult: 'payment-result',
    nonEEAResult: 'payment-result',
    taxResult: 'payment-result',
    bundleResult: 'bundle-result',
    getPayment: 'get-payment-result',
    getBundle: 'get-bundle-result',
    getMultiplePayments: 'payments-result',
    cancelPayments: 'payments-result'
}

Vue.component('generic-results', {
    props: ['data'],
    template: `
<div>
    {{data}}
</div>
`
})

Vue.component('session-results', {
    props: ['data'],
    template: `
<session-details :session="data"></session-details>
`
})

Vue.component('show-results', {
    props: ['data'],
    template: `
<div>
    <component :is="currentComponent" :data="data.response"></component>
</div>
`,
    computed: {
        currentComponent(): string {
            return operationToComponent[this.data.operation] || 'generic-results'
        }
    }
})
Vue.component('result-header', {
    props: ['header'],
    template: `
<dl class="row">
    <dt class="col-sm-3 col-md-1">Request Id</dt>
    <dd class="col-sm-9 col-md-4">{{header.requestId}}</dd>
    <dt class="col-sm-3 col-md-1">Send Date</dt>
    <dd class="col-sm-9 col-md-4">{{header.sendDate}}</dd>
    <dt class="col-sm-3 col-md-1">Is Callback</dt>
    <dd class="col-sm-9 col-md-1">{{header.isCallback}}</dd>
</dl>
`
})
Vue.component('result-paging', {
    props: ['pageInfo'],
    template: `
<dl class="row" v-if ="pageInfo">
    <template v-if="pageInfo.previousPage">
        <dt class="col-sm-3 col-md-2">Previous Page</dt>
        <dd class="col-sm-9 col-md-4">{{pageInfo.previousPage}}</dd>
    </template>
    <template v-if="pageInfo.nextPage">
        <dt class="col-sm-3 col-md-2">Next Page</dt>
        <dd class="col-sm-9 col-md-4">{{pageInfo.nextPage}}</dd>
    </template>
</dl>
`
})

Vue.component('dictionary-item', {
    props: ['item'],
    template: `
<span v-if="item">{{item.description}} ({{item.code}})</span>
`})

Vue.component('name-address', {
    props: ['data'],
    template: `
<ul v-if="data && data.value" class="list-unstyled">
    <li v-for="line in data.value">{{line}}</li>
</ul>
`})

Vue.component('aux-data', {
    props: ['data'],
    template: `
<dl class="row" v-if="data">
    <template v-for="(value, key) in data">
        <dt class="col-sm-3">{{key}}</dt>
        <dd class="col-sm-9">{{value}}</dd>
    </template>
</dl>
`})

Vue.component('bank-data', {
    props: ['bank'],
    template: `
<ul class="list-inline" v-if="bank">
    <li class="list-inline-item">{{bank.name}}</li>
    <li class="list-inline-item">{{bank.bicOrSwift}}</li>
    <li class="list-inline-item">{{bank.code}}</li>
    <li class="list-inline-item">{{bank.countryCode}}</li>
    <li class="list-inline-item" v-for="line in bank.address">{{line}}</li>
</ul>
`})

Vue.component('results-modal', {
    props: ['results'],
    template: `
<div class="modal" tabindex="-1" role="dialog" ref="modal" v-if="results">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{results.operation}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <show-results :data="results"></show-results>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`,
methods: {
    show() {
        Vue.nextTick().then(() => $(this.$refs.modal).modal())
    }
}})

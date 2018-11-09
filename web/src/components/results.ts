import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-result',
    getAccount: 'get-account-result',
    getTransactionsDone: 'get-transactions-done-result',
    getTransactionsPending: 'get-transactions-pending-result',
    getTransactionsRejected: 'get-transactions-rejected-result',
    getTransactionsScheduled: 'get-transactions-result',
    getTransactionsCancelled: 'get-transactions-result',
    getHolds: 'get-transactions-result'
}

Vue.component('show-results', {
    props: ['data'],
    template: `
<div>
    <h3>{{data.operation}}</h3>
    <component :is="currentComponent" :data="data.response"></component>
</div>
`,
    computed: {
        currentComponent(): string {
            return operationToComponent[this.data.operation]
        }
    }
})
Vue.component('result-header', {
    props: ['header'],
    template: `
<dl class="row">
    <dt class="col-sm-3 col-md-1">Request Id</dt>
    <dd class="col-sm-9 col-md-4">{{header.requestId}}</dd>
    <dt class="col-sm-3 col-md-1">Send Data</dt>
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

import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-request',
    getAccount: 'get-account-request',
    getTransactionsDone: 'get-transactions-request',
    getTransactionsPending: 'get-transactions-request',
    getTransactionsRejected: 'get-transactions-request',
    getTransactionsScheduled: 'get-transactions-request',
    getTransactionsCancelled: 'get-transactions-request',
    getHolds: 'get-transactions-request'
}

Vue.component('edit-request', {
    props: ['request', 'operation'],
    template: `
<div>
    <component :is="currentComponent" :request="request"></component>
</div>
`,
    computed: {
        currentComponent(): string {
            return operationToComponent[this.operation]
        }
    }
})

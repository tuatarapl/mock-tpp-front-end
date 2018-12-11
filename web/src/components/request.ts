import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-request',
    getAccount: 'get-account-request',
    getTransactionsDone: 'get-transactions-request',
    getTransactionsPending: 'get-transactions-request',
    getTransactionsRejected: 'get-transactions-request',
    getTransactionsScheduled: 'get-transactions-request',
    getTransactionsCancelled: 'get-transactions-request',
    getHolds: 'get-transactions-request',
    getTransactionDetail: 'get-transaction-request',
    domestic: 'domestic-transfer-edit',
    EEA: 'foreign-transfer-eea-edit',
    nonEEA: 'foreign-transfer-non-eea-edit',
    tax: 'tax-transfer-edit',
    bundle: 'bundle-transfers-edit',
    getPayment: 'get-payment-edit',
    getBundle: 'get-bundle-edit',
    getMultiplePayments: 'get-multiple-payments-edit'
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

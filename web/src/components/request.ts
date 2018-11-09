import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-request'
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

import Vue from 'vue'

const operationToComponent = {
    getAccounts: 'get-accounts-result'
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

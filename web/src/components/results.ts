import Vue from 'vue'

Vue.component('show-results', {
    props: ['data'],
    template: '<component :is="currentComponent" :data="data"></component>',
    computed: {
        currentComponent(): string {
            return 'get-accounts-result'
        }
    }
})
Vue.component('result-header', {
    props: ['header'],
    template: '<component ></component>'
})

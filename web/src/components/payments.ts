import Vue from 'vue'

Vue.component('payment-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <dl class="row">
        <template v-if="data.paymentId">
            <dt class="col-sm-3">Payment Id</dt>
            <dd class="col-sm-9">{{data.paymentId}}</dd>
        </template>
        <template v-if="data.generalStatus">
            <dt class="col-sm-3">General Status</dt>
            <dd class="col-sm-9">{{data.generalStatus}}</dd>
        </template>
        <template v-if="data.detailedStatus">
            <dt class="col-sm-3">Detailed Status</dt>
            <dd class="col-sm-9">{{data.detailedStatus}}</dd>
        </template>
    </dl>
</div>
`})

Vue.component('bundle-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <dl class="row">
        <template v-if="data.bundleId">
            <dt class="col-sm-3">Bundle Id</dt>
            <dd class="col-sm-9">{{data.bundleId}}</dd>
        </template>
        <template v-if="data.bundleStatus">
            <dt class="col-sm-3">Bundle Status</dt>
            <dd class="col-sm-9">{{data.bundleStatus}}</dd>
        </template>
    </dl>
</div>
`})

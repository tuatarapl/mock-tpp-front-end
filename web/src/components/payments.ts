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

Vue.component('get-payment-result', {
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
        <template v-if="data.executionMode">
            <dt class="col-sm-3">Execution Mode</dt>
            <dd class="col-sm-9">{{data.executionMode}}</dd>
        </template>
    </dl>
</div>
`})

Vue.component('get-bundle-result', {
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
        <template v-if="data.payments">
            <ul class="list-group ml-4">
                <li v-for="payment in data.payments" class="list-group-item">
                    <dl class="row">
                        <template v-if="payment.paymentId">
                            <dt class="col-sm-3">Payment Id</dt>
                            <dd class="col-sm-9">{{payment.paymentId}}</dd>
                        </template>
                        <template v-if="payment.generalStatus">
                            <dt class="col-sm-3">General Status</dt>
                            <dd class="col-sm-9">{{payment.generalStatus}}</dd>
                        </template>
                        <template v-if="payment.detailedStatus">
                            <dt class="col-sm-3">Detailed Status</dt>
                            <dd class="col-sm-9">{{payment.detailedStatus}}</dd>
                        </template>
                        <template v-if="payment.executionMode">
                            <dt class="col-sm-3">Execution Mode</dt>
                            <dd class="col-sm-9">{{payment.executionMode}}</dd>
                        </template>
                    </dl>
                </li>
            </ul>
        </template>
    </dl>
</div>
`})

Vue.component('get-multiple-payments-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <dl class="row">
        <template v-if="data.payments">
            <ul class="list-group ml-4">
                <li v-for="payment in data.payments" class="list-group-item">
                    <dl class="row">
                        <template v-if="payment.paymentId">
                            <dt class="col-sm-3">Payment Id</dt>
                            <dd class="col-sm-9">{{payment.paymentId}}</dd>
                        </template>
                        <template v-if="payment.generalStatus">
                            <dt class="col-sm-3">General Status</dt>
                            <dd class="col-sm-9">{{payment.generalStatus}}</dd>
                        </template>
                        <template v-if="payment.detailedStatus">
                            <dt class="col-sm-3">Detailed Status</dt>
                            <dd class="col-sm-9">{{payment.detailedStatus}}</dd>
                        </template>
                        <template v-if="payment.executionMode">
                            <dt class="col-sm-3">Execution Mode</dt>
                            <dd class="col-sm-9">{{payment.executionMode}}</dd>
                        </template>
                    </dl>
                </li>
            </ul>
        </template>
    </dl>
</div>
`})

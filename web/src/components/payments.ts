import Vue from 'vue'

Vue.component('sender-pis-domestic-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.sender">
        <div class="form-group">
            <label for="accountNumber">Account Number</label>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.accountNumber"/>
        </div>
        <div class="form-group">
            <label for="nameAddress">Name Address</label>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.nameAddress.value[0]"/>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.nameAddress.value[1]"/>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.nameAddress.value[2]"/>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.nameAddress.value[3]"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.request, 'sender', {
                nameAddress: {
                    value: []
                }
            })
        }
    }
})

Vue.component('recipient-pis-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.recipient">
        <div class="form-group">
            <label for="accountNumber">Account Number</label>
            <input type="text" class="form-control" id="accountNumber" v-model="request.recipient.accountNumber"/>
        </div>
        <div class="form-group">
            <label for="nameAddress">Name Address</label>
            <input type="text" class="form-control" id="accountNumber"
                v-model="request.recipient.nameAddress.value[0]"/>
            <input type="text" class="form-control" id="accountNumber"
                v-model="request.recipient.nameAddress.value[1]"/>
            <input type="text" class="form-control" id="accountNumber"
                v-model="request.recipient.nameAddress.value[2]"/>
            <input type="text" class="form-control" id="accountNumber"
                v-model="request.recipient.nameAddress.value[3]"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.request, 'recipient', {
                nameAddress: {
                    value: []
                }
            })
        }
    }
})

Vue.component('frequency-edit', {
    props: ['recurrence'],
    template: `
<div class="ml-4">
    <template v-if="recurrence.frequency">
        <div class="form-group">
            <label for="periodType">Period Type</label>
            <select type="text" class="form-control" id="periodType"
                v-model="recurrence.frequency.periodType">
                <option>day</option>
                <option>week</option>
                <option>month</option>
            </select>
        </div>
        <div class="form-group">
            <label for="periodValue">Period Value</label>
            <input type="text" class="form-control" id="periodValue" v-model.number="recurrence.frequency.periodValue"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.recurrence, 'frequency', {
            })
        }
    }
})

Vue.component('recurrence-edit', {
    props: ['transferData'],
    template: `
<div class="ml-4">
    <template v-if="transferData.recurrence">
        <div class="form-group">
            <label for="startDate">Start Date</label>
            <input type="date" class="form-control" id="startDate" v-model="transferData.recurrence.startDate"/>
        </div>
        <h4>Frequency</h4>
        <frequency-edit :recurrence="transferData.recurrence"></frequency-edit>
        <div class="form-group">
            <label for="endDate">End Date</label>
            <input type="date" class="form-control" id="endDate" v-model="transferData.recurrence.endDate"/>
        </div>
        <div class="form-group">
            <label for="dayOffOffsetType">Day Offset Type</label>
            <select type="text" class="form-control" id="dayOffOffsetType"
                v-model="transferData.recurrence.dayOffOffsetType">
                <option>before</option>
                <option>after</option>
            </select>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.transferData, 'recurrence', {
            })
        }
    }
})

Vue.component('transfer-data-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.transferData">
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" v-model="request.transferData.description"/>
        </div>
        <div class="form-group">
            <label for="amount">Amount</label>
            <input type="text" class="form-control" id="amount" v-model="request.transferData.amount"/>
        </div>
        <div class="form-group">
            <label for="executionDate">Execution Date</label>
            <input type="date" class="form-control" id="executionDate" v-model="request.transferData.executionDate"/>
        </div>
        <h3>Recurrence</h3>
        <recurrence-edit :transferData="request.transferData"></recurrence-edit>
        <div class="form-group">
            <label for="currency">Currency</label>
            <input type="text" class="form-control" id="currency" v-model="request.transferData.currency"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.request, 'transferData', {
            })
        }
    }
})

Vue.component('domestic-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <h2>Recipient</h2>
    <recipient-pis-request :request="request"></recipient-pis-request>
    <h2>Sender</h2>
    <sender-pis-domestic-request :request="request"></sender-pis-domestic-request>
    <h2>Transfer Data</h2>
    <transfer-data-request :request="request"></transfer-data-request>
    <div class="form-group">
        <label for="tppTransactionId">Transaction Id</label>
        <input type="text" class="form-control" id="tppTransactionId" v-model="request.tppTransactionId"/>
    </div>
    <div class="form-group">
        <label for="deliveryMode">Delivery Mode</label>
        <select type="text" class="form-control" id="deliveryMode"
            v-model="request.deliveryMode">
            <option>ExpressD0</option>
            <option>StandardD1</option>
        </select>
    </div>
    <div class="form-group">
        <label for="system">System</label>
        <select type="text" class="form-control" id="system"
            v-model="request.system">
            <option>Elixir</option>
            <option>ExpressElixir</option>
            <option>Sorbnet</option>
            <option>BlueCash</option>
            <option>Internal</option>
        </select>
    </div>
    <div class="form-group">
        <label for="hold">Hold</label>
        <input type="checkbox" class="form-control" id="hold" v-model="request.hold"/>
    </div>
    <div class="form-group">
        <label for="executionMode">Execution Mode</label>
        <select type="text" class="form-control" id="executionMode"
            v-model="request.executionMode">
            <option>Immediate</option>
            <option>FutureDated</option>
            <option>Recurring</option>
        </select>
    </div>
</form>
`
})

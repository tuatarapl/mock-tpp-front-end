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

Vue.component('sender-pis-foreign-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.sender">
        <div class="form-group">
            <label for="accountNumber">Account Number</label>
            <input type="text" class="form-control" id="accountNumber" v-model="request.sender.accountNumber"/>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="request.sender.name"/>
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

Vue.component('recipient-pis-foreign-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.recipient">
        <div class="form-group">
            <label for="accountNumber">Account Number</label>
            <input type="text" class="form-control" id="accountNumber" v-model="request.recipient.accountNumber"/>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="request.recipient.name"/>
        </div>
        <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address_0"
                v-model="request.recipient.address[0]"/>
            <input type="text" class="form-control" id="address_1"
                v-model="request.recipient.address[1]"/>
            <input type="text" class="form-control" id="address_2"
                v-model="request.recipient.address[2]"/>
            <input type="text" class="form-control" id="address_3"
                v-model="request.recipient.address[3]"/>
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
                address: []
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

Vue.component('recipient-bank-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.recipientBank">
        <div class="form-group">
            <label for="bicOrSwift">BIC or SWIFT</label>
            <input type="text" class="form-control" id="bicOrSwift" v-model="request.recipientBank.bicOrSwift"/>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="request.recipientBank.name"/>
        </div>
        <div class="form-group">
            <label for="code">Code</label>
            <input type="text" class="form-control" id="code" v-model="request.recipientBank.code"/>
        </div>
        <div class="form-group">
            <label for="countryCode">Country Code</label>
            <input type="text" class="form-control" id="countryCode" v-model="request.recipientBank.countryCode"/>
        </div>
        <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address_0"
                v-model="request.recipientBank.address[0]"/>
            <input type="text" class="form-control" id="address_1"
                v-model="request.recipientBank.address[1]"/>
            <input type="text" class="form-control" id="address_2"
                v-model="request.recipientBank.address[2]"/>
            <input type="text" class="form-control" id="address_3"
                v-model="request.recipientBank.address[3]"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.request, 'recipientBank', {
                address: []
            })
        }
    }
})

Vue.component('us-info-request', {
    props: ['request'],
    template: `
<div class="ml-4">
    <template v-if="request.usInfo">
        <div class="form-group">
            <label for="bicOrSwift">Payor Id</label>
            <input type="text" class="form-control" id="bicOrSwift" v-model="request.usInfo.payerInfo.payorId"/>
        </div>
        <div class="form-group">
            <label for="payorIdType">Payor Id< Type</label>
            <select type="text" class="form-control" id="payorIdType"
                v-model="request.usInfo.payerInfo.payorIdType">
                <option>N</option>
                <option>P</option>
                <option>R</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </div>
        <div class="form-group">
            <label for="formCode">Form Code</label>
            <input type="text" class="form-control" id="formCode" v-model="request.usInfo.formCode"/>
        </div>
        <div class="form-group">
            <label for="periodId">Period Id</label>
            <input type="text" class="form-control" id="periodId" v-model="request.usInfo.periodId"/>
        </div>
        <div class="form-group">
            <label for="periodType">Period Type</label>
            <input type="text" class="form-control" id="periodType" v-model="request.usInfo.periodType"/>
        </div>
        <div class="form-group">
            <label for="year">Year</label>
            <input type="number" class="form-control" id="year" v-model.number="request.usInfo.year"/>
        </div>
        <div class="form-group">
            <label for="obligationId">Obligation Id</label>
            <input type="text" class="form-control" id="obligationId" v-model="request.usInfo.obligationId"/>
        </div>
    </template>
    <button type="button" class="btn btn-primary" @click="doInitialize()" v-else>
        Initialize
    </button>
</div>
`,
    methods: {
        doInitialize() {
            Vue.set(this.request, 'usInfo', {
                payerInfo: {}
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

Vue.component('eea-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <h2>Recipient</h2>
    <recipient-pis-foreign-request :request="request"></recipient-pis-foreign-request>
    <h2>Sender</h2>
    <sender-pis-foreign-request :request="request"></sender-pis-foreign-request>
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
            <option>SEPA</option>
            <option>InstantSEPA</option>
            <option>Target</option>
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

Vue.component('non-eea-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <h2>Recipient</h2>
    <recipient-pis-foreign-request :request="request"></recipient-pis-foreign-request>
    <h2>Recipient Bank</h2>
    <recipient-bank-request :request="request"></recipient-bank-request>
    <h2>Sender</h2>
    <sender-pis-foreign-request :request="request"></sender-pis-foreign-request>
    <h2>Transfer Data</h2>
    <transfer-data-request :request="request"></transfer-data-request>
    <div class="form-group">
        <label for="transferCharges">Transfer Charges</label>
        <input type="text" class="form-control" id="transferCharges" v-model="request.transferCharges"/>
    </div>
    <div class="form-group">
        <label for="tppTransactionId">Transaction Id</label>
        <input type="text" class="form-control" id="tppTransactionId" v-model="request.tppTransactionId"/>
    </div>
    <div class="form-group">
        <label for="deliveryMode">Delivery Mode</label>
        <select type="text" class="form-control" id="deliveryMode"
            v-model="request.deliveryMode">
            <option>ExpressD0</option>
            <option>UrgentD1</option>
            <option>StandardD2</option>
        </select>
    </div>
    <div class="form-group">
        <label for="system">System</label>
        <select type="text" class="form-control" id="system"
            v-model="request.system">
            <option>Swift</option>
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

Vue.component('tax-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <h2>Recipient</h2>
    <recipient-pis-request :request="request"></recipient-pis-request>
    <h2>Sender</h2>
    <sender-pis-domestic-request :request="request"></sender-pis-domestic-request>
    <h2>Transfer Data</h2>
    <transfer-data-request :request="request"></transfer-data-request>
    <h2>Us Info</h2>
    <us-info-request :request="request"></us-info-request>
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

Vue.component('transfers-request', {
    props: ['list', 'operation'],
    template: `
<ul class="list-group">
    <li v-for="(item, index) in list" class="list-group-item">
        <edit-request :operation="operation" :request="item"></edit-request>
        <button type="button" class="btn btn-primary" @click="doRemove(index)">
            Remove
        </button>
    </li>
    <li class="list-group-item">
        <button type="button" class="btn btn-primary" @click="doAdd()">
            Add
        </button>
    </li>
</ul>
`,
    methods: {
        doAdd() {
            this.list.push({})
        },
        doRemove(index: number) {
            this.list.splice(index, 1)
        }
    }
})

Vue.component('bundle-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <div class="form-group">
        <label for="tppBundleId">Bundle Id</label>
        <input type="text" class="form-control" id="tppBundleId" v-model="request.tppBundleId"/>
    </div>
    <div class="form-group">
        <label for="transfersTotalAmount">Transfers Total Amount</label>
        <input type="text" class="form-control" id="transfersTotalAmount" v-model="request.transfersTotalAmount"/>
    </div>
    <div class="form-group">
        <label for="typeOfTransfers">Type of Transfers</label>
        <select type="text" class="form-control" id="typeOfTransfers"
            v-model="request.typeOfTransfers" @change="changeType">
            <option>domestic</option>
            <option>EEA</option>
            <option>nonEEA</option>
            <option>tax</option>
        </select>
    </div>
    <template v-if="request.domesticTransfers">
        <h2>Domestic Transfers</h2>
        <transfers-request class="mb-4" operation="domestic" :list="request.domesticTransfers">
        </transfers-request>
    </template>
    <template v-if="request.EEATransfers">
        <h2>EEA Transfers</h2>
        <transfers-request class="mb-4" operation="EEA" :list="request.EEATransfers">
        </transfers-request>
    </template>
    <template v-if="request.nonEEATransfers">
        <h2>Non EEA Transfers</h2>
        <transfers-request class="mb-4" operation="nonEEA" :list="request.nonEEATransfers">
        </transfers-request>
    </template>
    <template v-if="request.taxTransfers">
        <h2>Tax Transfers</h2>
        <transfers-request  class="mb-4" operation="tax" :list="request.taxTransfers">
        </transfers-request>
    </template>
</form>
`,
    methods: {
        changeType(event) {
            const listName = event.target.value + 'Transfers'
            if (!this.request[listName]) {
                Vue.set(this.request, listName, [])
            }
        }
    }
})

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

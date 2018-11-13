import Vue from 'vue'

Vue.component('sender-recipient', {
    props: ['data'],
    template: `
<ul class="list-unstyled">
    <li>{{data.accountNumber}}</li>
    <li><name-address :data="data.nameAddress"></name-address></li>
    <li><bank-data :bank="data.bank"></bank-data></li>
</ul>
`})

Vue.component('get-transactions-done-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Trade Date</th>
            </tr>
            <tr>
                <th>Booking Date</th>
                <th>Post Transaction Balance</th>
                <th>MCC</th>
                <th>Transaction Category</th>
                <th>Transaction Status</th>
                <th>Additional Data</th>
            </tr>
            <tr>
                <th colspan="2">Initiator</th>
                <th colspan="2">Sender</th>
                <th colspan="2">Recipient</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="transaction in data.transactions">
                <tr>
                    <td>{{transaction.itemId}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.currency}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{transaction.transactionType}}</td>
                    <td>{{transaction.tradeDate}}</td>
                </tr>
                <tr>
                    <td>{{transaction.bookingDate}}</td>
                    <td>{{transaction.postTransactionBalance}}</td>
                    <td>{{transaction.mcc}}</td>
                    <td>{{transaction.transactionCategory}}</td>
                    <td><dictionary-item :item="transaction.transactionStatus"></dictionary-item></td>
                    <td><aux-data :data="transaction.auxData"></aux-data></td>
                </tr>
                <tr>
                    <td colspan="2"><name-address :data="transaction.initiator"></name-address></td>
                    <td colspan="2"><sender-recipient :data="transaction.sender"></sender-recipient></td>
                    <td colspan="2"><sender-recipient :data="transaction.recipient"></sender-recipient></td>
                </tr>
            </template>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-transactions-pending-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Trade Date</th>
            </tr>
            <tr>
                <th colspan="2">MCC</th>
                <th colspan="2">Transaction Category</th>
                <th colspan="2">Additional Data</th>
            </tr>
            <tr>
                <th colspan="2">Initiator</th>
                <th colspan="2">Sender</th>
                <th colspan="2">Recipient</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="transaction in data.transactions">
                <tr>
                    <td>{{transaction.itemId}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.currency}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{transaction.transactionType}}</td>
                    <td>{{transaction.tradeDate}}</td>
                </tr>
                <tr>
                    <td colspan="2">{{transaction.mcc}}</td>
                    <td colspan="2">{{transaction.transactionCategory}}</td>
                    <td colspan="2"><aux-data :data="transaction.auxData"></aux-data></td>
                </tr>
                <tr>
                    <td colspan="2"><name-address :data="transaction.initiator"></name-address></td>
                    <td colspan="2"><sender-recipient :data="transaction.sender"></sender-recipient></td>
                    <td colspan="2"><sender-recipient :data="transaction.recipient"></sender-recipient></td>
                </tr>
            </template>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-transactions-rejected-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Trade Date</th>
            </tr>
            <tr>
                <th>Rejection Date</th>
                <th>Rejection Reason</th>
                <th>MCC</th>
                <th>Transaction Category</th>
                <th colspan="2">Additional Data</th>
            </tr>
            <tr>
                <th colspan="2">Initiator</th>
                <th colspan="2">Sender</th>
                <th colspan="2">Recipient</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="transaction in data.transactions">
                <tr>
                    <td>{{transaction.itemId}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.currency}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{transaction.transactionType}}</td>
                    <td>{{transaction.tradeDate}}</td>
                </tr>
                <tr>
                    <td>{{transaction.rejectionDate}}</td>
                    <td>{{transaction.rejectionReason}}</td>
                    <td>{{transaction.mcc}}</td>
                    <td>{{transaction.transactionCategory}}</td>
                    <td><dictionary-item :item="transaction.transactionStatus"></dictionary-item></td>
                    <td colspan="2"><aux-data :data="transaction.auxData"></aux-data></td>
                </tr>
                <tr>
                    <td colspan="2"><name-address :data="transaction.initiator"></name-address></td>
                    <td colspan="2"><sender-recipient :data="transaction.sender"></sender-recipient></td>
                    <td colspan="2"><sender-recipient :data="transaction.recipient"></sender-recipient></td>
                </tr>
            </template>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-transactions-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Trade Date</th>
            </tr>
            <tr>
                <th>MCC</th>
                <th>Transaction Category</th>
                <th>Transaction Status</th>
                <th>Additional Data</th>
            </tr>
            <tr>
                <th colspan="2">Initiator</th>
                <th colspan="2">Sender</th>
                <th colspan="2">Recipient</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="transaction in data.transactions">
                <tr>
                    <td>{{transaction.itemId}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.currency}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{transaction.transactionType}}</td>
                    <td>{{transaction.tradeDate}}</td>
                </tr>
                <tr>
                    <td>{{transaction.mcc}}</td>
                    <td>{{transaction.transactionCategory}}</td>
                    <td><dictionary-item :item="transaction.transactionStatus"></dictionary-item></td>
                    <td colspan="3"><aux-data :data="transaction.auxData"></aux-data></td>
                </tr>
                <tr>
                    <td colspan="2"><name-address :data="transaction.initiator"></name-address></td>
                    <td colspan="2"><sender-recipient :data="transaction.sender"></sender-recipient></td>
                    <td colspan="2"><sender-recipient :data="transaction.recipient"></sender-recipient></td>
                </tr>
            </template>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-holds-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Trade Date</th>
            </tr>
            <tr>
                <th>Hold Expiration Date</th>
                <th>MCC</th>
                <th>Additional Data</th>
            </tr>
            <tr>
                <th colspan="2">Initiator</th>
                <th colspan="2">Sender</th>
                <th colspan="2">Recipient</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="transaction in data.holds">
                <tr>
                    <td>{{transaction.itemId}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.currency}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{transaction.transactionType}}</td>
                    <td>{{transaction.tradeDate}}</td>
                </tr>
                <tr>
                    <td>{{transaction.holdExpirationDate}}</td>
                    <td>{{transaction.mcc}}</td>
                    <td colspan="4"><aux-data :data="transaction.auxData"></aux-data></td>
                </tr>
                <tr>
                    <td colspan="2"><name-address :data="transaction.initiator"></name-address></td>
                    <td colspan="2"><sender-recipient :data="transaction.sender"></sender-recipient></td>
                    <td colspan="2"><sender-recipient :data="transaction.recipient"></sender-recipient></td>
                </tr>
            </template>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-transaction-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <dl class="row">
        <dt class="col-sm-3">Base Info</dt>
        <dd class="col-sm-9">
            <dl class="row">
                <dt class="col-sm-3">Item Id</dt>
                <dd class="col-sm-9">{{data.baseInfo.itemId}}</dd>

                <dt class="col-sm-3">Amount</dt>
                <dd class="col-sm-9">{{data.baseInfo.amount}}</dd>

                <dt class="col-sm-3">Currency</dt>
                <dd class="col-sm-9">{{data.baseInfo.currency}}</dd>

                <dt class="col-sm-3">Description</dt>
                <dd class="col-sm-9">{{data.baseInfo.description}}</dd>

                <dt class="col-sm-3">Transaction Type</dt>
                <dd class="col-sm-9">{{data.baseInfo.transactionType}}</dd>

                <dt class="col-sm-3">Trade Date</dt>
                <dd class="col-sm-9">{{data.baseInfo.tradeDate}}</dd>

                <dt class="col-sm-3">MCC</dt>
                <dd class="col-sm-9">{{data.baseInfo.mcc}}</dd>

                <dt class="col-sm-3">Additional Data</dt>
                <dd class="col-sm-9"><aux-data :data="data.baseInfo.auxData"></aux-data></dd>

                <dt class="col-sm-3">Transaction Category</dt>
                <dd class="col-sm-9">{{data.baseInfo.transactionCategory}}</dd>

                <dt class="col-sm-3">Transaction Status</dt>
                <dd class="col-sm-9"><dictionary-item :item="data.baseInfo.transactionStatus"></dictionary-item></dd>

                <dt class="col-sm-3">Initiator</dt>
                <dd class="col-sm-9"><name-address :data="data.baseInfo.initiator"></name-address></dd>

                <dt class="col-sm-3">Sender</dt>
                <dd class="col-sm-9"><sender-recipient :data="data.baseInfo.sender"></sender-recipient></dd>

                <dt class="col-sm-3">Recipient</dt>
                <dd class="col-sm-9"><sender-recipient :data="data.baseInfo.recipient"></sender-recipient></dd>

                <dt class="col-sm-3">Booking Date</dt>
                <dd class="col-sm-9">{{data.baseInfo.bookingDate}}</dd>

                <dt class="col-sm-3">Post Transaction balance</dt>
                <dd class="col-sm-9">{{data.baseInfo.postTransactionBalance}}</dd>
            </dl>
        </dd>
        <template v-if="data.zusInfo">
            <dt class="col-sm-3" >Zus Info</dt>
            <dd class="col-sm-9">
                <dl class="row">
                    <dt class="col-sm-3">Payer Info</dt>
                    <dd class="col-sm-9">
                        <dl class="row">
                            <dt class="col-sm-3">NIP</dt>
                            <dd class="col-sm-9">{{data.zusInfo.payerInfo.nip}}</dd>

                            <dt class="col-sm-3">Additional Payor Id</dt>
                            <dd class="col-sm-9">{{data.zusInfo.payerInfo.additionalPayorId}}}</dd>

                            <dt class="col-sm-3">Additional Payor Id Type</dt>
                            <dd class="col-sm-9">{{data.zusInfo.payerInfo.additionalPayorIdType}}}</dd>
                        </dl>
                   </dd>
                    <dt class="col-sm-3">Contribution Type</dt>
                    <dd class="col-sm-9">{{data.zusInfo.contributionType}}</dd>

                    <dt class="col-sm-3">Contribution Id</dt>
                    <dd class="col-sm-9">{{data.zusInfo.contributionId}}</dd>

                    <dt class="col-sm-3">Contribution period</dt>
                    <dd class="col-sm-9">{{data.zusInfo.contributionPeriod}}</dd>

                    <dt class="col-sm-3">Payment Id Type</dt>
                    <dd class="col-sm-9">{{data.zusInfo.paymentTypeId}}</dd>

                    <dt class="col-sm-3">Obligation Id</dt>
                    <dd class="col-sm-9">{{data.zusInfo.obligationId}}</dd>
                </dl>
            </dd>
        </template>
        <template v-if="data.usInfo">
            <dt class="col-sm-3" >Tax Info</dt>
            <dd class="col-sm-9">
                <dl class="row">
                    <dt class="col-sm-3">Payer Info</dt>
                    <dd class="col-sm-9">
                        <dl class="row">
                            <dt class="col-sm-3">Payor Id</dt>
                            <dd class="col-sm-9">{{data.usInfo.payerInfo.payorId}}}</dd>

                            <dt class="col-sm-3">Payor Id Type</dt>
                            <dd class="col-sm-9">{{data.usInfo.payerInfo.payorIdType}}}</dd>
                        </dl>
                   </dd>
                    <dt class="col-sm-3">Form Code</dt>
                    <dd class="col-sm-9">{{data.usInfo.formCode}}</dd>

                    <dt class="col-sm-3">Period Id</dt>
                    <dd class="col-sm-9">{{data.usInfo.periodId}}</dd>

                    <dt class="col-sm-3">Period period</dt>
                    <dd class="col-sm-9">{{data.usInfo.periodType}}</dd>

                    <dt class="col-sm-3">Year</dt>
                    <dd class="col-sm-9">{{data.usInfo.year}}</dd>

                    <dt class="col-sm-3">Obligation Id</dt>
                    <dd class="col-sm-9">{{data.usInfo.obligationId}}</dd>
                </dl>
            </dd>
        </template>
        <template v-if="data.cardInfo">
            <dt class="col-sm-3" >Card Info</dt>
            <dd class="col-sm-9">
                <dl class="row">
                    <dt class="col-sm-3">Card Holder</dt>
                    <dd class="col-sm-9">{{data.cardInfo.cardHolder}}</dd>

                    <dt class="col-sm-3">Card Number</dt>
                    <dd class="col-sm-9">{{data.cardInfo.cardNumber}}</dd>
                </dl>
            </dd>
        </template>
        <template v-if="data.currencyDate">
            <dt class="col-sm-3">Currency Date</dt>
            <dd class="col-sm-9">{{data.currencyDate}}</dd>
        </template>
        <template v-if="data.transactionRate">
            <dt class="col-sm-3">Transaction Rate</dt>
            <dd class="col-sm-9">
                <dl class="row" v-for="rate in data.transactionRate">
                    <dt class="col-sm-3">Card Holder</dt>
                    <dd class="col-sm-9">{{rate.rate}}</dd>

                    <dt class="col-sm-3">Card Number</dt>
                    <dd class="col-sm-9">{{rate.fromCurrency}}</dd>

                    <dt class="col-sm-3">Card Number</dt>
                    <dd class="col-sm-9">{{rate.toCurrency}}</dd>
                </dl>
            </dd>
        </template>
        <template v-if="data.baseCurrency">
            <dt class="col-sm-3">Base Currency</dt>
            <dd class="col-sm-9">{{data.baseCurrency}}</dd>
        </template>
        <template v-if="data.amountBaseCurrency">
            <dt class="col-sm-3">Amount Base Currency</dt>
            <dd class="col-sm-9">{{data.amountBaseCurrency}}</dd>
        </template>
        <template v-if="data.usedPaymentInstrumentId">
            <dt class="col-sm-3">Used Payment Instrument Id</dt>
            <dd class="col-sm-9">{{data.usedPaymentInstrumentId}}</dd>
        </template>
        <template v-if="data.tppTransactionId">
            <dt class="col-sm-3">TPP Transaction Id</dt>
            <dd class="col-sm-9">{{data.tppTransactionId}}</dd>
        </template>
        <template v-if="data.tppName">
            <dt class="col-sm-3">TPP Name</dt>
            <dd class="col-sm-9">{{data.tppName}}</dd>
        </template>
        <template v-if="data.rejectionReason">
            <dt class="col-sm-3">Rejection Reason</dt>
            <dd class="col-sm-9">{{data.rejectionReason}}</dd>
        </template>
        <template v-if="data.holdExpirationDate">
            <dt class="col-sm-3">Hold Expiration Date</dt>
            <dd class="col-sm-9">{{data.holdExpirationDate}}</dd>
        </template>
    </dl>
</div>
`})

Vue.component('get-transactions-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <div class="form-group">
        <label for="accountNumber">Account Number</label>
        <input type="text" class="form-control" id="accountNumber" v-model="request.accountNumber"/>
    </div>
    <div class="form-group">
        <label for="itemIdFrom">Item Id From</label>
        <input type="text" class="form-control" id="itemIdFrom" v-model="request.itemIdFrom"/>
    </div>
    <div class="form-group">
        <label for="transactionDateFrom">Transaction Date From</label>
        <input type="date" class="form-control" id="transactionDateFrom" v-model="request.transactionDateFrom"/>
    </div>
    <div class="form-group">
        <label for="transactionDateTo">Transaction Date To</label>
        <input type="date" class="form-control" id="transactionDateTo" v-model="request.transactionDateTo"/>
    </div>
    <div class="form-group">
        <label for="bookingDateFrom">Booking Date From</label>
        <input type="date" class="form-control" id="bookingDateFrom" v-model="request.bookingDateFrom"/>
    </div>
    <div class="form-group">
        <label for="bookingDateTo">Booking Date To</label>
        <input type="date" class="form-control" id="bookingDateTo" v-model="request.bookingDateTo"/>
    </div>
    <div class="form-group">
        <label for="minAmount">Min Amount</label>
        <input type="text" class="form-control" id="minAmount" v-model="request.minAmount"/>
    </div>
    <div class="form-group">
        <label for="maxAmount">Max Amount</label>
        <input type="text" class="form-control" id="maxAmount" v-model="request.maxAmount"/>
    </div>
    <div class="form-group">
        <label for="type">Type</label>
        <select class="form-control" id="type" v-model="request.type">
            <option></option>
            <option>CREDIT</option>
            <option>DEBIT</option>
        </select>
    </div>
    <div class="form-group">
        <label for="pageId">Page Id</label>
        <input type="text" class="form-control" id="pageId" v-model="request.pageId"/>
    </div>
    <div class="form-group">
        <label for="perPage">Per Page</label>
        <input type="number" class="form-control" id="perPage" v-model.number="request.perPage"/>
    </div>
</form>
`
})

Vue.component('get-transaction-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <div class="form-group">
        <label for="transactionId">Transaction Id</label>
        <input type="text" class="form-control" id="transactionId" v-model="request.transactionId"/>
    </div>
    <div class="form-group">
        <label for="accountNumber">Account Number</label>
        <input type="text" class="form-control" id="accountNumber" v-model="request.accountNumber"/>
    </div>
    <div class="form-group">
        <label for="bookingDate">Booking Date </label>
        <input type="date" class="form-control" id="bookingDate" v-model="request.bookingDate"/>
    </div>
</form>
`
})

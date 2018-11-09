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

Vue.component('get-transactions-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in data.transactions">
                <td>{{JSON.stringify(transaction)}}</td>
            </tr>
        </tbody>
    </table>
    <result-paging :pageInfo="data.pageInfo"></result-paging>
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

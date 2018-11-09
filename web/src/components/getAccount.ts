import Vue from 'vue'

Vue.component('get-account-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <dl class="row">
        <dt class="col-sm-3 col-md-2">Account Number</dt>
        <dd class="col-sm-9 col-md-4">{{data.account.accountNumber}}</dd>

        <dt class="col-sm-3 col-md-3">Account Name Client</dt>
        <dd class="col-sm-9 col-md-3">{{data.account.accountNameClient}}</dd>

        <dt class="col-sm-3 col-md-2">Available Balance</dt>
        <dd class="col-sm-9 col-md-2">{{data.account.availableBalance}}</dd>

        <dt class="col-sm-3 col-md-2">Booking Balance</dt>
        <dd class="col-sm-9 col-md-2">{{data.account.bookingBalance}}</dd>

        <dt class="col-sm-3 col-md-2">Currency</dt>
        <dd class="col-sm-9 col-md-2">{{data.account.currency}}</dd>

        <dt class="col-sm-3 col-md-2">Account Type</dt>
        <dd class="col-sm-9 col-md-4">
            {{data.account.accountType.description}} ({{data.account.accountType.code}})
        </dd>

        <dt class="col-sm-3 col-md-2">Account Type Name</dt>
        <dd class="col-sm-9 col-md-4">{{data.account.accountTypeName}}</dd>

        <dt class="col-sm-3 col-md-2">Account Holder Type</dt>
        <dd class="col-sm-9 col-md-4">{{data.account.accountHolderType}}</dd>

        <dt class="col-sm-3 col-md-2">Name Address</dt>
        <dd class="col-sm-9 col-md-4">
            <ul class="list-unstyled">
                <li v-for="line in data.account.nameAddress.value">{{line}}</li>
            </ul>
        </dd>

        <dt class="col-sm-3 col-md-2">Bank</dt>
        <dd class="col-sm-9 col-md-10">
            <dl class="row">
                <dt class="col-sm-3 col-md-2">Name</dt>
                <dd class="col-sm-9 col-md-4">{{data.account.bank.name}}</dd>

                <dt class="col-sm-3 col-md-2">Address</dt>
                <dd class="col-sm-9 col-md-4">
                    <ul class="list-unstyled">
                        <li v-for="line in data.account.bank.address">{{line}}</li>
                    </ul>
                </dd>

                <dt class="col-sm-3 col-md-2">Bic or SWIFT</dt>
                <dd class="col-sm-9 col-md-2">{{data.account.bank.bicOrSwift}}</dd>

                <dt class="col-sm-3 col-md-2">Code</dt>
                <dd class="col-sm-9 col-md-2">{{data.account.bank.code}}</dd>

                <dt class="col-sm-3 col-md-2">Country Code</dt>
                <dd class="col-sm-9 col-md-2">{{data.account.bank.countryCode}}</dd>
            </dl>
        </dd>
        <dt class="col-sm-3 col-md-2">Additional Data</dt>
        <dd class="col-sm-9 col-md-10">
            <dl class="row">
                <template v-for="(value, key) in data.account.auxData">
                <dt class="col-sm-3">{{key}}</dt>
                <dd class="col-sm-9">{{value}}</dd>
                </template>
            </dl>
        </dd>
    </dl>
</div>
`})

Vue.component('get-account-request', {
    props: ['request'],
    template: `
<form class="form-group">
    <div class="form-group">
        <label for="accountNumber">Account Number</label>
        <input type="text" class="form-control" id="accountNumber" v-model="request.accountNumber"/>
    </div>
</form>
`
})

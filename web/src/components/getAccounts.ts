import Vue from 'vue'

Vue.component('get-accounts-result', {
    props: ['data'],
    template: `
<div>
    <result-header :header="data.responseHeader"></result-header>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Account Number</th>
                <th>Account Type Name</th>
                <th>Account Type Code</th>
                <th>Account Type Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="account in data.accounts">
                <td>{{account.accountNumber}}</td>
                <td>{{account.accountTypeName}}</td>
                <td>{{account.accountType.code}}</td>
                <td>{{account.accountType.description}}</td>
            </tr>
        </tbody>
    </table>
</div>
`})


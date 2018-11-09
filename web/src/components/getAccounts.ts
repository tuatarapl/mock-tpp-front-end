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
    <result-paging :pageInfo="data.pageInfo"></result-paging>
</div>
`})

Vue.component('get-accounts-request', {
    props: ['request'],
    template: `
<form class="form-group">
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

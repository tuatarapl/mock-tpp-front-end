import Vue from 'vue'
Vue.component('consent-edit', {
    props: ['consent'],
    template: `
<form class="form-group">
    <div class="form-group">
        <label for="scopeGroupType">Scope Group Type</label>
        <select class="form-control" id="scopeGroupType" v-model="consent.scope_details.scopeGroupType"
            @change="consent.scope = $event.target.value">
            <option v-for="scopeGroupType in scopeGroupTypes">{{scopeGroupType}}</option>
        </select>
    </div>
    <div class="form-group">
        <label for="privilegeList">Privilege List</label>
        <ul class="list-group">
            <li class="list-group-item" v-for="(privilege,index) in consent.scope_details.privilegeList">
                <div class="form-group">
                    <label :for="'accountNumber_'+index">Account Number</label>
                    <input type="text" class="form-control" :id="'accountNumber_'+index"
                        v-model="privilege.accountNumber"/>
                </div>
                <button type="button" class="btn btn-primary" @click="doDeletePrivilege(index)">Delete</button>
            </li>
            <li class="list-group-item">
                <button type="button" class="btn btn-primary" @click="doAddPrivilege()">Add</button>
            </li>
        </ul>
    </div>
    <div class="form-group">
        <label for="scopeTimeDuration">Scope Time Limit</label>
        <input type="datetime-local" class="form-control" id="scopeTimeLimit"
            v-model="consent.scope_details.scopeTimeLimit"/>
    </div>
    <div class="form-group">
        <label for="scopeTimeDuration">Scope Time Duration</label>
        <input type="number" class="form-control" id="scopeTimeDuration"
            v-model.number="consent.scope_details.scopeTimeDuration"/>
    </div>
    <div class="form-group">
        <label for="consentId">Consent Id</label>
        <input type="text" class="form-control" id="consentId" v-model="consent.scope_details.consentId"/>
    </div>
    <div class="form-group">
        <label for="throttlingPolicy">Throttling Policy</label>
        <select class="form-control" id="session" v-model="consent.scope_details.throttlingPolicy">
            <option v-for="throttlingPolicy in throttlingPolicies">{{throttlingPolicy}}</option>
        </select>
    </div>
</form>
`,
    data() {
        return {
            scopeGroupTypes: ['ais-accounts', 'ais', 'pis'],
            throttlingPolicies: ['psd2Regulatory'],
            scopes: ['ais-accounts', 'ais', 'pis']
        }
    },
    methods: {
        doAddPrivilege() {
            this.consent.scope_details.privilegeList.push({})
        },
        doDeletePrivilege(index) {
            this.consent.scope_details.privilegeList.splice(index, 1)
        }
    }
})

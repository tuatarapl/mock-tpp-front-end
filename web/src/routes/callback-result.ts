import Vue from 'vue'
import { RouteConfig } from 'vue-router'

export const callbackResult: RouteConfig = {
    name: 'callbackResult',
    path: '/callbackResult',
    component: Vue.extend({
        template: `
      <div class="container mt-3">
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a class="navbar-brand" href="#">TPP Front End</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="row>
          <div class="col-12>
            <div class="alert alert-success" role="alert">
                Welcome back - this window will close shortly.
            </div>
          </div>
        </div>
      </div>
      `,
      created() {
          setTimeout(() => window.close(), 3000)
      }
    })
}

# Vue.js BeHave tracking plugin

Client-side plugin providing a BeHave tracking interface for Vue.js based applications.

## Plugin API

#### Vue.js example


    import Vue from 'vue'
    import VueBehave from '@strg-behave/tracking-client-vue'
    
    // router and options definition...
    
    Vue.use(VueBehave, { router, options })

#### Nuxt.js example
    
    import Vue from 'vue'
    import VueBehave from '@strg-behave/tracking-client-vue'

    // options definition...
    
    export default ({ app: { router } }) => {
      Vue.use(VueBehave, { router, options })
    }



### Router

Router of your Vue.js application - required if you wish to track `URLs` and `referrers`. If not provided, URL and referrer tracking is automatically disabled.

### Options

Object with the following properties:
* `webSocket` - websocket entry point
* `urlTracking` - `true (default)` if you wish to track visited urls
* `referrerTracking` - `true (default)` if you wish to track referring urls

### Component Methods

Plugin exposes three tracking methods available in your components via the `$behave` property.
* `trackScrolling(vm, contentId)`
* `trackClicks(vm, contentId)`
* `trackView(vm, contentId)`

Where:
* `vm` - view model of the component
* `contentId` - unique string identifier of the component

Example:

    mounted () {
      this.$behave.trackClicks(this, 'component ID')
    },


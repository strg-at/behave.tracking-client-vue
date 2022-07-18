# Vue.js BeHave tracking plugin

Client-side plugin providing a BeHave tracking interface for Vue.js based applications.

## Installation

#### Vue.js setup


    import Vue from 'vue'
    import VueBehave from '@strg/behave-tracking-client-vue'
    
    // router and options definition...
    
    Vue.use(VueBehave, { router, options })

#### Nuxt.js setup
    
    import Vue from 'vue'
    import VueBehave from '@strg/behave-tracking-client-vue'

    // options definition...
    
    export default ({ app: { router } }) => {
      Vue.use(VueBehave, { router, options })
    }

### Router

Router of your Vue.js application - required if you wish to track `URLs` and `referrers`. If not provided, URL and referrer tracking is automatically disabled.

### Options

Object with the following properties:
* `debugMode` - logs events to console instead of using websocket
* `urlTracking` - enables / disables url tracking
* `referrerTracking` - enables / disables referrer tracking
* `eventKeyUrl`
* `eventKeyReferrer`
* `eventKeyClick`
* `eventKeyScroll`
* `eventKeyView`
* `config` - behave configuration object
    * `NAMESPACE`
    * `CLIENT_STORAGE_NAMESPACE`
    * `COOKIE_NAME`
    * `RECONNECT_TIMEOUT`
    * `ENDPOINT` - required if not in debug mode

The minimal required options look like this:

    const options = {
      config: {
        ENDPOINT: ''  // websocket endpoint
      },
    }

Or using the debug mode:

    const options = {
      debugMode: true
    }

#### Default Options 
User provided options object gets merged with the defaults during the plugin installation. These are the default values:

    {
        debugMode: false,
        urlTracking: true,
        referrerTracking: true,
        eventKeyUrl: 'url',
        eventKeyReferrer: 'referrer',
        eventKeyClick: 'click',
        eventKeyScroll: 'scroll',
        eventKeyView: 'view'
        config: {
            NAMESPACE: 'strgBeHave',
            CLIENT_STORAGE_NAMESPACE: 'strgBeHave',
            COOKIE_NAME: 'STRG.BeHaveOptOut',
            RECONNECT_TIMEOUT: 60000,
            ENDPOINT: null
        }
    }

# Usage

Plugin can track engagement in two ways:
* how user navigates the application
* how user interacts with specific elements on the page

## Navigation tracking

Starts automatically if `router` is provided. If you wish to disable either url or referrer tracking, you can do so via options' `urlTracking` and `referrerTracking` properties.

## Content Interactions

Plugin exposes three tracking methods available in your components via the `$behave` property.
* `trackScrolling(vm, eventKey, contentId)`
* `trackClicks(vm, eventKey, contentId)`
* `trackView(vm, eventKey, contentId)`

Where:
* `vm` - view model of the component
* `eventKey` - custom behave event key (optional - falls back to global plugin options)
* `contentId` - unique identifier of the content in question 

Example:

    mounted () {
      this.$behave.trackClicks(this, 'behave-recommendation-box-1234-teaser-click', 'product-1234')
    },

By having access to the view model of your components, plugin can properly unregister events by itself when components get destroyed. This means that as a consumer, you don't need to pollute your application's main logic with additional cleanup code.

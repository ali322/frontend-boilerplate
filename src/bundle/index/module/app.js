import Vue from 'vue/dist/vue'
import { mapState, mapActions } from 'vuex'
import template from './template/index.html'
import actions from './action.es6'

const Events = Vue.component('events', {
    methods: {
        ...mapActions(Object.keys(actions)),
        handleChange(e) {
            e && e.preventDefault()
            this.changeField({ name: "repo", value: e.target.value });
        },
        handleQuery() {
            this.fetchRepo({
                repo: this.repo
            })
        }
    },
    created() {
        this.handleQuery()
    },
    computed: {
        ...mapState({
            repo: state => state.index.repo,
            events: state => state.index.events,
            route: "route"
        })
    },
    template
})

export default Events
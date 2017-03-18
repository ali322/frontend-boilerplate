import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import template from './template/index.tpl'
import actions from './action.es6'

export const proto = {
    methods: {
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
        this.fetchRepo({ repo: this.repo })
    },
    template
}

const Events = Vue.component('events', {
    ...proto,
    methods: {
        ...proto.methods,
        ...mapActions(Object.keys(actions)),
    },
    computed: {
        ...proto.computed,
        ...mapState({
            repo: state => state.index.repo,
            events: state => state.index.events
        })
    }
})

export default Events

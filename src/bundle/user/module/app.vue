<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import actions from './action.es6'

export default Vue.component('user',{
    computed:{
        ...mapState({
            user:state=>state.user.user,
            route:"route"
        })
    },
    methods:{
        ...mapActions(Object.keys(actions)),
        goBack(){
            window.history.back()
        }
    },
    created(){
        this.fetchUser('yetti')
    }
})
</script>

<template>
<div class="common-container">
    <div class="panel panel-default">
    <div class="panel-heading common-header"><button class="back-button" @click="goBack()">&lt;</button>{{user.id}}</div>
    <div class="panel-body">
        <div class="user-title">
        <img :src="user.avatar_url" alt="" />
        <span>
        <p>{{user.login}}</p>
        <p>{{user.created_at}}</p>
        </span>
    </div>
    </div>
    </div>
</div>
</template>

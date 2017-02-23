<div class="common-container">
    <div class="panel panel-default">
        <div class="panel-heading">Github Events</div>
        <div class="panel-body">
            <div class="input-group">
                <input type="text" class="form-control" :value="repo" @input="handleChange" />
                <span class="input-group-addon" @click="handleQuery"><i class="fa fa-search" /></span>
            </div>
        </div>
        <div class="events">
            <div class="event" v-for="event in events" key={event.id}>
                <div class="event-title">
                    <img :src="event.actor.avatar_url" alt="" />
                    <span>
                    <p><router-link :to="`/user/${event.actor.display_login}`">{{event.actor.display_login}}</router-link></p>
                    <p>{{event.created_at}}</p>
                    </span>
                </div>
                <p>{{event.type.replace('Event','').toLowerCase()}} In <b>{{event.repo.name}}</b></p>
            </div>
        </div>
    </div>
</div>

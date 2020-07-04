<template>
    <b-card>
        <b-card-title class="text-primary">
            {{post.title}}
        </b-card-title>
        <b-card-text>
            {{post.body}}
        </b-card-text>
        <small class="text-muted">{{post.userName}}</small>
    </b-card>
</template>

<script>
export default {
    props: {
        post: {
            required: true,
            type: Object
        }
    }
}
</script>
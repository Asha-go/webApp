<template>
    <div class="service-detail">
        <h1>{{detail.title}}</h1>
        <div> {{detail.location}}</div>
        <div> {{detail.price}}</div>
        <img :src="detail.image" alt="">
        <div >{{detail.desc}}</div>
    </div>
</template>
<script>
export default {
    layout(context) {
      return context.isMobile ? "h5" : "default";
    },
    created() {
        console.log(this.$route.params.id, 'paramsx---id');
    },
    data() {
        return {
            detail: {
                title: 'chinese teacher',
                location: '',
                price: '444/hr',
                image: '//',
                desc: ''
            },
            
        }
    },
    methods: {
        
    }
}
</script>
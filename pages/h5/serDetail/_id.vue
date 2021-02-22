<template>
    <div class="service-detail">
        <h1>{{detail.title}}</h1>
        <div> {{detail.location}}</div>
        <div> {{detail.price}}</div>
        <img :src="detail.image" alt="">
        <div v-html="detail.desc"></div>
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
                location: 'shang Hai',
                price: '444/hr',
                image: '//ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20Website%201.0/Articles/Language/movies%20to%20learn%20chinese/%E5%8E%9F%E5%9B%BE7.jpg',
                desc: 'Watching movies is one of the best ways to improve your Chinese language and your understanding of Chinese history and culture. Luckily, there is a plethora of excellent Chinese films to choose from ranging from comedies, historical dramas to action-packed thrillers. We’ve selected some of the best lesser known Chinese films for you to browse. Are we missing your favourite Chinese film? Let us know in the comment section below! '
            },

        }
    },
    methods: {

    }
}
</script>

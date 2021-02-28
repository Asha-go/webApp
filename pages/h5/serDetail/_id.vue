<template>
    <div class="service-detail">
        <h1 class="title">{{detail.title}}</h1>
        <div class="desc">
            <span>
                <van-icon name="location-o" size="1rem" />
                {{detail.location}}
            </span>
            <span>
                <van-icon name="cashier-o" />
                online
            </span>
            <span>
                <van-icon name="gold-coin-o" />
                {{detail.price}}
            </span>
        </div>
        <!-- <img :src="detail.image" alt=""> -->
        <div v-html="detail.desc"></div>
        <span class="submit" @click="showSubmit">
            <van-icon name="cart-o" size="2rem"/>
        </span>
        <van-dialog v-model="submitShow" title="Book Now" :show-cancel-button="false" :showConfirmButton="false">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="order.when"
                    name="when"
                    placeholder="When do you want this service?"
                    :rules="[{ required: true, message: 'When do you want this service' }]"
                />
                <van-field
                    v-model="order.where"
                    name="where"
                    placeholder="Where do you want this service?"
                    :rules="[{ required: true, message: 'Where do you want this service' }]"
                />

                <van-field
                    v-model="order.msg"
                    name="msg"
                    placeholder="Message for service provider:"
                    :rules="[{ required: true, message: 'Message for service provider' }]"
                />

                <van-field
                    v-model="order.email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    :rules="[{ required: true, message: 'Your email address' }]"
                />

                <van-field
                    v-model="order.phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    :rules="[{ required: true, message: 'Your phone number' }]"
                />

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
            <van-calendar v-model="dateShow" @confirm="calendarConfirm" />
            <!-- <van-datetime-picker
                :show= "dateShow"
                v-model="order.when"
                type="date"
                title="please"
                :min-date="minDate"
            /> -->
            
        </van-dialog>
        <van-notify v-model="msgShow" type="success">
                <van-icon name="bell" style="margin-right: 4px;" />
                <span>Thank you for booking with Asha Go. We will get back to you shortly!</span>
        </van-notify>
    </div>
</template>
<script>
export default {
    layout(context) {
      return context.isMobile ? "h5" : "default";
    },
    created() {
        console.log(this.$route.params.id, 'paramsx---id');
        this.getData(this.$route.params.id);
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
            submitShow: false,
            order: {
                when: '',
                where: '',
                msg: '',
                email: '',
                phone: ''
            },
            minDate: new Date(),
            dateShow: false,
            msgShow: false,
        }
    },
    methods: {
        showSubmit() {
            this.submitShow = !this.submitShow;
        },
        onSubmit(values) {
            let that = this;
            this.submitShow = false;
            this.msgShow = true;
            setTimeout(() => {
                that.msgShow = false;
            }, 2000);
        },
        calendarConfirm(value) {
            this.order.when = this.formatDate(value);
        },
        formatDate (date) {
           return `${date.getMonth() + 1}/${date.getDate()}`     
        },
        getData(key, callback) {
            this.$Server({
                url: "/blog/get-blog-info",
                method: "post",
                data: {
                    blogId: key
                },
                transformRequest: [
                function(data) {
                    let ret = "";
                    for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        "=" +
                        encodeURIComponent(data[it]) +
                        "&";
                    }
                    ret = ret.substring(0, ret.lastIndexOf("&"));

                    return ret;
                }
                ],
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(res => {
                this.loadingFlag = false;
                this.latestData = res.data;
                this.latestRealatedBlog = res.dataList;
                // this.shareTitle = res.data.title;
                // this.shareDes = res.data.content.slice(0, 33);
                // this.shareImge = res.data.img;
                var initHTML = res.data.html;
                var reg = /width="([ ]*[0-9])\w+" height="([ ]*[0-9])\w+"/g; //
                this.detail.desc = initHTML.replace(
                    reg,
                    'width="100%" height="100%"'
                );
                this.detail.desc = this.detail.desc.replace( /How to get a taxi in China/, '')
                this.detail.title = res.data.title;
                this.tagList = res.data.tag.split(",");
            }).finally(() => {
                    this.loadingFlag = false;
                });
            }
    }
}
</script>
<style lang="less" scoped>
.service-detail {
    padding: 2rem;
    .title {
        font-size: 2rem;
        text-align: center;
    }
    .desc {
        padding: 1rem;
        text-align: center;
        span {
            margin-left: 1rem;
            display: inline-flex;
            vertical-align: top;
            i {
               margin-right: 0.5rem ;
            }
        }
    }
    .submit {
            position: fixed;
            width: 3rem;
            height: 3rem;
            right: 1.2rem;
            top: 60vh;
            border-radius: 1.5rem;
            background-color: #770e0e;
            color: #FFF;
            display: inline-flex;
            align-items: center;
            justify-content: center
    }
}
</style>

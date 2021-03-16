<template>
    <div class="service-detail">
        <h1 class="title">{{detail.title}}</h1>
        <div class="desc">
            <span>
                <van-icon name="location-o" size="1rem" />
                {{detail.location}}
            </span>
            <span v-if="detail.isOnlineSupport">
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
        <van-button round block class="submit-button" @click="showSubmit">Book Now</van-button>
        <span class="submit" @click="showSubmit">
            <icon-font type="iconorder"/>
            <!-- <van-icon name="cart-o" size="2rem"/> -->
        </span>
        <van-dialog
          v-model="submitShow"
          :closeOnClickOverlay="true"
          confirmButtonText="Confirm"
          confirmButtonColor="#8d040c"
          :showCancelButton="true"
          cancelButtonText="Cancel"
          @confirm= "onSubmit"
          >
          <template slot="title">
              Book Now
              <!-- <van-icon name="close" class="close" size="3em"/> -->
          </template>
            <van-form @submit="onSubmit">
              <van-field
                    v-model="order.name"
                    name="name"
                    placeholder="What is your name?"
                    :rules="[{ required: true}]"
                />
              <van-field
                    v-model="order.email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    :rules="[{ required: true}]"
                />
                <van-field
                    v-model="order.phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    :rules="[{ required: true}]"
                />
                <van-field
                    v-model="order.when"
                    name="when"
                    placeholder="When and where do you want this service?"
                    :rules="[{ required: true }]"
                />
                <!-- <van-field
                    v-model="order.where"
                    name="where"
                    placeholder="Where do you want this service?"
                    :rules="[{ required: true}]"
                /> -->

                <van-field
                    v-model="order.msg"
                    type="textarea"
                    name="msg"
                    placeholder="Message for service provider:"
                    :rules="[{ required: true }]"
                />


                <!-- <div>
                  <img src="/assets/img/call.jpg" alt="call">
                  Call service provider
                </div> -->
                <!-- <div style="margin: 16px;">
                    <van-button round block type="info"  class="submit-button" native-type="submit">Submit</van-button>
                </div> -->
            </van-form>
            <van-calendar v-model="dateShow" @confirm="calendarConfirm" />
        </van-dialog>
        <van-notify v-model="msgShow" type="success">
              <van-icon name="bell" style="margin-right: 4px;" />
              <span>Thank you for booking with Asha Go. We will get back to you shortly!</span>
        </van-notify>
    </div>
</template>
<script>
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2118142_g1bkk5tlukl.js',
});

export default {
    components: {
      IconFont,
    },
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
            this.$Server({
              url: "/service/submit",
              method: 'POST',
              data: {...this.order},
            }).then((res) => {

            })
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
                url: "/service/detail",
                method: "GET",
                params: {
                    serviceId: key
                }}).then(res => {
                this.loadingFlag = false;
                let serviceDetail = res.data.serviceDetail;
                var reg = /width="([ ]*[0-9])\w+" height="([ ]*[0-9])\w+"/g; //
                var initHTML = serviceDetail.detailHtml;
                this.detail.desc = initHTML.replace(
                    reg,
                    'width="100%" height="100%"'
                );
                this.detail.title = serviceDetail.title;
                this.detail.location = serviceDetail.location;
                this.detail.price = serviceDetail.price;
                this.detail.isOnlineSupport = serviceDetail.isOnlineSupport;
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
    .close {
      position: fixed;
      top: 0;
      right: 0;
    }
    .submit {
            position: fixed;
            width: 3rem;
            height: 3rem;
            right: 1.2rem;
            top: 60vh;
            border-radius: 1.5rem;
            background-color: #8d040c;
            color: #FFF;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            i {
               font-size: 2rem;
            }
    }
    .submit-button {
        color: #fff;
        background-color:#8d040c;
    }
}
</style>

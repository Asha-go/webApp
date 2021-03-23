<template>
  <div class="service-container">
    <span class="filter" v-if="mode.filters">
      <van-field
        readonly
        clickable
        :value="city"
        placeholder="City"
        @click="cityPicker = true"
      />
      <van-field
        readonly
        clickable
        :value="service"
        placeholder="All services"
        @click="serPicker = true"
      />
    </span>
    <van-popup v-model="cityPicker" round position="bottom">
        <van-picker
          show-toolbar
          defaultIndex="2"
          :columns="cityColumns"
          @cancel="cityPicker = false"
          @confirm="onCityConfirm"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
        />
    </van-popup>
    <van-popup v-model="serPicker" round position="bottom">
        <van-picker
          show-toolbar
          defaultIndex="2"
          :columns="serColumns"
          @cancel="serPicker = false"
          @confirm="onSerConfirm"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
        />
    </van-popup>

    <van-card
        v-for = "(item, index) in serData"
        :key = "index"
        :price="item.price"
        :title="item.title"
        :thumb="item.image"
        @click="book(item.serviceId)"
      >
        <template #desc>
          <div class="desc">
            {{item.desc}}
          </div>
        </template>
        <template #tags>
          <div class="tags">
            <span class="location">
              <van-icon name="location-o" size="1rem" />
              {{item.location}}
            </span>
            <span class="online">
              <van-icon name="tv-o" size="1rem"/>
              Also available online
            </span>
            <!-- <span class="price"> from $200/hr</span> -->
          </div>
        </template>
        <template #footer>
          <van-button size="mini"  type="danger">BOOK NOW</van-button>
        </template>
    </van-card>
  </div>
</template>
<script>
export default {

  layout(context) {
    return context.isMobile ? "h5" : "default";
  },
  props: {
    filters:{
      type: Boolean,
      default: true,
    },
    mode: {
      type: Object,
      default() {
        return {
          filters: true,
          hasData: false,
          data: {},
        }
      },
    }
  },
  computed: {
    serData() {
      if((typeof this.allData) == "object") {
        if(this.city == 'All' && this.service == 'All Services') {
          return this.allData;
        } else {
          return this.allData.filter((item) => {
            let cityOf = false;
            let categoryOf =  (this.service == 'All Services') || (item.category == this.service);
            if(this.city == 'Online') {
               cityOf = item.isOnlineSupport;
            } else {
               cityOf = (this.city == 'All') || (this.city == item.location);
            }
            if (cityOf  && categoryOf) {
              return true;
            }
            return false;
          });
        }
      }
    }
  },
  created() {
    if (!this.mode.hasData) {
      this.getData();
    } else {
      this.allData = this.mode.data;
      // this.serData = this.mode.data;
    }
    console.log(this.mode.data, '00-0-0000-', this.serData);
  },
  data() {
    return {
      cityPicker: false,
      serPicker: false,
      cityColumns: ['Online', 'All','Beijing', 'Shanghai', 'Shenzhen', 'Other'],
      city: 'All',
      serColumns : ['Business', 'Language', 'Travel', 'Daily Life', 'Other', 'All Services'],
      service: 'All Services',

      allData: [{
        desc: 'Mr. CEON Him is fluent in Mandarin, Cantonese, and Japanese. His specialities are law, diplomacy, and business areas. He welcomes beginner and intermediate learners.',
        title: 'chinese teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        serviceId: "test-1",
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.ssl.cdn.btime.com%2Ft0171d94306911f7313.jpg&refer=http%3A%2F%2Fp2.ssl.cdn.btime.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617181861&t=202f0599517a257e1d9bbfd6718768f2'
      }]
    };
  },
  methods: {
    getData() {
      this.$Server({
        url: "/service/list",
        methods: "GET",
      }).then((res) => {
        this.allData = res.data.serviceList;
        // this.serData = this.allData;
        console.log(res, 'res----getData');
      })
    },
    onCityConfirm(value) {
      this.city = value;
      this.cityPicker = false;
    },
    onSerConfirm(value) {
      this.service = value;
      this.serPicker = false;
    },
    book(id) {
      this.$router.push('/h5/serDetail/' + id);
    }
  },
};
</script>
<style lang="less" scoped>
.service-container {
  line-height: normal;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  // color: #990000;
  padding: 2rem;
  text-align: left;
  .van-card {
    padding: 0px;
  }
  .title {
    color: #990000;
    font-size: 1.4rem;
    text-align: center;
  }
  .tags {
    // color: #730e6fcc;
    font-size: medium;
    margin-top: 1rem;
    .location {
      display: block;
      margin-bottom:0.5rem;
    }
    .online {
      display: block;
      margin-bottom:0.5rem;
    }
  }
  .filter {
    display: flex;
    padding-bottom: 1.2rem;
    .van-cell--clickable {
      border: 0.1rem solid #970505;
      margin-right: 1rem;
      border-radius: 0.2rem;
    }
  }
  .text {
    margin-top: 2rem;
    line-height: 2.2rem;
    p {
      margin-bottom: 1rem;
    }
  }
  .van-card__thumb {
    height: auto;
    width: 10rem;
  }
  .van-card__content {
    padding-left: 0.8rem;
  }
  .van-card__title {
    // font-size: 2rem;
    font-size: medium;
    margin-bottom: 0.5rem;
    line-height: normal;
    color: #8d040d;
    max-height: 3.2rem;
    overflow: visible;
  }
  .van-button--danger {
    background-color:#8d040d ;
    border: 1px solid #8d040d;
  }
  .van-card__price {
    // font-size: 1.8rem;
    .van-card__price-currency {
      display: none;
    }
    .van-card__price-integer {
      // font-size: 1.8rem;
    }
  }
  .desc {
    // margin:0.3rem 0 0.3rem;
    // color: #736c6c;
    // font-size: 1.5rem;
    min-height: 5rem;
    max-height: 10rem;
    overflow: hidden;
    text-align: left;
    font-size: small;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>

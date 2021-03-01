<template>
  <div class="service-container">
    <span class="filter">
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
          :columns="cityColumns"
          @cancel="cityPicker = false"
          @confirm="onCityConfirm"
        />
    </van-popup>
    <van-popup v-model="serPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="serColumns"
          @cancel="serPicker = false"
          @confirm="onSerConfirm"
        />
    </van-popup>

    <van-card
        v-for = "(item, index) in serData"
        :key = "index"
        :price="item.price"
        :title="item.title"
        :thumb="item.image"
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
          <van-button size="mini" @click="book(item.id)" type="danger">BOOK NOW</van-button>
        </template>
    </van-card>
  </div>
</template>
<script>
export default {
  layout(context) {
    return context.isMobile ? "h5" : "default";
  },
  data() {
    return {
      cityPicker: false,
      serPicker: false,
      cityColumns: ['Shen Zhen', 'Shang hai', 'Bei Jing', 'Hong Kong'],
      city: 'CITY',
      serColumns : ['online', 'underline'],
      service: 'All Services',
      serData: [{
        desc: 'Brief information about service provider and service xxxxxxxxxxxxx, test...very good',
        title: 'chinese teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "fe222",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        desc: 'Brief information about service provider and service xxxxxxxxxxxxx, test...very good',
        title: 'chinese teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "fe222",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }, {
        desc: 'Brief information about service provider and service xxxxxxxxxxxxx, test...very good',
        title: 'chinese teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "fe222",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }]
    };
  },
  methods: {
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #990000;
  padding: 2rem;
  .title {
    color: #990000;
    font-size: 2rem;
    text-align: center;
  }
  .tags {
    color: #730e6fcc;
    font-size: 1.2rem;
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
  }
  .van-card__title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    line-height: normal
  }
  .van-card__price {
    font-size: 1.8rem;
    .van-card__price-integer {
      font-size: 1.8rem;
    }
  }
  .desc {
    margin:0.3rem 0 0.3rem;
    color: #736c6c;
    font-size: 1.5rem;
    min-height: 7rem;
  }
}
</style>

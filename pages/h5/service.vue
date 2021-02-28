<template>
  <div class="service-container">
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
    <van-popup v-model="cityPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="cityColumns"
          @cancel="cityPicker = false"
          @confirm="onConfirm"
        />
    </van-popup>
    <van-popup v-model="serPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="serColumns"
          @cancel="serPicker = false"
          @confirm="onConfirm"
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
        title: 'china teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "504382666264846336",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        desc: 'Brief information about service provider and service xxxxxxxxxxxxx, test...very good',
        title: 'china teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "504382666264846336",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }, {
        desc: 'Brief information about service provider and service xxxxxxxxxxxxx, test...very good',
        title: 'china teacher',
        price: 'from 200/hr',
        location: 'Shen Zhen',
        id: "504382666264846336",
        image: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }]
    };
  },
  methods: {
    onConfirm(value) {
      this.city = value;
      this.showPicker = false;
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
  .text {
    margin-top: 2rem;
    line-height: 2.2rem;
    p {
      margin-bottom: 1rem;
    }
  }
  .van-card__titl {
    font-size: 1.5rem;
  }
  .location {
    color: #730e6fcc;
  }
  .desc {
    margin:0.3rem 0 0.3rem;
    color: #736c6c;
    font-size: 1.2rem;
  }
}
</style>

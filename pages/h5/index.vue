<template>
  <div class="h5-container">
    <span class="conent">
      <div class="desc">ASHA GO</div>
      <div class="desc">Your China Platform</div>
      <div class="desc remark">Life in China should be easy and exciting</div>
      <span class="search">
        <a-input-search class="search-input" placeholder="Search for articles and services" v-model="keywords" @search="search"  size="large"/>
        <a-radio-group v-model="searchType"  class="search-type">
          <a-radio :value="0">All</a-radio>
          <a-radio :value="1">Article</a-radio>
          <a-radio :value="2">Service</a-radio>
        </a-radio-group>
      </span>
    </span>
    <div class="city-container">
      <a-card hoverable :bordered="false" class="card-city" v-for="(item, index) in cityData" :key="'city'+ index" @click="search(item.name, 'city')">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
      </a-card>
     </div>
    <a-divider class="categoryTitle"> Featured Articles</a-divider>
    <div class="article-list" :bordered="false" >
       <div
          v-infinite-scroll="handleInfiniteOnLoad"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10">
          <a-card :bordered="false" class="card-container">
              <a-list size="large" :bordered="false">
                <a-list-item v-for="(item, index) in recentData" :key="'lastest'+ index" @click="goDetail(item.blogId)">
                  <div class="listcover">
                    <img
                      shape="square"
                      v-bind:src="item.cover"
                    >
                  </div>
                  <a-list-item-meta>
                    <a slot="title"></a>
                  </a-list-item-meta>
                  <a class="categoryContent">
                    <a-list itemLayout="vertical">
                      <a-list-item >
                        <a-list-item-meta v-bind:title="item.title">
                          <div slot="description">
                            <a-tag
                              v-for="(tagName, tagIndex) in item.tagList"
                              :key="'lastest'+ tagIndex"
                            >{{tagName}}</a-tag>
                          </div>
                        </a-list-item-meta>
                        <div class="content">
                          <div
                            class="detail"
                            max-width="9%;"
                            style="word-break:break-all;"
                          >{{item.content.substring(0,200)}}...</div>
                          <div class="author">
                            <a-avatar
                              style="margin:10px;"
                              size="small"
                              v-bind:src="item.avatar"
                            />
                            {{item.author}}
                            <a-divider type="vertical"/>
                            {{item.time}} read
                          </div>
                        </div>
                        <span slot="actions">
                          <a-icon style="margin-right: 8px" type="heart-o"/>
                          {{item.likes}}
                        </span>
                        <span slot="actions">
                          <a-icon style="margin-right: 8px" type="message"/>
                          {{item.comment}}
                        </span>
                      </a-list-item>
                    </a-list>
                  </a>
                </a-list-item>
              </a-list>
              <van-button class="more" @click="goMore()">Read More</van-button>
          </a-card>
        </div>
      </div>
    <a-divider class="categoryTitle"> Featured Services</a-divider>
    <service></service>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = '../assets/img/bg';
import Footer from './footer.vue';
import Service from './service.vue';
export default {
  components: {
    Footer,
    Service
  },
  computed: {
  },
  layout: 'h5',
  asyncData(context) {
     if (!context.isMobile) {
       context.redirect('/');
     }
  },
  data() {
    return {
      baseUrl,
      keywords: '',
      recentData: [],
      loading: false,
      busy: false,
      index: 0,
      active: 0,
      searchType: 0,
      swiperOptions: {
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 10,
          effect: 'fade',
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
            }
          },
        },
        bannerData: [],

        cityData: [
          {name: 'All China', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0216.JPG'},
          {name: 'Beijing', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0214.JPG'},
          {name: 'Shanghai', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0213.JPG'},
          {name: 'Shenzhen', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0215.JPG'},
          {name: 'Hong Kong', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0212.JPG'},
        ]
    }
  },
  mounted() {
    // 初始化fbjssdk
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '2816565075139161',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v7.0'
      });
    };
    console.log('fbAsync----')
    window.fbAsyncInit();
    console.log('Current Swiper instance object', this.swiper)
  },
  created() {
    this.getRecentData(0);
  },

  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
    goMore() {
      this.recentData = this.recentData.concat(this.allData.splice(0,3));
      // this.index++;
      // this.$router.push('/article/search?city=All China');
    },
    getRecentData(index) {
      this.$Server({
        methods: "GET",
        url: "/blog/get-recent-blog",
        params: {
          index: index || 0
        }
      }).then((res) => {
          if(res.code === '0'){
          res.data.recentBlogs.forEach(item => {
            item.tagList = item.tags.split(',') || ['tag1', '我热门呀', 'tag3', 'tag4']
            item.content = item.content || '暂时文章没数据, 我来充充数我来充充数我来充充数我来充充数我来充充数充充数充充数充充数'
          });
          this.allData = res.data.recentBlogs;
          this.recentData = this.recentData.concat(this.allData.splice(0,3));
          this.index = 1;
        }
      });
    },
    handleInfiniteOnLoad() {
      // this.getRecentData(this.index + 1);
    },
    getRecommend() {
      this.$Server({
        method: "GET",
        url: "/recommend/list"
      }).then((res) => {
        if(res.code === '0'){
          this.bannerData = res.data.recommendList;
        }
      });
    },
    search(value, type) {
      let query = {};
      if (type == 'city') {
          query = {
            city : value
          }
      } else {
        query = {
          keywords: value,
          searchType: this.searchType
        }
      }
      this.$router.push({
        path: '/article/search',
        query: query
      })
    },
    goDetail(blogId) {
      this.$router.push({
        path: '/blog/detail',
        query: {
          blogId: blogId
      }});
    },
    logout () {
      Cookie.remove('_t');
      this.$store.commit('setToken', null);
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped lang="less">
.h5-container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  .service-container {
    padding: 1rem 2rem;
  }
  .van-tabbar {
    display: flex;
    justify-content: space-around;
    height: 6vh;
    .tab-item {
      color: #000;
      padding-top: 0.4rem;
      .van-tabbar-item__text {
        font-size: 1.2rem;
      }
    }
  }
  .van-tabbar-item--active {
    color: #8D050B;
    .tab-item {
      color: #8D050B;
    }
  }
  .conent {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 92vh;
    text-align: center;
    color: #fff;
    background: url("../../assets/img/phone-index1.jpeg") center;
    background-size: cover;
    padding: 25vh 0;
    .search {
      display: inline-block;
      width: 80%;
      margin-top: 1rem;
      text-align: center;
      .search-type {
        color: #fff;
        .ant-radio-wrapper {
          color: #fff;
        }
      }
      .search-input{
        margin: 1rem 0 1.5rem;
        display: inline-block;
      }
    }
    .desc {
      display: block;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem ;
    }
    .remark {
      font-size: 1.5rem;
      font-weight: 500;
    }

  }
  .more {
    font-size: 1.2rem;
    background-color: #96141b;
    color: #fff;
    font-weight: 700;
  }
  .ant-divider-inner-text {
    margin: 26px 0px;
  }
  .city-container {
    display: flex;
    margin-top: 1.3rem;
    margin-bottom: 25px;
    justify-content: space-around;
    flex-wrap: wrap;
    .card-city {
      &:nth-child(5) {
        margin-left: -6.2rem ;
      }
    }
    .card-img  {
      width: 10rem;
      height: 10rem;
    }
  }
  .card-container {
      min-width: 16rem;
      .list-cover {
        img {
          width: 30rem;
          margin: -10px 0;
        }
      }
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
          justify-content: center;
        }
      }
      .content {
        .detail {
          word-break: normal !important;
        }
      }
  }
  .category {
    position: relative;
    .categoryTitle {
      margin-bottom: 28px;
      font-size: 2.3rem;
      cursor: pointer;
      a {
        color: #000;
      }
    }
    .more {
        position:absolute;
        bottom: 10px;
        right: 40px;
    }
    .card-container {
      padding: 1rem;
      min-width: 160px;
      margin-left: 1.2rem;
      display: flex;
      justify-content: space-around;
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
        }
      }
      .ant-list-item-meta-title {
        font-size: 1.5rem;
      }
      .ant-card {
          border-radius: 15px;
      }
      .card {
        margin-bottom: 50px;
        width: 360px;
        .card-img {
          width: 358px;
          height: 238px;
        }
        .ant-card-cover img {
          border-radius: 15px 15px 0 0;
        }
      }
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
        }
      }
    }
  }
  .article-list {
    .ant-list {
      text-align: left;
    }
    .listcover {
      padding-right: 30px;
      @media (max-width: 992px) {
        padding: 0px;
      }
      img {
        height: 200px;
        margin: -10px 0;
        @media (max-width: 992px) {
          height: 100%;
          width: 100%;
        }
      }
    }
    .extra {
      width: 272px;
      height: 1px;
    }
    .content {
      margin-top: 0px;
    }
    .tag-btn {
      margin-right: 10px;
    }
    .tag-list {
      margin-bottom: 5%;
    }
    .cover {
      margin-left: 10%;
    }
    .exception {
      align-items: center;
      text-align: center;
      margin-bottom: 3%;
      .img {
        @media (max-width: 992px) {
          width: 100%;
          padding: 0;
        }
        display: inline-block;
        padding-right: 52px;
        zoom: 1;
        img {
          height: 360px;
          max-width: 430px;
        }
      }
      .content {
        display: inline-block;
        width: 35%;
        text-align: left;
        @media (max-width: 992px) {
          width: 100%;
          padding: 3rem;
          padding-bottom: 0;
        }
        h1 {
          color: #434e59;
          font-size: 60px;
          font-weight: 600;
          line-height: 60px;
          margin-bottom: 24px;
        }
        p {
          font-size: 18px;
          line-height: 20px;
          margin-bottom: 24px;
          text-align: left;
        }
        .desc {
          color: rgba(0, 0, 0, 0.45);
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 16px;
        }
      }
    }
    .articlelist {
      padding: 24px;
      margin: 0px 15%;
      @media (max-width: 992px) {
        padding: 0px;
        margin: 0px;
      }
    }
  }
  .ant-carousel  .slick-dots {
    height: auto;
  }
  .ant-carousel  .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    img {
      border: 5px solid #fff;
      display: block;
      margin: auto;
      max-width: 80%;
    }
  }
  .ant-carousel  .slick-thumb {
    bottom: -45px;
  }
  .ant-carousel  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .ant-carousel  .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }
  .ant-carousel  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
  .swiper {
    width: 100%;
    // height: 400px;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
      .text {
        // -webkit-text-stroke: 1px #502626;
        text-shadow: 2px 2px #423a3a;
        // text-stroke: 1px #502626;
        position: absolute;
        top: 80%;
        color: white;
        font-size: 27px;
        width: 40%;
        left: 5%;
        line-height: 20px;
        text-align: left;
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
}
</style>

<template>
  <div class="h5">
      <div class="h5-header">
        <div class="menu-container">
            <van-icon class="menu" size="6vh" name="wap-nav" @click="showPopup"/>
            <a href="/h5" class="header-logo">
             <img  class="header-logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
            </a>
            <span class="login">
              <a-button @click="signHandler" v-show="!loginFlag" class="button">Login</a-button>
              <span v-show="!!loginFlag">
                <!-- <a-avatar :src="$store.state.userInfo.avatar || avatarImg" @click="goInfo"></a-avatar> -->
                <!-- <span class="user-name">{{$store.state.userInfo.userName || userName}}</span> -->
                <icon-font type="iconexit" class="logout-icon" @click="logoutHandler"/>
              </span>
            </span>
            <van-popup v-model="show" position="top left" class="popup">
              <nuxt-link to="/h5" class="menu-item" @click.native="menuHandler">
                <a-icon type="home" class="icon"/> Home
              </nuxt-link>
              <nuxt-link to="/h5/service" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconicon_service" class="icon"/>Services
              </nuxt-link>
              <nuxt-link to="/category/daily?category=daily" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconDaily" /> Daily Life
              </nuxt-link>
              <nuxt-link to="/category/food?category=food" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconfood" class="icon"/>Food & Drinks
              </nuxt-link>
              <nuxt-link to="/category/travel?category=travel" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconfeiji" class="icon"/>Travel
              </nuxt-link>
              <nuxt-link to="/category/language?category=language" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconlanguage" class="icon"/>Language
              </nuxt-link>
              <!-- <nuxt-link to="/community" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconcommunity" class="icon"/>Community
              </nuxt-link> -->
              <nuxt-link to="/aboutUs" class="menu-item" @click.native="menuHandler">
                <icon-font type="iconwoshou" class="icon"/>About Us
              </nuxt-link>
            </van-popup>
            <van-tabbar  v-show="barDisplay" safe-area-inset-bottom v-model="barActive">
              <nuxt-link to="/h5" class="tab-item">
                <van-tabbar-item icon="home-o">Home</van-tabbar-item>
              </nuxt-link>
              <nuxt-link to="/article/search" class="tab-item">
                <van-tabbar-item icon="search">Search</van-tabbar-item>
              </nuxt-link>
              <nuxt-link to="/contactUs" class="tab-item">
                <van-tabbar-item icon="shop-collect-o">Contact Us</van-tabbar-item>
              </nuxt-link>
              <nuxt-link to="/h5/my" class="tab-item">
                <van-tabbar-item icon="contact">Me</van-tabbar-item>
              </nuxt-link>
            </van-tabbar>
        </div>
          <!-- <a-input-search class ='search' placeholder="search" v-model="searchValue" enter-button @search="onSearch" @pressEnter="onSearch"/> -->
      </div>
      <div class="container" >
        <Nuxt />
      </div>
      <div class="h5-fotter" v-show="footer">
        <view>
          <nuxt-link :to="item.link" class="menu-item" v-for="(item, index) in footData" :key="index">
            <van-cell :title="item.text"  is-link/>
          </nuxt-link>
          <div class="copyright">Copyright © 2020 Asha Go Inc. All rights reserved.</div>
        </view>
      </div>
  </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2118142_yslhzn63kn.js',
});
export default {
   components: {
    IconFont,
  },
  watch: {
      '$route.path' (val, oldval) {
        if (['/h5', '/h5/'].indexOf(this.$route.path ) == -1) {
            this.footer = false;
        } else {
            this.footer = true;
        }
      }
  },
  data() {
    return {
      shareImge: require('~/assets/img/shareImage.jpg'),
      barDisplay: true,
      searchValue: '',
      barActive: 0,
      avatarImg: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
      userName: '',
      loginFlag: false,
      mobile: false,
      show: false,
      list: ['Daily Life', 'Food & Drinks', 'Travel', 'Language', 'Community', 'Service', 'About Us'],
      loading: false,
      finished: false,
      footer: true,
      footData: [
        {
          text: '我们是谁 Who we are',
          link: '/aboutUs'
        },
        {
          text: '商业合作 Business inquiries',
          link: '/contactUs'
        },
        {
          text: '投稿 Write for us',
          link: '/contactUs'
        },
        {
          text: '用户协议 User agreement',
          link: '/agreement'
        },
      ]
    }
  },
  created() {
    if (['/h5', '/h5/'].indexOf(this.$route.path ) == -1) {
          this.footer = false;
      } else {
          this.footer = true;
      };
  },
  mounted() {
    wx && wx.ready(function() {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: 'Asha Go: Your China Platform', // 分享标题
            desc: 'We aim to make your life in China easy and exciting', // 分享描述
            imgUrl: '//www.ashago.com/_nuxt/img/Asha-Go-dark-circle-logo-no-text.9850928.png', // 分享图标
            success: function () {
              // 设置成功
              console.log('updateAppMessageShareData--wx');
            }
          });
          wx.updateTimelineShareData({
            title: 'Asha Go: Your China Platform', // 分享标题
            imgUrl: '//www.ashago.com/_nuxt/img/Asha-Go-dark-circle-logo-no-text.9850928.png',
            success: function () {
              // 设置成功
              console.log('updateTimelineShareData--wx');
            }
          });
        });
    if(this.$store.state.token){
        this.getUserInfo();
        this.loginFlag = true;
    } else {
      this.loginFlag = false;
    }
  },
  methods:{
    goHome() {
      this.$router.push('/');
    },
    showPopup () {
      this.show = true;
    },
    menuHandler() {
      this.show = false;
    },
    signHandler() {
      this.$router.push('/login');
    },
    logoutHandler() {
      // 清空登陆态
      // this.$router.push('/login');
      this.loginFlag = false;
      Cookie.set('_t', '');
      Cookie.set('userId', '');
      this.$store.commit('setToken', '');
      this.$store.commit('setUserId', '');
      console.log('logout', 'success');
    },
    goInfo() {
      this.$router.push('/my');
    },
    getUserInfo() {
      this.$Server({
          url: '/user/profile',
          method: 'get',
          params: {
            userId: this.$store.state.userId || '',
          }
        }).then(res => {
          if (res.code == 0) {
            // 设置全局个人信息
            this.$store.commit('setUserInfo', res.data)
          }
        }).finally(data => {
          this.loading = false;
        });
    },
    onSearch() {
      this.$router.push({ path: '/article/search',  query: {
        keyWord: this.searchValue
      }});
    }
  }
}
</script>

<style lang="less">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.h5 {
  .h5-header {
  .menu-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #96141b;
  color: #fff;
  .header-logo {
    margin: 0 auto;
    height: 6rem;
  }
  .van-popup--top {
    width: auto;
  }
  .logout-icon {
     font-size: 4rem;
  }
  .icon {
    margin-right: 0.5rem;
  }
  .menu {
    a:hover {
      color: #ccc;
    }
    position: absolute;
    left: 2rem
  }
  .login{
    position: absolute;
    right: 0.5rem;
    color: #fff;
    .button {
      background: #96141b;
      color: #fff
    }
  }
  .popup {
    background-color: #96141b;
    height: 100%;
  }
  .menu-item {
    margin: 0 20px;
    color: #fff;
    width: 100%;
    display: block;
    font-size: 1.5rem;
    line-height: 6rem
  }
}
}

.container {
    display: block;
    overflow: hidden;
    padding-bottom: 58px;
}

.h5-fotter {
  // margin-top: -6rem;
  padding-bottom: 6rem;
  color: #fff;
  background-color: #96141b;
  .van-cell {
    background-color: #96141b;
    color: #fff;
  }
  .copyright {
    text-align: center;
    vertical-align: middle;
    line-height: 5rem
  }
}
  .van-tabbar {
    display: flex;
    justify-content: space-around;
    // height: 6vh;
    .tab-item {
      color: #000;
      padding: 0.4rem;
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
}

</style>

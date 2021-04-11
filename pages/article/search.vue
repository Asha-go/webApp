<template>
  <div>
    <div class="page-search">
     <div class="search">
      <a-input-search placeholder="search" v-model="keywords" @search="onSearch" size="large"/>
      <a-radio-group v-model="searchType"  class="search-type">
          <a-radio :value="0">All</a-radio>
          <a-radio :value="1">Article</a-radio>
          <a-radio :value="2">Service</a-radio>
      </a-radio-group>
     </div>
      <client-only>
        <div class="article-list" :bordered="false" v-show="articleList.length != 0">
          <a-card :bordered="false" class="card-container">
            <a-list
              size="large"
              :bordered="false"
              :pagination="pagination"
            >
              <a-list-item :key="i" v-for="(item, i) in articleList" @click="goDetail(item.blogId)">
                <div class="listcover">
                  <img style="height: 230px; margin: -10px 0" shape="square" :src="item.img" />
                </div>
                <a-list-item-meta>
                  <a slot="title"></a>
                </a-list-item-meta>

                <a class="categoryContent" href="#">
                  <a-list itemLayout="vertical">
                    <a-list-item>
                      <a-list-item-meta :title="item.title">
                        <div slot="description">
                          <a-tag :key="index + 's'" v-for="(it, index) in item.tags" >{{it}}</a-tag>
                        </div>
                      </a-list-item-meta>
                      <div class="content">
                        <div
                          class="detail"
                          max-width="9%;"
                        >{{item.content}}</div>
                        <div class="author">
                          <a-avatar
                            style="margin:10px;"
                            size="small"
                            :src="item.avatar"
                          />{{item.author}}
                          <a-divider type="vertical" />
                          <!-- <em>{{item.date}}</em> -->
                        </div>
                      </div>
                      <span slot="actions">
                        <a-icon style="margin-right: 8px" type="heart-o" />
                        {{item.likes}}
                      </span>
                      <span slot="actions">
                        <a-icon style="margin-right: 8px" type="message" />
                        {{item.comment}}
                      </span>
                    </a-list-item>
                  </a-list>
                </a>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </client-only>
    <service v-if="!loadingFlag" :mode="serviceMode"></service>
    </div>
    <van-tabbar  v-if="isMoblie">
      <nuxt-link to="/h5" class="tab-item">
        <van-tabbar-item icon="home-o">Home</van-tabbar-item>
      </nuxt-link>
      <nuxt-link to="/article/search" class="tab-item">
        <van-tabbar-item icon="search">search</van-tabbar-item>
      </nuxt-link>
      <nuxt-link to="/contactUs" class="tab-item">
        <van-tabbar-item icon="shop-collect-o">concat us</van-tabbar-item>
      </nuxt-link>
      <nuxt-link to="/h5/my" class="tab-item">
        <van-tabbar-item icon="contact">me</van-tabbar-item>
      </nuxt-link>
    </van-tabbar>
  </div>
</template>
<script>
import Service from '../h5/service.vue';

export default {
    mixins: [],
    components: {
      Service
    },
    layout(context) {
      return context.isMobile ? 'h5' : 'default';
    },
    data() {
        return {
            isMoblie: false,
            keywords: '',
            city: '',
            loading: false,
            articleList: [{
                img: '/assets/img/blog-details/1.jpg',
                avator: '',
                title: 'BeiJing BeiJing BeiJing',
                content: 'This is your blog post. To really engage your site visitors we suggest you blog about subjects that are related to your site or business. Blogging is really great for SEO, so we recommend including keywords that relate to your',
                tag: ['Foods', 'Travel'],
                date: '2020-01-21',
                author: 'Jemma Admin',
                comment: '46',
                likes: '31'
            }],
            pagination: {
              showQuickJumper: true,
              pageSize: 10,
              total: 1,
              onChange: page => this.getData(page)
          },
          searchType:  0,
          serviceMode: {
            filters: false,
            hasData: true,
            data: {}
          },
          loadingFlag: true
        }
    },
    created() {
        this.keywords = this.$route.query.keywords || '';
        this.city =  this.$route.query.city || '';
        this.searchType = this.$route.query.searchType || 0;
        this.getData();
        console.log('created---', this.$route.query.searchType);
    },
    watch: {
      '$route.query' (val, oldval) {
        this.keywords = val.keywords;
        this.getData();
      }
    },
    methods:{
        onSearch() {
            this.getData();
        },
        goDetail(blogId){
          this.$router.push({
            path: '/blog/detail',
            query: {
              blogId: blogId
            }
          })
        },
        getData(page) {
            let url = '/search/all';
            let keywords = 'all';
            if (this.city) {
              keywords = "city:" + this.city;
              this.keywords && (keywords = keywords + " AND title:" + this.keywords);
            } else {
              keywords = this.keywords;
            }
            this.loadingFlag = true;
            // /search/all?keywords=* 搜索全部
            // /search/service?keywords=* 搜服务
            // /search/article?keywords=* 搜文章
             if (this.searchType == 0) {
                url = '/search/all';
             } else if(this.searchType == 2) {
                url = '/search/service';
             } else if(this.searchType == 1) {
                url = '/search/article';
             }

             this.$Server({
                url: url,
                method: 'GET',
                params: {
                  keywords: keywords
                }
              }).then((res) => {
                this.articleList = res.data.articleList || [];
                this.$set(this.serviceMode, 'data',res.data.serviceList);
                console.log(this.serviceMode.data, 'data---');
                this.pagination.total = this.articleList.length;
              }).finally(() => {
                this.loadingFlag = false;
              })
        }
    }
}
</script>
 <style scoped lang="less">
.page-search {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .search {
    width: 100%;
    height: 400px;
    text-align: center;
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url("../../assets/img/search.jpg");
    background-size: cover;
    .ant-input-affix-wrapper {
      margin-top: -10%;
      width: 40%;
    }
  }
  .card-container {
      min-width: 16rem;
      max-width: 90%;
      margin: 0 auto;
      .list-cover {
        img {
          width: 28rem;
          margin: -10px 0;
        }
      }
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
          justify-content: center;
        }
      }
  }
  .article-list {
       color: red;
      .ant-card-body {
         min-width: 160px;
      }
  }
  .listcover {
      padding-right: 30px;
  }
  .search-type {
      margin-top: 1rem;
   }
  @media screen and (max-width: 1024px) {
    .listcover {
      padding-right: 0px;
    }
    .search {
      background: url("../../assets/img/search-bg2.jpg");
      background-size: contain;
      flex-direction: column;
      .ant-input-affix-wrapper {
        width: 75%;
      }
      .search-type {
        margin-top: 1rem;
        .ant-radio-wrapper {
          color: #fff;
        }
      }
    }
  }
  .extra{
      width: 272px;
      height: 1px;
  }
  .content {
    margin-top: 0px;
    .detail {
      max-height: 120px;
      overflow: hidden;
      word-wrap:break-word;
    }
  }
}

</style>

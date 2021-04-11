<template>
  <div>
    <div class="container category-list">
      <div class="exception"> </div>
      <div class="filter">
        Services:
        <a-select  style="width: 120px" v-model="service">
            <a-select-option  v-for="(item, index) in serOptions" :key="'service' + index" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
        City:
        <a-select  style="width: 120px" v-model="city">
          <a-select-option  v-for="(item, index) in cityOptions" :key="'city' + index" :value="item">
            {{item}}
          </a-select-option>
        </a-select>
      </div>
      <client-only>
        <div class="articlelist" :bordered="false">
              <a-list size="large" :bordered="false">
                <a-list-item v-for="(item, index) in serData" :key="'lastest'+ index">
                  <div class="listcover" @click="goDetail(item.id)">
                    <img
                      shape="square"
                      :src="item.bigImage ||item.image "
                    >
                  </div>
                  <a-list-item-meta>
                    <a slot="title"></a>
                  </a-list-item-meta>
                    <a-list itemLayout="vertical">
                      <a-list-item>
                        <a-list-item-meta :title="item.title">
                          <div slot="description">
                            <span class="location icon-text">
                              <van-icon name="location-o" size="20px" />
                              {{item.city}}
                            </span>
                            <span class="online icon-text" v-if="!item.isOffLineSupport">
                              <van-icon name="tv-o" size="20px"/>
                              Also available online
                            </span>
                            <span class="price icon-text" >
                              <van-icon name="gold-coin-o" size="20px"/>
                              {{item.price}}
                            </span>
                          </div>
                        </a-list-item-meta>
                        <div class="content">
                          <div
                            class="detail"
                            max-width="9%;"
                            style="word-break:keep-all;"
                          >{{item.detailPlaintext.substring(0, 350)}}...
                          </div>
                        </div>
                        <span slot="actions">
                          <a-button  @click="book(item.id)" class="book">Book Now</a-button>
                        </span>
                      </a-list-item>
                    </a-list>
                </a-list-item>
              </a-list>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { HeartOutlined } from "@ant-design/icons";
const Cookie = process.client ? require("js-cookie") : undefined;
const latestData = [];
const tagList = [[]];
const allTagList = [];
export default {
  name: "CategoryList",
  props: ["type"],
  watch: {
    "$route.query"(newValue) {
      console.log(newValue, "Newvalue");
      this.loadingFlag = true;
      this.getData(newValue);
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
                  cityOf = (this.city == 'All') || (this.city == item.city);
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
  data() {
    return {
      loadingFlag: true,
      allData: [],
      service: 'All Services',
      city: 'All',
      serOptions : ['Business', 'Language', 'Travel', 'Daily Life', 'Other', 'All Services'],
      cityOptions: ['Online', 'All','Beijing', 'Shanghai', 'Shenzhen', 'Other'],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        url: "/service/list",
        methods: "GET",
      }).then((res) => {
        this.allData = res.data.serviceList;
        // this.serData = this.allData;
        console.log(res, 'res----getData');
      })
    },
    goDetail(id) {
      this.$router.push('/serDetail/' + id);
    },
    book(id) {
      this.$router.push('/serDetail/' + id);
    },
  }
};
</script>
 <style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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
.filter {
    .ant-select {
      margin-right: 80px;
    }
}
.exception {
  width: 100%;
  height: 400px;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  margin-bottom: 3%;
  background-image: url("../assets/img/service.jpg");
  background-size: cover;
  
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
  .ant-list-item-meta-title {
    color:  #96141b;
  }
  .icon-text {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
  .book {
    color:  #96141b;
  }
}
</style>

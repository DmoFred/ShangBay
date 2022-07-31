<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌地方 -->
        <ul class="logo-list">
          <li style="cursor: pointer" v-for="(trademark, index) in trademarkList" :key="trademark.tmId"
            @click="tradeMarkHandler(trademark)">
            {{ trademark.tmName }}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 平台售卖属性的地方  存储空间 运行内存 4G网络等等商品属性 -->
    <div class="type-wrap" v-for="(attr, index) in attrsList" :key="attr.attrId">
      <!-- 平台售卖的属性 例 颜色 -->
      <div style="cursor: pointer" class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 平台相应售卖的属性值：粉色                                                  P50 049 看到改为:key="attrValue" 原为"index"-->
          <li style="cursor: pointer" v-for="(attrValue, index) in attr.attrValueList" :key="attrValue"
            @click="attrInfo(attr, attrValue)">
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  computed: {
    ...mapGetters(['trademarkList', 'attrsList'])
  },
  methods: {
    //品牌的事件处理函数
    tradeMarkHandler (trademark) {
      // console.log(123);
      // 点击了品牌（苹果），需要整理参数，向服务器发请求获取相应的数据进行互动展示
      // 为啥要在父组件发请求，因为父组件中searchParams参数是带给服务器参数，子组件把你点击的品牌的信息，需要给父组件传递过去
      // console.log(trademark);
      this.$emit('tradeMarkInfo', trademark)
    },
    // 平台相应售卖的属性值点击事件
    attrInfo (attr, attrValue) {
      // console.log(attr);
      //["属性ID：属性值：属性名"]
      this.$emit("attrInfo", attr, attrValue)
    }
  },
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          margin: -6px 22px 0 0;
          width: 52px;
          height: 39px;
          text-align: center;
          line-height: 39px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }

        li:hover {
          background-color: pink;
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }

          a:hover {
            color: #e1251b;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 4px;
        font-size: 12px;
        line-height: 19px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        margin-left: 6px;
        color: #666;
      }
    }
  }
}
</style>
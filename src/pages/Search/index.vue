<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构 标签栏-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑  比如点击手机  -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 输入Apple -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 点击参数配置上面的 品牌 会同样显示在面包屑上                        split是数组切割 将字符串分割为数组 splice不行 报错not a function   -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTradeMark">x</i>
            </li>
            <!-- 平台的售卖属性值展示面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector Search下的子组件  -->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="change('1')">
                  <a>
                    综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-xiangshangjiantoucuxiao': isAsc, 'icon-xiangxiajiantoucuxiao': !isAsc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="change('2')">
                  <a>
                    价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-xiangshangjiantoucuxiao': isAsc, 'icon-xiangxiajiantoucuxiao': !isAsc }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 详情页 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title
                      }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器   :pageNo='1'{默认处在第一页  :pageSize='5'}每页展示多少个商品  :total='100' 共100条数据  连续页码分数-->
          <div class="fr page">
            <Pagination
              :total="total"
              :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo"
              :pagerCount="5"
              @currentPage="currentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      // 带给服务器的参数
      searchParams: {
        "category1Id": "",      // 一级分类的ID
        "category2Id": "",     // 二级分类的ID
        "category3Id": "",    // 三级分类的ID
        "categoryName": "",  // 分类名
        "keyword": "",      // 关键字
        "props": [],  // 例：手机有哪些属性：内存，处理器，系统参数等等
        "trademark": "",// 例：品牌（在内存一栏上面
        "order": "1:desc", // 排序的参数 【默认初始值:1:desc】desc(降序)    esc(升序)
        "pageNo": 1,      // 分页器默认是1 例：当前【手机】第1页
        "pageSize": 5,  // 每页有多少数据 例：每页数据有10条【手机】数据
      }
    }
  },
  components: {
    SearchSelector
  },
  // 当组件挂载完毕之前执行一次【先于mounted之前】
  beforeMount () {
    /* // 复杂写法
    this.searchParams.category1Id = this.$route.query.category1Id
    this.searchParams.category2Id = this.$route.query.category2Id
    this.searchParams.category3Id = this.$route.query.category3Id
    this.searchParams.categoryName = this.$route.query.categoryName
    this.searchParams.keyword = this.$route.query.keyword */
    // Object.assign:ES6新增语法（合并对象）
    // 在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好,服务器就会返回查询的数据
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    /* // 先测试接口返回的数据格式    注掉为了封装函数 执行一次 数据更新后再发请求
    this.$store.dispatch('getSearchList', {}) */
    this.getSearchData();
  },
  methods: {
    // 这是向服务器发请求获取Search模块数据（根据获取params或query参数不同返回不同的数据进行展示）
    // 把这次请求封装为一个函数，当需要时再调用。
    getSearchData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类面包屑的CategoryName 分类名
    removeCategoryName () {
      // 把带给服务器的参数置空，还需要向其发请求
      // 带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      // 但是把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = ''
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // this.getSearchData()  //  看弹幕说 不用写这行代码了 watch监听器发现路由发生变化 就会getSearchData()
      // 地址栏也需要改 当点击 x 地址栏不发生变化时
      // this.$router.push({ query: { ...this.$route.query, categoryName: undefined, category1Id: undefined, category3Id: undefined } }) //弹幕上看到的大佬发的也有效
      // this.getSearchData()  // 配合上条弹幕的方法写的
      // 删除query，如果路径当中出现params参数不应该删除，路由跳转的时候应该保留
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字的面包屑
    removeKeyword () {
      //给服务器的带的参数searchParams的keyword参数置空
      this.searchParams.keyword = ''
      // 再次发请求
      // this.getSearchData()
      // 修改URL （路由跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      // 通知兄弟组件Header清除输入框中的关键字
      this.$bus.$emit('clear')
    },
    // 自定义事件函数回调
    tradeMarkInfo (trademark) {
      // console.log('我是父组件', trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}` // 因传过来的trademark是一个字符型，此处可以用模板字符串或者JSON.parse()
      // 再次发请求获取search模块列表数据进行展示
      this.getSearchData()
    },
    // 删除品牌点击后的面包屑
    removeTradeMark () {
      // 将品牌信息置空
      this.searchParams.trademark = '' //这里不要写undefined 我记得好像照视频写的undefined 最后导致报错 Cannot read properties of undefined (reading 'split')
      // 再次发请求
      this.getSearchData()
    },
    // 收集平台属性地方回调函数（自定义事件）
    attrInfo (attr, attrValue) {
      //["属性ID：属性值：属性名"]
      // console.log(attr, attrValue);
      // 参数格式整理好
      let NewProps = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重 否则面包屑会显示重复数据      判断索引值为-1就没有 数组只有从0开始计数  if语句只有一行代码，可以省略大花括号{}，此处我懒得省
      if (this.searchParams.props.indexOf(NewProps) == -1) {
        this.searchParams.props.push(NewProps)
        // 再次发请求  放在里面减少请求次数
        this.getSearchData()
      }
    },
    // 删除在面包屑上展示的售卖的属性值
    removeAttr (index) {
      // console.log(index)
      this.searchParams.props.splice(index, 1)
      // 再次发请求  
      this.getSearchData()
    },
    //改变综合，销量的状态
    change (flag) {
      // flag：用户每一次点击li标签时候，用于区分点击的是综合(1)按钮、价格按钮(2)
      //获取每一次order初始值,与用户点击传递进来的flag进行判断
      let originOrder = this.searchParams.order
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      //准备一个新的数值，将来赋值给newOrder 新的order 排序方式
      let newOrder = ''
      // 判断的是多次点击的是不是用一个按钮
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的不是同一个按钮
        newOrder = `${flag}:${'desc'}`
      }
      // 将新的order赋予searchParams.order 给新的排序重新赋值
      this.searchParams.order = newOrder
      // 整理数据后 再次发请求
      this.getSearchData()
    },
    currentPage (pageNo) {
      //父组件整理参数
      this.searchParams.pageNo = pageNo;
      this.getSearchData()
    },
  },
  computed: { //mapGetters里面的写法：传递数组，因为getters计算属性没有划分模块【home,search】只要有这些数组名就能使用
    ...mapGetters(['goodsList', 'trademarkList', 'attrsList']),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    isOne () { return this.searchParams.order.indexOf("1") != -1 },
    isTwo () { return this.searchParams.order.indexOf("2") != -1 },   //如果只有俩个按钮排序  第二个可以直接在标签内取反   !isOne
    isAsc () { return this.searchParams.order.indexOf("asc") != -1 },
    // isDesc () { return this.searchParams.order.indexOf("desc") != -1 },
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听 路由的信息是否发生变化，如果 变化再次发请求
    $route (newValue, oldValue) {
      // 再次发请求之前，整理好数据带给服务器参数
      // console.log(this.searchParams);
      //发ajax的时候,属性值为undefind,甚至参数K都不携带了【10个搜索条件,可有可无的】
      // this.searchParams.category1Id = ''  
      // this.searchParams.category2Id = ''  
      // this.searchParams.category3Id = ''
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //路由变化整理参数：手机最新的商品名字、商品1|2|3ID   //每一次请求完毕，应该把相应的1、2、3级分类的id置空，接收下一次的相应1、2、3id  
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // console.log(this.searchParams);
      // 再次发Ajax请求
      this.getSearchData();
      // console.log(this.searchParams);
    }
  },

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin: 20px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          margin-right: 10px;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          margin-top: 38px;
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 2px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 50px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;
                margin-top: 31px;
                text-align: right;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        margin: 0 auto;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            margin-top: 20px;
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
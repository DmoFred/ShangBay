<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="leaveHandler" @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 三级联动 过渡动画-->
        <transition name="sortMove">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航进行路由跳转 -->
            <div class="all-sort-list2">
              <!-- 一级分类 -->
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex == index }">
                <h3 @mouseenter="enterHandler(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link>  -->
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <!--二级分类-->
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入方式：是把lodash 全部功能函数引入  import _ from 'lodash'
// 最好的引入方式是按需加载 
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      show: true,
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数不要使用箭头函数，可能出现this指向问题
    enterHandler: throttle(function (index) {
      // console.log(index);
      //index:鼠标移动上某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 10),
    // 当鼠标在search页面  鼠标移到TypeNav 上(显示)与隐藏
    leaveHandler () {
      //鼠标移出高亮的效果消失
      this.currentIndex = -1;
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 当鼠标在search页面  鼠标移到TypeNav 上显示与(隐藏)
    changeShow () {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    // 进行路由跳转方法 最好的是编程式导航 + 事件委托 又加了自定义属性 category1Id category2Id category3Id
    goSearch (event) {
      // 
      // this.$router.push('/search')
      let element = event.target
      let {
        categoryname,
        category1id,
        category2id,
        category3id
      } = element.dataset;
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id

        } else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转时 带有params参数，顺带过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态给location配置对象添加query参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
  },

  // 组件挂载完毕，可以向服务器发送请求
  mounted () {
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 16)
      }
    })
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;


      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0 auto;

            a {
              font-size: 15px;
              color: #333;
              margin: 10px auto;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  white-space: nowrap;
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: center;
                  padding: 3px 25px 0 0;
                  font-weight: 700;
                  margin: 0 10px;
                }

                dd {
                  margin: 0 auto;
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin: 5px 0 10px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*&:hover {
            .item-list {
              display: block;
            }
        }*/
        }

        /*.item:hover {
          background-color: pink;
            第一种解决方法用css 鼠标移动到item 全部商品分类下的item 高亮颜色 
      }*/
        /*第二种方法js */
        .cur {
          background: #e1dbdb;
        }
      }
    }

    // 二级联动过渡动画样式
    // 进入
    .sortMove-enter {
      height: 0px;
    }

    .sortMove-enter-active {
      overflow: hidden;
      transition: all .5s linear;
    }

    .sortMove-enter-to {
      height: 461px;
    }
  }
}
</style>
<template>
  <div id="app">
    <!-- <h1 v-upper.erha="msg"></h1>   学习自定义插件-->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home和search可见的，但是login和register是不可见的 -->
    <!-- 利用路由元信息解决当前问题好处：一行代码就可以解决 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入 组件
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
  /* data () {  学习自定义插件
    return {
      msg: 'ABC'
    }
  }, */
  // data () {
  //   return {
  //     searchParams: {
  //       pageNo: 6,
  //       pageSize: 3, 
  //     },
  //   };
  // },
  components: { Header, Footer },
  mounted () {
    // 派发action 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style scoped>
</style>

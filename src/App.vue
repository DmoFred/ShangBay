<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入 组件
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
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

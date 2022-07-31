<!-- eslint-disable no-unused-vars -->
<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
import "swiper/css/swiper.min.css";
export default {
  name: 'Carsousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听：不管数据有没有变化，上来立即监听
      immediate: true,
      handler () {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(
            // document.querySelector('.swiper-container'), 
            // $refs 替换document.querySelector 获取DOM节点元素
            this.$refs.floor1Swiper,
            {
              direction: 'horizontal', // 垂直切换选项  vertical
              loop: true, // 循环模式选项
              autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              },
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
        })
      }
    }
  }
}
</script>

<style>
</style>
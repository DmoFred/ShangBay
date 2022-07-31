// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// start：进度条开始， done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'

// 利用axios对象的方法create 去创建一个axios实例
// request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  baseURL: '/mock',
  // 代表请求超时的时间5s
  timeout: 5000,
})
// 请求拦截器：就是在发送之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 进度条开始动
  nprogress.start()
  // config:配置对象，对象里面有一个属性很重要，header请求头
  return config
})

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res) => {
  //res:实质就是项目中发请求、服务器返回的数据
  //进度条结束
  nprogress.done();
  return res.data;
}, (err) => {
  //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
  alert(err.message);
  //终止Promise链
  return new Promise();
});


// 对外暴露
export default requests
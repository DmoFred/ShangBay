<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <!-- <a href="login.html" target="_blank">登陆</a> -->
          <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <!-- 手机号 -->
      <div class="content">
        <label>手机号:</label>
        <input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <!-- <button class="authCode" @click="$store.dispatch('getAuthCode',phone)">获取验证码</button> -->
        <button
          class="authCode"
          :disabled="computedTime > 0"
          @click="getCode"
        >{{ computedTime > 0 ? `已发送(${computedTime})s` : '获取验证码' }}</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <!-- 登录密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input
          placeholder="请输入你的密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input
          placeholder="请再次输入你的密码"
          v-model="password1"
          name="password1"
          v-validate="{ required: true, is:password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <!-- 同意协议 -->
      <div class="controls">
        <input
          type="checkbox"
          name="agree"
          v-model="agree"
          v-validate="{ required: true, 'approve':true}"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
// import { reqAuthCode } from '@/api'
export default {
  name: 'Register',
  data () {
    return {
      // 收集表单数据--手机号
      phone: '',
      // --验证码
      code: '',
      // --密码
      password: '',
      // 确认密码
      password1: '',
      // 是否同意协议
      agree: true,
      computedTime: 0,
    }
  },
  methods: {
    // 获取验证码
    /* async getCode (phone) {
      // 简单判断一下
      try {
        // 如果获取到验证码
        const { phone } = this
        phone && (await this.$store.dispatch('getCode', phone))
        // 将属性值的code属性值变为仓库中的验证码
        // console.log(this.$store)
        this.code = this.$store.state.user.code
      } catch (error) {
        alert(error.message)
      }
    }, */
    // 获取验证码
    async getCode (phone) {
      try {
        const { phone } = this
        phone && (await this.$store.dispatch('getCode', phone))

        // 倒计时操作
        this.computedTime = 6;
        this.timeId = setInterval(() => {
          // 判断
          if (this.computedTime <= 0) {
            clearInterval(this.timeId);
          } else {
            this.computedTime--;
          }
        }, 1000);
        this.timeId2 = setTimeout(() => {
          this.code = this.$store.state.user.code
          // console.log(this.code);
          // alert('验证码是：' + code)
        }, 3000)
      } catch (error) {
        clearInterval(this.timeId);
        this.computedTime = 0;
        alert(error.message)
      }
    },
    // 用户点击完成注册按钮
    async userRegister () {
      const success = await this.$validator.validateAll();
      //全部表单验证成功，在向服务器发请求，进行注册
      //只要有一个表单没有成功，不会发请求
      if (success) {
        try {
          const { phone, code, password, password1 } = this;
          await this.$store.dispatch("userRegister", {
            phone,
            code,
            password,
          });
          //注册成功进行路由的跳转
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      }

      /* try {
        // 如果成功路由跳转
        const { phone, code, password, password1 } = this
        phone && password == password1 && code && (await this.$store.dispatch('userRegister', { phone, code, password }))
        this.$router.push('/login')
      } catch (error) {
        alert(error.message)
      } */
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    .authCode {
      width: 100px;
      height: 37px;
      margin-left: 5px;
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        margin-top: 20px;
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        border: 0px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
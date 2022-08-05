<template>
  <div class="pay-main">
    <!-- 测试elementUI是否正常使用 -->
    <!-- <el-button type="success" icon="el-icon-check">测试</el-button> -->
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：
            <em>
              {{ orderId
              }}
            </em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">
              ￥{{ payInfo.totalFee
              }}
            </em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持
            <span class="zfb">WeChatPay</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下WeChatPay信息。</li>
        </ol>
        <h4>
          WeChat账户信息：（很重要，
          <span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>Account&nbsp;&nbsp;：1239876</li>
          <li>Password：*******</li>
          <!-- <li>支付密码：111111</li> -->
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <img src="./images/pay2.jpg" />
            </li>
            <li class="checked">
              <img src="./images/pay3.jpg" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li>
                <img src="./images/pay10.jpg" />
              </li>
              <li>
                <img src="./images/pay11.jpg" />
              </li>
              <li>
                <img src="./images/pay12.jpg" />
              </li>
              <li>
                <img src="./images/pay13.jpg" />
              </li>
              <li>
                <img src="./images/pay14.jpg" />
              </li>
              <li>
                <img src="./images/pay15.jpg" />
              </li>
              <li>
                <img src="./images/pay16.jpg" />
              </li>
              <li>
                <img src="./images/pay17.jpg" />
              </li>
              <li>
                <img src="./images/pay18.jpg" />
              </li>
              <li>
                <img src="./images/pay19.jpg" />
              </li>
              <li>
                <img src="./images/pay20.jpg" />
              </li>
              <li>
                <img src="./images/pay21.jpg" />
              </li>
              <li>
                <img src="./images/pay22.jpg" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span>
              <a href="weixinpay.html" target="_blank">微信支付</a>
            </span>
            <span>&nbsp;&nbsp;&nbsp;中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data () {
    return {
      payInfo: {},
      timer: null,
      code: ''
    }
  },
  computed: {
    orderId () {
      return this.$route.query.orderId
    },
  },
  //  async  mounted () {    不能在Vue生命周期函数 使用async|await
  //   await  this.$api.reqPayInfo(this.orderId)
  //   },
  mounted () {
    this.getPayInfo()
  },
  methods: {
    // 获取支付信息
    async getPayInfo () {
      let result = await this.$api.reqPayInfo(this.orderId)
      // console.log(result);
      // 如果成功，组件当中存储支付信息  没有使用vuex了所以是组件当中存
      if (result.code == 200) {
        this.payInfo = result.data
      }
    },
    // 点击立即支付
    async open () {
      // 生成二维码(地址)
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      // console.log(url);
      //弹出支付二维码进行支付
      this.$alert(`<img src=${url} />`, '请使用微信扫码支付', {
        // 是否使用HTML字符串就上面alert后面的
        dangerouslyUseHTMLString: true,
        // 布局居中
        center: true,
        // 添加取消按钮
        showCancelButton: true,
        // 更改取消按钮的文本内容
        cancelButtonText: '支付遇到问题',
        // 更改确认按钮的文本内容
        confirmButtonText: '已支付成功 ！',
        // 添加右上角关闭按钮 x true为添加  false为关掉 让它消失
        showClose: false,
        // 关闭弹出窗的配置
        beforeClose: (type, instance, done) => {
          // type:区分取消|确定按钮
          // instance:当前组件实例
          // done:关闭弹出窗的方法
          if (type == 'cancel') {
            alert('支付失败，请及时联系管理员处理qq528838215');
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 关闭弹出窗
            done();
          } else {
            // 判断是否真的支付 支付成功后的事情
            // 开发人员为了方便，下面if语句可以不要了 省得支付了 if (this.code == 200) {  baLaBaLaBaLa  }   baLaBaLaBaLa留下,删掉 if (this.code == 200) {}
            if (this.code == 200) {
              // 清除定时器
              clearInterval(this.timer)
              this.timer = null;
              // 关闭弹出窗
              done()
              // 成功后跳转路由
              this.$router.push('/paysuccess')
            }
          }
        },
      });
      // 需要知道支付成功|失败
      // 支付成功后应该怎么做？ 路由跳转， 失败后应该提示信息
      // 定时器没有，开启一个新的定时器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          // 发请求获取用户支付状态
          let result = await this.$api.reqPayStatus(this.orderId)
          // console.log(result)
          // 如果请求状态码为成功200
          if (result.code == 200) {
            // 第一步清除定时器
            clearInterval(this.timer)
            this.timer = null;
            // 保存支付成功返回的code
            this.code = result.code;
            // 关闭弹出窗
            this.$msgbox.close();
            // 跳转路由
            this.$router.push('/paysuccess')
          }
        }, 1000)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          .checked {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #e1251b;
            cursor: pointer;
            line-height: 18px;
          }

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;

        &:hover {
          color: #ddd !important;
        }
      }
    }
  }
}
</style>
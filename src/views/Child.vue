<template>
  <div class="about">
    <h1>This is an child page</h1>
    <button @click="uploadImg">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: ""
    };
  },
  mounted() {
    this.$axios.post("/api/about", { url: window.location.href }, result => {
      this.$wx.config({
        debug: true,
        appId: result.data.appID, // 必填，公众号的唯一标识
        timestamp: result.data.timestamp, // 必填，生成签名的时间戳，精确到秒
        nonceStr: result.data.noncestr, // 必填，生成签名的随机串
        signature: result.data.signature, // 必填，签名
        jsApiList: ["scanQRCode", "chooseImage", "uploadImage"]
      });
    });
  },
  methods: {
    handleQR() {
      this.$wx.ready(() => {
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          }
        });
      });
    },
    uploadImg() {
      this.$wx.ready(() => {
        this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
              localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                console.log(res)
              }
            });
          },
          fail: function(res) {
            console.log("调用失败");
          },
          complete: () => {
            console.log("调用完成了");
          }
        });
      });
    }
  }
};
</script>

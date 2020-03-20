<template>
  <div class="about">
    <h1>This is an child page</h1>
    <button @click="chooseImg">选择并预览图片</button>
    <button @click="handleQR">扫码</button>
    <button @click="uploadImg">上传图片</button>
    <button @click="downloadImg">下载图片</button>
    <div>预览</div>
    <div v-for="(item, key) in localIds" :key="key">
      <img :src="item" width="100" height="200" v-if="localIds.length" @click="previewImg(item)" />
    </div>
    <div>下载</div>
     <img :src="localId" width="100" height="200" v-if="localIds.length" @click="previewImg(item)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: "",
      localIds: [],
      serverId: '',
      localId: ''
    };
  },
  mounted() {},
  methods: {
    async handleQR() {
     
    },
    // 选择图片
    async chooseImg() { // awai/async使用try-catch捕获异常
      let res = await this.$JsApi.chooseImage();
      if (res.errMsg === "chooseImage:cancel") {
        return
      }
      this.localIds = []
      // ios
      if (window.__wxjs_is_wkwebview) {
        for (let i in res.localIds) {
          let urlres = await this.$JsApi.getLocalImgData(res.localIds[i])
          let url = urlres.localData
          this.localIds.push(url);
        }
        return
      }
      // android
      this.localIds = res.localIds
    },
    // 点击图片预览
    previewImg (item) {
      this.$JsApi.previewImage(item, this.localIds)
    },
    // 上传图片
    async uploadImg () {
      let res = await this.$JsApi.uploadImage(this.localIds[0]);
      console.log(res)
      this.serverId = res.serverId
    },
     // 下载图片
    async downloadImg () {
      let res = await this.$JsApi.downloadImage(this.serverId);
      console.log(res)
      this.localId = res.localId
    },
    shareFriendCircle() {}
  }
};
</script>

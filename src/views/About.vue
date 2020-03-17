<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- 这里渲染子组件 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    testAxios () {
      console.log('测试了')
      // this.$axios.post('/api/testpost', { text: '这是测试参数' }, res => {
      //   console.log(res)
      // })
    }
  },
  mounted () {
    this.testAxios()
  }
}
</script>
const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://fqyweixin.free.idcfengye.com/express-vue-jdk/api',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {  // 替换，通配/api的替换成/
        //   '^/api': '/'
        // }
      },
      '/other': {
        target: '<other_url>'
      }
    },
    host: 'localhost',
    port: '8090'
  },
  publicPath: '/web/', // 模板里文件的引入路径 = publicPath + assetsDir
  // assetsDir: './static/', // 会把js/css/img打包在项目根目录的static文件夹下，放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  outputDir: 'web' // 打出来的包名
}
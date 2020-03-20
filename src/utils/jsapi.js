// weixin-jsapi的分享接口未更新，这里使用weixin-js-sdk
// import wx from 'weixin-jsapi'
const wx = require('weixin-js-sdk')
// 所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：
// success：接口调用成功时执行的回调函数。
// fail：接口调用失败时执行的回调函数。
// complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
// cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
// trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
const apiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareTimeline', //（即将废弃）
  'onMenuShareAppMessage', //（即将废弃）
  'onMenuShareQQ', //（即将废弃）
  'onMenuShareWeibo',
  'onMenuShareQZone', //（即将废弃）
  'startRecord',
  'stopRecord',
  'onVoiceRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'onVoicePlayEnd',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'translateVoice',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard'
]
const types = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareWeibo',
  'onMenuShareTimeline', //（即将废弃）
  'onMenuShareAppMessage', //（即将废弃）
  'onMenuShareQQ', //（即将废弃）
  'onMenuShareWeibo',
  'onMenuShareQZone']
export default {
  // 通过config接口注入权限验证配置
  config: (appId, timestamp, nonceStr, signature, debug = true, jsApiList = apiList) => {
    // 由于页面采用的hash地址，相当于url不变，所以只需要验证配置一次，应当在根目录下执行
    wx.config({
      debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature,// 必填，签名
      jsApiList // 必填，需要使用的JS接口列表
    });
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.ready(() => {
      wx.checkJsApi({
        jsApiList: types, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          return res
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      })

      // 分享注意事项，link和imgUrl应当与JS接口安全域名一致，即应当在JS接口安全域名下
      // 分享接口应该在用户点击之前执行，放在wx.ready里面

      //获取"分享到腾讯微博"按钮点击状态及自定义分享内容接口  
      wx.onMenuShareWeibo({
        title: '分享到腾讯微博', // 分享标题  
        desc: '分享到腾讯微博！', // 分享描述  
        link: 'http://192.168.2.221:8090/web/#/', // 分享链接  
        imgUrl: 'http://192.168.2.221:8090/web/img/icons/android-chrome-192x192.png' // 分享图标  
      });
      // 分享给朋友或分享到qq
      wx.updateAppMessageShareData({
        title: '分享给我的傻猪', // 分享标题  
        desc: 'love么么哒', // 分享描述  
        link: 'http://192.168.2.221:8090/web/#/child', // 分享链接  
        imgUrl: 'http://192.168.2.221:8090/web/yunhai.jpg' // 分享图标  
      });
      // 分享到朋友圈或分享到qq空间
      wx.updateTimelineShareData({
        title: '分享到朋友圈或分享到qq空间', // 分享标题  
        desc: '分享到朋友圈或分享到qq空间！', // 分享描述  
        link: 'http://192.168.2.221:8090/web/#/', // 分享链接  
        imgUrl: 'http://192.168.2.221:8090/web/yunhai.jpg' // 分享图标  
      });
    });
    wx.error(() => {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      console.log('验证失败')
    });
  },
  // 判断当前客户端版本是否支持指定JS接口
  checkJsApi: (jsApiList) => {
    wx.checkJsApi({
      jsApiList: jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        return res
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    })
  },
  // 分享接口,types:updateAppMessageShareData分享给朋友或分享到qq，updateTimelineShareData分享到朋友圈或分享到qq空间,onMenuShareWeibo分享到腾讯微博
  // 即将废弃：onMenuShareTimeline分享到朋友圈, onMenuShareAppMessage分享给朋友, onMenuShareQQv分享到Qv, onMenuShareQZone分享到qq空间
  share: (type, title, link, imgUrl, desc) => {
    wx[type]({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      desc,
      success: () => {
        // 设置成功

      },
      fail: () => {

      }
    })
  },
  // 图像接口
  // 选择图像
  chooseImage () {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            // resolve(res)
            resolve(res)
          },
          fail: (res) => {
            reject(res)
          },
          cancel: (res) => {
            resolve(res)
          }
        });
      })
    })
  },
  // ios使用这个方法可以把chooseImage返回的localIds解析成base64显示在img的src里，安卓可以直接用localId
  getLocalImgData (localId) {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.getLocalImgData({
          localId: localId,
          success: (res) => {
            resolve(res)
          },
          fail: (res) => {
            reject(res)
          }
        })
      })
    })
  },
  // 预览图片
  previewImage (current, urls) {
    wx.ready(() => {
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      });
    })
  },
  // 上传图片
  // 备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
  uploadImage (localId) {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.uploadImage({
          localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            resolve(res)
            // var serverId = res.serverId; // 返回图片的服务器端ID
          },
          fail: (res) => {
            reject(res)
          }
        })
      })
    })
  },
  // 下载图片
  downloadImage (serverId) {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.downloadImage({
          serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            resolve(res)
            var localId = res.localId; // 返回图片下载后的本地ID
          },
          fail: (res) => {
            reject(res)
          }
        })
      })
    })
  },
}
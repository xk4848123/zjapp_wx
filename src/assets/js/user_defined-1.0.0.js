
var global_wxFunciton = new Object(); //创建对象
global_wxFunciton.setWxConfig = function () {
  this.global_wxIsLoad = 1;
}
global_wxFunciton.isloadWxConfig = function () {
  if (this.global_wxIsLoad == 1) {
    return true;
  } else {
    return false;
  }
}
global_wxFunciton.global_wxIsLoad = 0;


window.onload = function () {
  //1.app增添全局漂浮首页导航
  var globalRootDiv = document.getElementById("globalRoot");
  var globalClientWidth = this.document.body.clientWidth;
  var globalClientHeight = this.document.body.clientHeight;
  //跟随手移动
  globalRootDiv.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    e.preventDefault();
    var px = touch.pageX;
    var py = touch.pageY;
    if (px < 0) {
      px = 0;
    }
    if (px > globalClientWidth - 40) {
      px = globalClientWidth - 40;
    }
    if (py < 0) {
      py = 0;
    }
    if (py > globalClientHeight - 40) {
      py = globalClientHeight - 40;
    }
    globalRootDiv.style.cssText = "left:" + px + "px;top:" + py + "px;";
  });
  //首页地址获取
  $.get('/zjapp/v2/app/getWxHome', function (res) {
    if (res.error_code == 0) {
      wxHome = res.data;
    } else {
      wxHome = "https://appnew.zhongjianmall.com/zjapp/wechat/"
    }
    console.log(wxHome);
  });
}
var wxHome = '';
function globalGoRoot() {
  window.location.href = wxHome;
}
function globalShowGoRoot() {
  var globalRootDiv = document.getElementById("globalRoot");
  globalRootDiv.style.display = "block";
}
function globalhideGoRoot() {
  var globalRootDiv = document.getElementById("globalRoot");
  globalRootDiv.style.display = "none";
}
global_wxFunciton.showGoRoot = globalShowGoRoot;
global_wxFunciton.hideGoRoot = globalhideGoRoot;


function globalOnBridgeReady(appId, timeStamp, nonceStr, package, signType, paySign) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId": appId,     //公众号名称，由商户传入     
      "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
      "nonceStr": nonceStr, //随机串     
      "package": package,
      "signType": signType,         //微信签名方式：     
      "paySign": paySign //微信签名 
    },
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      }else if(res.err_msg ==  "get_brand_wcpay_request:cancel"){
        alert("取消了");
      }else if(res.err_msg ==  "get_brand_wcpay_request:fail"){
        alert("失败了");
      }else{
        alert("=====");
      }
    });
}

function globalToWxPay(appId, timeStamp, nonceStr, package, signType, paySign) {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', globalOnBridgeReady(appId, timeStamp, nonceStr, package, signType, paySign), false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', globalOnBridgeReady(appId, timeStamp, nonceStr, package, signType, paySign));
      document.attachEvent('onWeixinJSBridgeReady', globalOnBridgeReady(appId, timeStamp, nonceStr, package, signType, paySign));
    }
  } else {
    globalOnBridgeReady(appId, timeStamp, nonceStr, package, signType, paySign);
  }
}
global_wxFunciton.globalToWxPay = globalToWxPay;
/**创建二维码 */
function createCard(element,height,width,content){
  var qrcode = new QRCode(element,{
    width:width,
    height:height,
  });
  qrcode.makeCode(content);
}
global_wxFunciton.global_createCard = createCard;
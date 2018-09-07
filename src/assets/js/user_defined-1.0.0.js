
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
    if ( px > globalClientWidth-40) {
      px = globalClientWidth-40;
    }
    if (py < 0 ) {
      py = 0;
    }
    if (py > globalClientHeight-40) {
      py = globalClientHeight-40;
    }
    globalRootDiv.style.cssText = "left:" + px + "px;top:" + py + "px;";
  });
  //首页地址获取
  $.get('/zjapp/v2/app/getWxHome',function(res){
    if(res.error_code == 0){
      wxHome = res.data;
    }else{
      wxHome = "https://appnew.zhongjianmall.com/zjapp/wechat/"
    }
    console.log(wxHome);
  });
}
var wxHome = '';
function globalGoRoot() {
  window.location.href = wxHome;
}
function globalShowGoRoot(){
  var globalRootDiv = document.getElementById("globalRoot");
  globalRootDiv.style.display = "block";
}
function globalhideGoRoot(){
  var globalRootDiv = document.getElementById("globalRoot");
  globalRootDiv.style.display = "none";
}
global_wxFunciton.showGoRoot = globalShowGoRoot;
global_wxFunciton.hideGoRoot = globalhideGoRoot;
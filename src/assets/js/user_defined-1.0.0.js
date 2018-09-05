
var global_wxFunciton = new Object(); //创建对象
     global_wxFunciton.setWxConfig = function(){ 
      this.global_wxIsLoad = 1;
     }
	 global_wxFunciton.isloadWxConfig = function(){ 
     if(this.global_wxIsLoad == 1){
       return true;
     }else{
       return false;
     }
     }
    global_wxFunciton.global_wxIsLoad = 0;

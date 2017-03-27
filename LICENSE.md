String.prototype.startWith=function(str){     
	var reg=new RegExp("^"+str);     
	return reg.test(this);        
}  
String.prototype.endWith=function(str){ 
	var reg=new RegExp(str+"$"); 
	return reg.test(this); 
}
//加载js
var hibo_com = document.scripts[document.scripts.length-1];
var hibo_pare = hibo_com.parentNode;
hibo_com.src = hibo_com.src;
Import = {
	Jc : function(s){
		if(s){
			if(typeof(s)=='string'){
				s = [s];
			}
			for (var i = 0; i < s.length; i++) {
				var src = Import.Path + s[i];
				if(s[i].startWith('http:')||s[i].startWith('www')){
					src = s[i];
				}
				var p = s[i].indexOf('?');
				s[i] = p>0?(s[i].substring(0, p)):s[i];
				try{
					//var id=s[i].replace(/\.|\\|\//g,'');
					if(s[i].endWith('js')){
						document.write('<script type="text/javascript" src="'+ src + '"><\/script>');
					}else if(s[i].endWith('css')){
						document.write('<link rel="stylesheet" type="text/css" href="'+ src + '"/>');
					}
				}catch(e){
					console.log(e);
				}
			}
		}
	},
	Path : function(){
		// 获取当前网址，如： http://127.0.0.1:8080/HIBO/common/mall/cart/list
		var url = window.document.location.href;
		if(url.startWith('http:')||url.startWith('www')){
			// 获取主机地址之后的目录，如： /HIBO/common/mall/cart/list
			var pathName = window.document.location.pathname;
			var pos = url.indexOf(pathName);
			// 获取主机地址，如： http://127.0.0.1:8080
			var localhostPaht = url.substring(0, pos);
			// 获取带"/"的项目名，如：/HIBO
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			return (localhostPaht + projectName);
		}else{
			return url.substring(0,url.lastIndexOf('/')+1);
		}
	}()
};
Import.Jc(['/resources/hibo/js/jquery.js','/resources/hibo/js/common.js','/resources/hibo/js/hibo_message.js','/resources/hibo/js/hibo_component.js']);

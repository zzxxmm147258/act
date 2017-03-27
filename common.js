/**
 * <p>标题：公共</p>
 * <p>功能：公共</p>
 * <p>版权： Copyright © 2015 HIBO</p>
 * <p>公司: 北京瀚铂科技有限公司</p>
 * <p>创建日期：2015年11月2日 上午9:38:00</p>
 * <p>类全名：hibo_validate.js</p>
 * 作者：周雷
 * 初审：周雷
 * 复审：周雷
 */
$.extend({
	RootPath : function(){
		try{
			window.RootPath = Import.Path;
		}catch(e){
		// 获取当前网址，如： http://127.0.0.1:8080/HIBO/common/mall/cart/list
			var curWwwPath = window.document.location.href;
			// 获取主机地址之后的目录，如： /HIBO/common/mall/cart/list
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			// 获取主机地址，如： http://127.0.0.1:8080
			var localhostPaht = curWwwPath.substring(0, pos);
			// 获取带"/"的项目名，如：/HIBO
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			window.RootPath = (localhostPaht + projectName);
		}
		return window.RootPath;
	}(),
	Url : function(url){
		if(!url){
			return '';
		}
		var pi = url.substring(0,4);
		if(!('http'==pi||'www.'==pi||'ftp:'==pi)){
			url=$.RootPath+url;
		}
		return url;
	},
	// 获取链接上的参数，name:参数名
	GetUrlParam : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURI(r[2]);
		return null;
	},
	
	Cookie : {
		// 写cookies
		setCookie : function(name, value, time) {
			document.cookie = name + "=" + escape(value) + ";expires=" + time;
		},
		// 获取Cookie
		getCookie : function(name) {
			if (name != null) {
				var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
				return value ? decodeURIComponent(value[1]) : null;
			}
		},
		// 删除cookies
		removeCookie : function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = getCookie(name);
			if (cval != null){
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			}
		}
	},
	
	/** 自定义Map*/
	HMap:function() {
        this.map = {};
        /**获取值*/
        this.get = function(key) {
            key = key.toString().replace(/\=|\.|]|\[|,/g,'_' );
            var val = this.map[key];
            return (typeof val === undefined) ? null : val;
        };
        /**添加值*/
        this.put = function(key, value) {
            key = key.toString().replace(/\=|\.|]|\[|,/g,'_' );
            this.map[key]=value;
            return this;
        };
        /**添加对象*/
        this.putObj = function(map) {
        	if(typeof(map)=='object'){
        		for(key in map){
        			this.map[key] = map[key];
        		}
        	}
        	return this;
        };
        /**添加map*/
        this.putAll = function(map) {
        	if(map.map&&typeof(map.map)=='object'){
        		for(key in map.map){
        			this.map[key] = map.map[key];
        		}
        	}
        	return this;
        };
        /**移除值*/
        this.remove = function (key){
        	key = key.toString().replace(/\=|\.|]|\[|,/g,'_' );
        	delete this.map[key];
        	return this;
        };
        this.remove = function (key){
        	key = key.toString().replace(/\=|\.|]|\[|,/g,'_' );
        	delete this.map[key];
        	return this;
        };
        this.removeAll = function (){
        	this.map = {};
        	return this;
        };
        /**大小*/
        this.size = function(){
        	var i = 0;
        	for(m in this.map){
        		i++;
        	}
        	return i;
        };
        /**获取map的值的数组*/
        this.values = function(){
        	var i = 0;
        	var values = new Array();
        	for(key in this.map){
        		values[i] = this.map[key];
    			i++;
    		}
        	return values;
        };
        /**获取属性的数组*/
        this.keySet = function(){
        	var i = 0;
        	var keys = new Array();
        	for(key in this.map){
        		keys[i] = key;
    			i++;
    		}
        	return keys;
        };
        /**获取数组属性的对象*/
        this.toParams = function(name){
        	var i = 0;
        	var values = {};
        	for(key in this.map){
        		values[name+'['+i+']'] = this.map[key];
    			i++;
    		}
        	return values;
        };
        /**获取当前map的对象*/
        this.toParam = function(){
        	return this.map;
        };
        this.containsKey = function(key){
        	key = key.toString().replace(/\=|\.|]|\[|,/g,'_' );
        	return this.map[key]?true:false;
        }
    },
    Browser : {// 移动终端浏览器版本信息
    		versions : function() {
    			var u = navigator.userAgent;
    			return { 
    				trident : u.indexOf('Trident') > -1,// IE内核
    				presto : u.indexOf('Presto') > -1,// opera内核
    				webKit : u.indexOf('AppleWebKit') > -1,// 苹果、谷歌内核
    				gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,// 火狐内核
    				mobile : !!u.match(/AppleWebKit.*Mobile.*/),// 是否为移动终端
    				ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),// ios终端
    				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,// android终端或uc浏览器
    				iPhone : u.indexOf('iPhone') > -1,// 是否为iPhone或者QQHD浏览器
    				iPad : u.indexOf('iPad') > -1,// 是否iPad
    				webApp : u.indexOf('Safari') == -1// 是否web应该程序，没有头部与底部
    			};
    		}(),
    		language : (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    /**
	var dateStr = $.DateFomart(new Date().getTime()).toText("yyyy年MM月dd日 周W HH时mm分ss秒zzz毫秒");
    var dateStr = $.DateFomart(new Date().getTime()).toCh("yyyy年MM月dd日 周W HH时mm分ss秒zzz毫秒");
	var dateStr = $.DateFomart(new Date()).toText("yyyy年MM月dd日 周W HH时mm分ss秒zzz毫秒");
	var dateStr = $.DateFomart('2016-04-07 18:05:38:695').toText("yyyy年MM月dd日 周W HH时mm分ss秒zzz毫秒");
	var date = $.DateFomart(dateStr).toDate();
	var time = $.DateFomart(dateStr).toTime();
	var weeks = $.DateFomart(date).getWeeks();
	*/
	DateFomart:function(date,defaut) {
		if(!date){
			if(undefined!=defaut){
				date = defaut;
			}else{
				date = new Date();
			}
		}
		if ('number' == typeof (date)) {
			date = new Date(date);
		}
		if ('string' == typeof (date)) {
			date = date.replace(/-/g, "/");
			date = new Date(date);
			if(date =='Invalid Date'){
				date = null;
			}
		}
		var ZWeek = [ '日', '一', '二', '三', '四', '五', '六' ];
		var EWeek = [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat' ];
		if (date instanceof Date) {
			this.year = date.getFullYear().toString(); // 获取完整的年份(4位,1970-????)
			this.month = (date.getMonth() + 1).toString(); // 获取当前月份(0-11,0代表1月)
			this.day = date.getDate().toString(); // 获取当前日(1-31)
			this.ZWeek = ZWeek[date.getDay()].toString(); // 获取当前星期X(0-6,0代表星期天)
			this.EWeek = EWeek[date.getDay()].toString(); // 获取当前星期X(0-6,0代表星期天)
			this.week = date.getDay().toString(); // 获取当前星期X(0-6,0代表星期天)
			this.Hour = date.getHours().toString(); // 获取当前小时数(0-23)
			this.hour = (this.Hour > 12 ? this.Hour - 12 : this.Hour).toString(); // 获取当前小时数(0-23)
			this.minute = date.getMinutes().toString(); // 获取当前分钟数(0-59)
			this.second = date.getSeconds().toString(); // 获取当前秒数(0-59)
			this.ss = date.getMilliseconds().toString(); // 获取当前毫秒数(0-999)
		}
		getTen = function(num, n , s) {
			num = num + "";
			for (var i = 0; i < (n - num.length); i++) {
				num = s + num;
			}
			return num;
		};
		this.toText = function(fomart) {
			if(!date){
				return '';
			}
			if (date instanceof Date) {
				fomart = fomart.replace(/yyyy|YYYY/, this.year);
				fomart = fomart.replace(/yyy|YYY/, this.year.substring(1,4));
				fomart = fomart.replace(/yy|YY/, this.year.substring(2,4));
				fomart = fomart.replace(/MM/, getTen(this.month, 2, '0'));
				fomart = fomart.replace(/M/, this.month);
				fomart = fomart.replace(/DD|dd/, getTen(this.day, 2, '0'));
				fomart = fomart.replace(/D|d/, this.day);
				fomart = fomart.replace(/EW/, this.EWeek);
				fomart = fomart.replace(/W/, this.ZWeek);
				fomart = fomart.replace(/w/, this.week == 0 ? 8 : this.week);
				fomart = fomart.replace(/HH/, getTen(this.Hour, 2, '0'));
				fomart = fomart.replace(/hh/, getTen(this.hour, 2, '0'));
				fomart = fomart.replace(/H/, this.Hour);
				fomart = fomart.replace(/h/, this.hour);
				fomart = fomart.replace(/mm/, getTen(this.minute, 2, '0'));
				fomart = fomart.replace(/m/, this.minute);
				fomart = fomart.replace(/ss/, getTen(this.second, 2, '0'));
				fomart = fomart.replace(/s/, this.second);
				fomart = fomart.replace(/zzz/, getTen(this.ss, 3, '0'));
				fomart = fomart.replace(/zz/, getTen(this.ss, 2, '0'));
				fomart = fomart.replace(/z/, this.ss);
			}
			return fomart;
		};
		this.toCh = function(fomart) {
			if(!date){
				return '';
			}
			if (date instanceof Date) {
				this.year = getCh(this.year,1);
				this.month = getCh(this.month,2);
				this.day = getCh(this.day,2);
				this.Hour = getCh(this.Hour,3);
				this.hour = getCh(this.hour,3);
				this.minute = getCh(this.minute,3);
				this.second = getCh(this.second,3);
				this.ss = getCh(this.ss,3);
				fomart = fomart.replace(/yyyy|YYYY/, this.year);
				fomart = fomart.replace(/yyy|YYY/, this.year.substring(1,4));
				fomart = fomart.replace(/yy|YY/, this.year.substring(2,4));
				fomart = fomart.replace(/MM|M/, this.month);
				fomart = fomart.replace(/DD|dd/, this.day);
				fomart = fomart.replace(/D|d/, this.day);
				fomart = fomart.replace(/W/, this.Week);
				fomart = fomart.replace(/w/, this.week == 0 ? 8 : this.week);
				fomart = fomart.replace(/HH/, this.Hour);
				fomart = fomart.replace(/hh/, this.hour);
				fomart = fomart.replace(/H/, this.Hour);
				fomart = fomart.replace(/h/, this.hour);
				fomart = fomart.replace(/mm|m/, this.minute);
				fomart = fomart.replace(/ss|s/, this.second);
				fomart = fomart.replace(/zzz|zz|z/, this.ss);
			}
			return fomart;
		};
		var ch = [ '〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '廿'];
		var dv = ['','十','百','千','万'];
		getCh=function(str,type){
			var reStr = '';
			str = str.toString();
			if(1==type){
				for (var i = 0; i < str.length; i++) {
					reStr = reStr + ch[str.charAt(i)];
				}
			}else if(2==type){
				var p = parseInt(str);
				if(p<=10){
					reStr = ch[p];
				}else if(p<=20){
					reStr = (p==20?'二十':('十'+ch[str.charAt(1)]));
				}else if(p<100){
					reStr = (ch[str.charAt(0)] + '十' + ch[str.charAt(1)]);
				}
			}else if(3==type){
				for (var i = 0; i < str.length; i++) {
					var v = i==0&&str.length==2&&str.charAt(i)==1?'':ch[str.charAt(i)]
					reStr = reStr + v + dv[str.length-i-1];
				}
			}
			return reStr;
		}
		this.toDate = function() {
			if(!date){
				return '';
			}
			return date;
		};
		this.toTime = function() {
			if(!date){
				return '';
			}
			return date.getTime();
		};
		this.getWeeks = function(num){
			var rs = {};
			if(date instanceof Date){
				if('number' == typeof (num)&&0!=num){
					date = date.setDate(date.getDate()+num*7);
				}
				rs = {
					Date:date,
					WFDate:new Date(date).setDate(date.getDate()-date.getDay()),
					WLDate:new Date(date).setDate(date.getDate()-date.getDay()+6),
					Year:date.getFullYear(),
					WYear:date.getFullYear(),
					Month:date.getMonth()+1,
					Day:date.getDate(),
					YWeeks:0,
					ZYWeeks:'',
					Week:date.getDay(),
					ZWeek:ZWeek[date.getDay()],
					EWeek:EWeek[date.getDay()],
					YDays:0,
					ZYDays:'',
					WDays:date.getDay()+1
				};
				var fristDate = new Date(rs.Year,0,1);
				var fristWeek = fristDate.getDay();
				for(var i=1;i<=date.getMonth();i++){
					rs.YDays += new Date(rs.Year,i,0).getDate();
				}
				rs.YDays += rs.Day;
				rs.ZYDays = getCh(rs.YDays,3);;
				var lastDays = rs.YDays-7+(fristWeek==0?7:fristWeek);
				if(lastDays<=0){
					rs.YWeeks = 52;
					rs.WYear--;
				}else{
					rs.YWeeks = Math.ceil(lastDays/7);
				}
				rs.ZYWeeks = getCh(rs.YWeeks,3);
			}
			return rs;
		};
		return this;
	},
	
	DataCheck : {
		testPhone : function(phone) {
			var isPhone = /^1[3|4|5|8|7][0-9]\d{8}$/;
			return isPhone.test(phone);
		},
		testIdCard : function(idNo) {
			var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			return isIDCard.test(idNo);
		},
		testMail : function(mail) {
			var isMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return isMail.test(mail);
		},
	},
	Filter : {
		target : function(text){
			if(text&&typeof(text)=='string'){
				text = text.replace( /\</g,"&lt;");
				text = text.replace( /\>/g,"&gt;");
				text = text.replace(/\"/g, "&quot;"); 
				text = text.replace(/\'/g, "&apos;");
				text = text.replace(/\&nbsp;/g," "); 
				text = text.replace(/\<br\>/g,"\n");
			}
			return text;
		}
	},
	Random : {
		getRanStr : function(n){//随机数
			n = n?n:1;
			var s = "";
			for (var i = 0; i < n; i++) {
				s = s + Math.floor(Math.random()*10);
			}
			return s;
		},
		getRanColor : function(){//随机色
			var s = "#";
			var col = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
			for (var i = 0; i < 6; i++) {
				s = s + col[Math.floor(Math.random()*15)];
			}
			return s;
		}
	},
	/**
	 * title 文章标题
	 * id 文章id
	 * isUrl 是否启用外部链接
	 * url 外部链接
	 * isHead 是否带头部
	 */
	ArticleClick : function(title,id,isUrl,url,isHead) {
		if(isUrl&&!(isUrl=='false'||isUrl==false)){
			if(!url){
				return;
			}
			url=$.Url(url.indexOf('title')>0?url:(url.indexOf('?')>0?(url+'&title='+title):(url+'?title='+title)));
		}else{
			url = $.Url('/common/article/article?id=' + id + '&title=' + title);
		}
		window.location.href = url + ((isHead==false||isHead=='false')?("&isHead="+isHead):"");
	},
	
	/**
	 * title 文章标题
	 * id 文章id
	 * isUrl 是否启用外部链接
	 * url 外部链接
	 * isHead 是否带头部
	 */
	ReArticleClick : function(title,id,isUrl,url,isHead) {
		if(isUrl&&!(isUrl=='false'||isUrl==false)){
			if(!url){
				return;
			}
			url=$.Url(url.indexOf('title')>0?url:(url.indexOf('?')>0?(url+'&title='+title):(url+'?title='+title)));
		}else{
			url = $.Url('/common/article/article?id=' + id + '&title=' + title);
		}
		return url + ((isHead==false||isHead=='false')?("&isHead="+isHead):"");
	},
	App : {
		/**
		$.App.share({
	 		'share':{
				'title':'微信分享',
				'shImg':'http://www.xxx.com/img.jpg',//图片小与32KB
				'shUrl':'http://www.xxx.com',
				'shDes':'这是一个描述',
				'sType':'weixin'
			}
		});
		*/
		share : function(s){//通知app分享
			if($.Browser.versions.android){
				$.AndroidUtil.send(s);
			}else{
				$.IOSUtil.send(s);
			}
		},
		/**
		$.App.login('/login');
		*/
		login : function(url){//通知app登录
			var s = {'login':{'url':url}};
			if($.Browser.versions.android){
				$.AndroidUtil.send(s);
			}else{
				$.IOSUtil.send(s);
			}
		},
		/**
		$.App.buidingHref({
			'buiding':{
				'type':'20',
				'id':'1234567890sdfadfadf'
			}});
		*/
		buidingHref : function(s){//楼盘详情跳转
			if($.Browser.versions.android){
				$.AndroidUtil.send(s);
			}else{
				$.IOSUtil.send(s);
			}
		},
		/**
		$.App.Images({
			'images':{
				'index':'2',
				'imgs':['aaa.jpg','bbb.jpg']
			}
		});
		*/
		Images : function(s){//多图预览
			if($.Browser.versions.android){
				$.AndroidUtil.send(s);
			}else{
				$.IOSUtil.send(s);
			}
		},
		/**
		name:按钮名;
		icon={edit:编辑,sure:确定,cancle:取消,delete:删除,keep:收藏,share:分享,like:赞}
		$.App.button({
		 	'button':[
		 		{'name':'编辑','icon':'edit','code':'edit','next':['cancle','sure'],'init':true},
		 		{'name':'取消','icon':'cancle','code':'cancle','next':['edit'],'init':false},
		 		{'name':'确定','icon':'sure','code':'sure','next':['edit'],'init':false},
		 		{'name':'收藏','icon':'keep','code':'keep','next':['keep'],'init':true}
		 	]
		});*/
		button : function(s){//为app添加原生按钮
			if($.Browser.versions.android){
				$.AndroidUtil.send(s);
			}else{
				$.IOSUtil.send(s);
			}
		},
		/**
		$.App.accept(function(data){
        	console.log('接受到的app数据为'+data);
    	});*/
		accept : function(fn){//接受app调用
			if($.Browser.versions.android){
				$.AndroidUtil.accept(fn);
			}else{
				$.IOSUtil.accept(fn);
			}
		}
	},
	AndroidUtil : {
		send : function(s){//js发送给app
			try{
				window.AndroidWebView.showInfoFromJs(JSON.stringify(s));
			}catch (e) {
			}
		},
		accept : function(fn){//app发送给js
			window.androidJsHandler=function(data){
				return fn(JSON.parse(data));
			};
		},
	},
	IOSUtil : {
		send : function(s){//js发送给app
			$.IOSUtil.iosBridge(function(bridge) {
				bridge.callHandler('iosJsCallback', s, function(data) {//通知IOS事件--iosJsCallback为IOS-APP定义的回掉函数与IOS同时改动
					return data;
				});
			})
		},
		accept : function(fn){//app发送给js
			$.IOSUtil.iosBridge(function(bridge) {
				bridge.registerHandler('iosJsHandler',fn);
			})
		},
		iosBridge : function(callback) {//创建与IOS的桥接
	        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	        window.WVJBCallbacks = [callback];
	        var WVJBIframe = document.createElement('iframe');
	        WVJBIframe.style.display = 'none';
	        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	        document.documentElement.appendChild(WVJBIframe);
	        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	    },
	},
});
$.extend({
	LoginStatus : function(){
		window.Envparam = {token:$.GetUrlParam('token'),utype:$.GetUrlParam('utype'),title:'瀚铂科技'};
		if(window.sessionStorage){
			var envparam = JSON.parse(window.sessionStorage.getItem("Sys_Envparam"));
			if(envparam&&!Envparam.token){
				Envparam.token = envparam.token;
			}
			if(envparam&&!Envparam.utype){
				Envparam.utype = envparam.utype;
			}
		}
		window.sessionStorage.setItem("Sys_Envparam",JSON.stringify(Envparam))
		$.ajax({
			url : $.Url('/common/bas/islogin'),
			type : 'post',
			data : Envparam,
			timeout:3000,
			dataType : 'json',
			async: false,
			success : function(data) {
				Envparam.islogin=!data.noLogin;
				Envparam.user = data.datas;
				Envparam.message = data.message;
				Envparam.title = data.title?data.title:Envparam.title;
				if(data.noLogin){
					Envparam.loginToUri = data.url;
				}else{
					Envparam.homeUrl = data.url;
					Envparam.utype = Envparam.user?Envparam.user.utype:null;
				}
				if(!$('title').text()){
					$('title').text(Envparam.title);
				}
			},
			error:function(XMLHttpRequest, textStatus, e){
				Envparam.islogin=false;
				Envparam.user = {};
				console.log(e);
			}
		});
	}(),
	Hajax : function(s){
		if(s.url){
			s.url = $.Url(s.url);
		}
		if(!s.data){
			s.data = {};
		}
		if(Envparam.token)s.data.token=Envparam.token;
		if(Envparam.utype)s.data.utype=Envparam.utype;
		s.data.dataType = 'json';
		$.ajax(s);
	},
	MenuUtil : {
		open : function(menuid,url,name){
			if(window.frameElement){
				var pmenuid = window.frameElement.parentNode.getAttribute('menuid');
				window.parent.$HOME.showPage(menuid,url,name,false,pmenuid);
			}
		},
		close : function(reflesh,btn,event){
			$.MenuUtil.closeUtil(false,reflesh,btn,event)
		},
		closeNow : function(reflesh,btn,event){
			$.MenuUtil.closeUtil(true,reflesh,btn,event)
		},
		closeUtil : function(isAjax,reflesh,btn,event){
			if(window.frameElement){
				if(document.referrer==window.parent.location.href||document.referrer==location.href){
					var pNode = $(window.frameElement.parentNode);
					var menuid = pNode.attr('menuid');
					if(menuid){
						var pmenuid = pNode.attr('pmenuid');
						if(reflesh&&pmenuid){
							function thisClose(){
								try{
									var sibody = pNode.siblings('.iframeDiv[menuid="'+pmenuid+'"]').children('iframe')[0].contentDocument.body;
									event = event?event:'click';
									btn = btn?btn:'.query_button';
									$(sibody).find(btn)[event]();
								}catch(e){}
								window.parent.$HOME.delPage(menuid);
							}
							if(isAjax){
								thisClose();
							}else{
								window.onunload = function(){thisClose();};
							}
						}else{
							window.parent.$HOME.delPage(menuid);
						}
					}else{
						alert('未获取到当前菜单标识,无法正常关闭!');
					}
				}else{
					history.back();
				}
			}else{
				window.close();
				alert('非主页框架内,无法正常关闭!');
			}
		}
	}
});
//设置度量单位
(function(doc, win) {
	if($.Browser.versions.mobile){
		var docEl = doc.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange': 'resize', recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth)
				return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
		if (!doc.addEventListener)
			return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	}
})(document, window);

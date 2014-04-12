(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

TINY={};TINY.box=function(){var j,m,b,g,v,p=0;return{show:function(o){v={opacity:70,close:1,animate:1,fixed:1,mask:1,maskid:'',boxid:'',topsplit:2,url:0,post:0,height:0,width:0,html:0,iframe:0};for(s in o){v[s]=o[s]}if(!p){j=document.createElement('div');j.className='tbox';p=document.createElement('div');p.className='tinner';b=document.createElement('div');b.className='tcontent';m=document.createElement('div');m.className='tmask';g=document.createElement('div');g.className='tclose';g.v=0;document.body.appendChild(m);document.body.appendChild(j);j.appendChild(p);p.appendChild(b);m.onclick=g.onclick=TINY.box.hide;window.onresize=TINY.box.resize}else{j.style.display='none';clearTimeout(p.ah);if(g.v){p.removeChild(g);g.v=0}}p.id=v.boxid;m.id=v.maskid;j.style.position=v.fixed?'fixed':'absolute';if(v.html&&!v.animate){p.style.backgroundImage='none';b.innerHTML=v.html;b.style.display='';p.style.width=v.width?v.width+'px':'auto';p.style.height=v.height?v.height+'px':'auto'}else{b.style.display='none';if(!v.animate&&v.width&&v.height){p.style.width=v.width+'px';p.style.height=v.height+'px'}else{p.style.width=p.style.height='100px'}}if(v.mask){this.mask();this.alpha(m,1,v.opacity)}else{this.alpha(j,1,100)}if(v.autohide){p.ah=setTimeout(TINY.box.hide,1000*v.autohide)}else{document.onkeyup=TINY.box.esc}},fill:function(c,u,k,a,w,h){if(u){if(v.image){var i=new Image();i.onload=function(){w=w||i.width;h=h||i.height;TINY.box.psh(i,a,w,h)};i.src=v.image}else if(v.iframe){this.psh('<iframe src="'+v.iframe+'" width="'+v.width+'" frameborder="0" height="'+v.height+'"></iframe>',a,w,h)}else{var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){p.style.backgroundImage='';TINY.box.psh(x.responseText,a,w,h)}};if(k){x.open('POST',c,true);x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(k)}else{x.open('GET',c,true);x.send(null)}}}else{this.psh(c,a,w,h)}},psh:function(c,a,w,h){if(typeof c=='object'){b.appendChild(c)}else{b.innerHTML=c}var x=p.style.width,y=p.style.height;if(!w||!h){p.style.width=w?w+'px':'';p.style.height=h?h+'px':'';b.style.display='';if(!h){h=parseInt(b.offsetHeight)}if(!w){w=parseInt(b.offsetWidth)}b.style.display='none'}p.style.width=x;p.style.height=y;this.size(w,h,a)},esc:function(e){e=e||window.event;if(e.keyCode==27){TINY.box.hide()}},hide:function(){TINY.box.alpha(j,-1,0,3);document.onkeypress=null;if(v.closejs){v.closejs()}},resize:function(){TINY.box.pos();TINY.box.mask()},mask:function(){m.style.height=this.total(1)+'px';m.style.width=this.total(0)+'px'},pos:function(){var t;if(typeof v.top!='undefined'){t=v.top}else{t=(this.height()/v.topsplit)-(j.offsetHeight/2);t=t<20?20:t}if(!v.fixed&&!v.top){t+=this.top()}j.style.top=t+'px';j.style.left=typeof v.left!='undefined'?v.left+'px':(this.width()/2)-(j.offsetWidth/2)+'px'},alpha:function(e,d,a){clearInterval(e.ai);if(d){e.style.opacity=0;e.style.filter='alpha(opacity=0)';e.style.display='block';TINY.box.pos()}e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)},ta:function(e,a,d){var o=Math.round(e.style.opacity*100);if(o==a){clearInterval(e.ai);if(d==-1){e.style.display='none';e==j?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''}else{if(e==m){this.alpha(j,1,100)}else{j.style.filter='';TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height)}}}else{var n=a-Math.floor(Math.abs(a-o)*.5)*d;e.style.opacity=n/100;e.style.filter='alpha(opacity='+n+')'}},size:function(w,h,a){if(a){clearInterval(p.si);var wd=parseInt(p.style.width)>w?-1:1,hd=parseInt(p.style.height)>h?-1:1;p.si=setInterval(function(){TINY.box.ts(w,wd,h,hd)},20)}else{p.style.backgroundImage='none';if(v.close){p.appendChild(g);g.v=1}p.style.width=w+'px';p.style.height=h+'px';b.style.display='';this.pos();if(v.openjs){v.openjs()}}},ts:function(w,wd,h,hd){var cw=parseInt(p.style.width),ch=parseInt(p.style.height);if(cw==w&&ch==h){clearInterval(p.si);p.style.backgroundImage='none';b.style.display='block';if(v.close){p.appendChild(g);g.v=1}if(v.openjs){v.openjs()}}else{if(cw!=w){p.style.width=(w-Math.floor(Math.abs(w-cw)*.6)*wd)+'px'}if(ch!=h){p.style.height=(h-Math.floor(Math.abs(h-ch)*.6)*hd)+'px'}this.pos()}},top:function(){return document.documentElement.scrollTop||document.body.scrollTop},width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},total:function(d){var b=document.body,e=document.documentElement;return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))}}}();

(function(e,h,i){function j(b){return b}function k(b){return decodeURIComponent(b.replace(l," "))}var l=/\+/g,d=e.cookie=function(b,c,a){if(c!==i){a=e.extend({},d.defaults,a);null===c&&(a.expires=-1);if("number"===typeof a.expires){var f=a.expires,g=a.expires=new Date;g.setDate(g.getDate()+f)}c=d.json?JSON.stringify(c):String(c);return h.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+
a.domain:"",a.secure?"; secure":""].join("")}c=d.raw?j:k;a=h.cookie.split("; ");for(f=0;g=a[f]&&a[f].split("=");f++)if(c(g.shift())===b)return b=c(g.join("=")),d.json?JSON.parse(b):b;return null};d.defaults={};e.removeCookie=function(b,c){return null!==e.cookie(b)?(e.cookie(b,null,c),!0):!1}})(jQuery,document);
function downloadfile(href){
	if ($('#cname').val().length<2) {
		alert('请输入姓名。');
	} else if ($('#ccompany').val().length<2) {
		alert('请输入公司名。');
	} else if (!/^1\d{10}$/.test($('#cphone').val())) {
		alert('请输入正确的手机号码。');
	} else if (!/^\d{5,12}$/.test($('#cqq').val())) {
		alert('请输入正确的QQ号码。');
	} else {
		location.href=href;
	}
}
$(function(){
	if($('.slider, .slider2').length>0){
		$('.slider').sliderkit({
			shownavitems:6,
			circular:true,
			navitemshover:false,
			panelfxspeed:400,
			auto:true,
			autostill:true,
			timer:false,
			autospeed:3E3
		});
		$('.slider2').sliderkit({
			auto:!0,
			circular:!0,
			shownavitems:1,
			panelfx:"sliding",
			panelfxspeed:400,
			verticalnav:!0,
			verticalslide:!0,
			autospeed:5E3
		});
		$('.slider2').css({
			top: $('.slider .sliderkit-nav').offset().top - 110
		});
	}
	if($('.acc1, .acc2, .acc3').length>0){
		$('.acc1').hoverIntent(function(){
			$('.accordion2').css({width: '80px'}).animate({left: '360px'}, 200, function(){$('.accordion1').css({width: '360px'});});
			$('.accordion3').css({width: '80px'}).animate({left: '440px'}, 200);
		}, function(){});
		$('.acc2').hoverIntent(function(){
			$('.accordion1').css({width: '80px'});
			$('.accordion2').animate({left: '80px'}, 200, function(){$(this).css({width: '360px'});});
			$('.accordion3').css({width: '80px'}).animate({left: '440px'}, 200);
		}, function(){});
		$('.acc3').hoverIntent(function(){
			$('.accordion1').css({width: '80px'});
			$('.accordion2').css({width: '80px'}).animate({left: '80px'}, 200);
			$('.accordion3').animate({left: '160px'}, 200, function(){$(this).css({width: '360px'});});
		}, function(){});
	}
	$('.tabbtn').bind('click',function(){
		var i=$(this).parent().index();
		$('.tabbtn').removeClass('sel');
		$(this).addClass('sel');
		$('.maincontent div.mc').hide();
		$('.maincontent div').eq(i).show();
	});
	if($('#etalage').length==1){
		$('#etalage').etalage({
			thumb_image_width: 300,
			thumb_image_height: 300,
			source_image_width: 600,
			source_image_height: 600,
			zoom_area_width: 300,
			zoom_area_height: 300,
			zoom_area_distance: 5,
			small_thumbs: 4,
			smallthumb_inactive_opacity: 0.3,
			smallthumbs_position: 'bottom',
			speed: 200,
			show_icon: false,
			autoplay: false,
			keyboard: false,
			zoom_easing: false
		});
	}
	$('.dllist').find('a.dllnk, a.dllnken').click(function(){
		var f=$(this).attr('data-href');
		TINY.box.show({html:'<table>'+
		'<tr><td colspan="2">要下载文件，请提供你的信息以便联系</td></tr>'+
		'<tr><td>姓名 <span style="color:#ff0000">*</span></td><td><input id="cname" /></td></tr>'+
		'<tr><td>公司 <span style="color:#ff0000">*</span></td><td><input id="ccompany" /></td></tr>'+
		'<tr><td>手机 <span style="color:#ff0000">*</span></td><td><input id="cphone" /></td></tr>'+
		'<tr><td>QQ <span style="color:#ff0000">*</span></td><td><input id="cqq" /></td></tr>'+
		'<tr><td>地址</td><td><input id="caddress" /></td></tr>'+
		'<tr><td></td><td><a href="javascript:;" onclick="downloadfile(\''+f+'\');" id="dlbtn" class="dllnk">下载</a></td></tr>'+
		'</table>',width:300,height:200});
		/*
		$.getJSON('/plus/download.php?'+($(this).hasClass('dllnken')?'lang=en&':'')+Math.random(),function(d){
			TINY.box.show({html:'<table class="dlconfirm" style="width:100%; height:200px"><tr><td style="vertical-align: middle">'+d.html.replace('{HREF}',f)+'</td></tr></table>',width:300,height:200});
		});*/
		return false;
	});
	if ($('#userlogin').length==1) {
		$.getJSON('/plus/member.php?'+(location.href.indexOf('/en/')!=-1?'lang=en&':'')+Math.random(),function(d){$('#userlogin').html(d.html)});
	}
});

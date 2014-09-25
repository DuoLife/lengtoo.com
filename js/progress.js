/*
	author: xuming;
	eMail: vip6ming@126.com;
	date: 2014年8月7日10:50:23;
*/
window.onload = function () {
	var isNow = 0;
	var oProgress_d = document.getElementById('progress_d');
	var aImg = document.getElementsByTagName('img');
	var oPB = document.getElementById('progressBox');
	var oWrapper = document.getElementById('wrapper');
	for(var i=0; i<aImg.length; i++) {
		(function(i) {
			var yImg = new Image();
			yImg.onload = function() {
				isNow++;
				progressFn(parseInt(isNow/aImg.length*100));
				if(isNow == aImg.length) {
					//move(oProgress_d, {opacity: 0});
					oProgress_d.style.display = 'none';
					oWrapper.style.display = 'block';
					//move(oWrapper, {opacity: 100});
				}
			};
		yImg.src = aImg[i].src;
		})(i);
	}
	function progressFn(cent) {
		var oPB = document.getElementById('progressBox');
		var oBar = document.getElementById('progressBar');
		var oCentP = document.getElementById('percentP');
		
		oBar.style.width = parseInt(getStyle(oPB,'width')) * cent/100 + 'px';
		oCentP.innerHTML = cent + '%';
	}
};
function getStyle( obj, attr) {
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
function move(obj, json, fn) {
	if(json.opacity) {
		var iiCur = parseInt(parseFloat(getStyle(obj, 'opacity'))*100);
	}
	clearInterval(obj.timer);
	obj.timer = setInterval( function () {
		//多值运动的标志位
		var isStop = true;
		var iCur = 0;
		for(var a in json) {
			var attr = a;
			var iTarget = json[a];
			//alert(a+' : '+iTarget);
			if(attr == 'opacity') { 
				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
			}else {
				iCur = parseInt(getStyle(obj, attr));
			}
			//速度的获取必须放在定时器内，这样速度值才会发生变化。
			var iSpeed = (iTarget-iCur)/8;  
			//注意小数，发生抖动
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//判断是否终止运动
			if(iCur != iTarget) {
				isStop = false;
			}
			if(attr == 'opacity') {
				iiCur += iSpeed;
				obj.style.filter = 'alpha(opacity:' + iiCur + ')';
				obj.style.opacity = iiCur/100;
			}else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		if(isStop){ 
			clearInterval(obj.timer);
			fn && fn();
		}
	},30);
}
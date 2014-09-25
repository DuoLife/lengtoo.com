/*
	author: xuming;
	eMail: vip6ming@126.com;
	date: 2014年8月7日14:58:40;
*/
window.onload = function () {
	var aPos = [
		[180, 550, 380, 100],
		[200, 60, 420, 600],
		[350, 80, 700, 80],
		[350, 60, 700, 240],
		[350, 650, 470, 80]
		
	];
	var oLst = document.getElementById('lst');
	var aLi = oLst.getElementsByTagName('li');
	var num = 0;
	window.onscroll = function () {
		var site = document.body.scrollTop || document.documentElement.scrollTop;
		if(site > 80) {
			addEvent(document, 'mousewheel', mouseMove);
			addEvent(document, 'DOMMouseScroll', mouseMove);
			hidden();
			num = 0;
			show();
		}
		if(site > (1020+80)) {
			hidden();
			num = 1;
			show();
		}
		if(site > (1020*2+80)) {
			hidden();
			num = 2;
			show();
		}
		if(site > (1020*3+80)) {
			hidden();
			num = 3;
			show();
		}
		if(site > (1020*4+80)) {
			addEvent(document, 'mousewheel', mouseMove);
			addEvent(document, 'DOMMouseScroll', mouseMove);
			hidden();
			num = 4;
			show();
		}
	};
	function show() {
		var aImg = aLi[num].getElementsByTagName('img');
		changeOpacity(aImg[0],100);
		changeOpacity(aImg[1],100);
		startMove(aImg[0], aPos[num][0], 'top');
		startMove(aImg[1], aPos[num][2], 'top');
	}
	function hidden() {
		var aImg = aLi[num].getElementsByTagName('img');
		changeOpacity(aImg[0], 0);
		changeOpacity(aImg[1], 0);
		startMove(aImg[0], aPos[num][0]+200, 'top');
		startMove(aImg[1], aPos[num][2]-200, 'top');
	}
	function changeOpacity(obj, iTarget) {
			clearInterval(obj.otimer);
			obj.otimer = setInterval(function () {
				var iCur = parseInt(parseFloat(getStyle(obj, 'opacity'))*100);
				var iSpeed = (iTarget-iCur) / 20;    
				iSpeed = iSpeed>0? Math.ceil(iSpeed):Math.floor(iSpeed);
				if(iCur==iTarget) {
					clearInterval(obj.otimer);
				}else {
					obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity = (iCur+iSpeed)/100;
				}
				//document.title = iCur+'速度：'+iSpeed;
				
			},30);
	}
	function startMove(obj, iTarget, attr) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			var temp = parseInt(getStyle(obj, attr));
			var iSpeed = (iTarget-temp) / 12;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
			obj.style[attr] = temp + iSpeed +"px";
			//document.title = iSpeed;
			if(temp == iTarget) {
				clearInterval(obj.timer);
			}
		},30);
	}
	function getStyle( obj, attr ) {return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]}
	function screenMove(obj, iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			var iCur = document.body.scrollTop || document.documentElement.scrollTop;
			var iSpeed = (iTarget-iCur)/8;
			iSpeed = iSpeed > 0? Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur == iTarget) {
				clearInterval(obj.timer);
			}else {
				obj.body.scrollTop= (iCur + iSpeed);
				obj.documentElement.scrollTop= (iCur + iSpeed);
				//text.value = iCur+" iSpeed:"+iSpeed;
			}
		},30);
	}
	function mouseMove (ev) {
		var oEvent = ev || window.event;
		if(oEvent.wheelDelta>0 || oEvent.detail<0){
			if(num==0) {
				document.body.scrollTop = 0;
				rmEvent(document, 'mousewheel', mouseMove);
				rmEvent(document, 'DOMMouseScroll', mouseMove);
			}else {
				hidden();
				num--;
				num %= 5;
				screenMove(document, 1020*num+100);
			}
			//alert('shang');
		}else if(oEvent.wheelDelta<0 || oEvent.detail>0){
			if(num==4) {
				rmEvent(document, 'mousewheel', mouseMove);
				rmEvent(document, 'DOMMouseScroll', mouseMove);
			}else {
				hidden();
				num++;
				num %= 5;
				screenMove(document, 1020*num+100);
			}
			//alert('xia');
		}
	}
	function addEvent (obj, ev, fn) {
		if(obj.attachEvent) {
			obj.attachEvent('on' + ev, fn);
			//alert('go');
		}else {
			obj.addEventListener(ev, fn, false);
		}
	}
	function rmEvent(obj, ev, fn) {
		if(obj.detachEvent) {
			obj.detachEvent('on' + ev, fn);
		}else {
			obj.removeEventListener(ev, fn, false);
		}
	}
};
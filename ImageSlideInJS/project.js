function getID(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

var index=0;
var timer=null;
var pics=getID("banner").getElementsByTagName("div");
var len=pics.length;
var dots=getID("dots").getElementsByTagName("span");
var next_butt=getID("next");
var prev_butt=getID("prev");
var menu=getID("menu_content");
var menuItems=menu.getElementsByTagName("div");
var subMenu=getID("sub_menu");
var innerBox=subMenu.getElementsByClassName("inner_box");
console.log(menu);

function slideImg(){
	var main=getID("main");
	// the scroll fucntion off when mouse is on the picture
	main.onmouseover=function(){
		if(timer){
			clearInterval(timer);
		}
	}
	// the scroll fucntion off when mouse is off the picture
	main.onmouseout=function(){
		timer=setInterval(function(){
			index++;
			index=index%len;
			// console.log(index);
			changeImg();
		},2000);
	}
	// the scroll function works at the very beginning
	main.onmouseout();

	// change the pics by dots
	// for each dot, give it a onclick event
	for(var d=0; d<len; d++){
		dots[d].id='dot'+d;
		dots[d].onclick=function(){
			console.log("hi");
			index=this.id.slice(3,);
			changeImg();
		}
	}
	
	next_butt.onclick=function(){
		index++;
		// if(index>=len) index=0;
		index=index%len;
		changeImg();
	}
	prev_butt.onclick=function(){
		index--;
		if(index<0) index=len-1;
		changeImg();
	}

	for(var m=0; m<menuItems.length; m++){
		menuItems[m].id='menu'+m;
		menuItems[m].onmouseover=function(){
			var idx=this.id.slice(4,);
			for(var j=0; j<innerBox.length; j++){
				innerBox[j].style.display='none';
				menuItems[j].style.background='none';
			}
			subMenu.className="sub_menu";
			innerBox[idx].style.display='block';
			menuItems[idx].style.background='rgba(0,0,0,0.1)';
			// console.log(innerBox[idx]);
		}
	}
	menu.onmouseout=function(){
		subMenu.className="sub_menu hide";
	}
	subMenu.onmouseover=function(){
		this.className='sub_menu';
	}
	subMenu.onmouseout=function(){
		this.className="sub_menu hide";
	}
}
//choose the picture based on the index
function changeImg(){
	for (var i=0; i<len; i++) {
		pics[i].style.display='none';
		dots[i].className='';
	}
	pics[index].style.display='block';
	dots[index].className='active';
}
slideImg();
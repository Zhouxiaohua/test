"use strict";
window.onload = function(){
	var snake = document.getElementById('snake');
	var divs = document.getElementById("divs");
	var gameover = document.getElementById("gameover");
//	得分
	var score1 = document.getElementById("score1");
//	最终得分
    var score2 = document.getElementById("score");
//  重新开始按钮
    var reset = document.getElementById("reset");
    reset.onclick = function(){
    	    history.go(0);
    }
    	var i =20;
    	var snakelength = 0;
//  	move1,move2作用是当向前走的时候不能向后走
    	var move1 = true;
    	var move2 = true;
    	var timer = null;
//  	存储的是蛇身
    	var array = [];
//  	存储的是蛇身每一段的位置,随着定时器的运行一直在改变
    	var arrayAddress = [];
//  	声明一个布尔值判断是否出现青蛙
    	var apper = true;
    	var frog = document.getElementById("frog");
    	var a = 0;
    	var b = 0;
//  	得分
    	var score = 0;
//  	用来判断是否咬到自己
    	var c = 0;
//  	console.log(array);
//蛇移动的函数
	function move(argument1,argument2,argument3){
		clearInterval(timer);
		timer = setInterval(function(){
			array = document.getElementsByClassName("snake");
//			存储每一段蛇身应该在哪个位置
			arrayAddress.pop();
			arrayAddress.unshift({left:snake.offsetLeft,top:snake.offsetTop});
//			console.log(arrayAddress);
//			console.log(array);
//          if(array.length>=1){
	            	for (var i = 0;i<array.length;i++) {
					array[i].style.left = arrayAddress[i].left+"px";
					array[i].style.top = arrayAddress[i].top+"px";
				}
//          }
//判断是否咬到自己
			for(var j = 1;j<array.length;j++){
				if(snake.offsetLeft==arrayAddress[j].left&&snake.offsetTop==arrayAddress[j].top){
					console.log("gameover");
					clearInterval(timer);
        				gameover.style.display = "block";
        				score2.innerHTML = "您的最终得分为:"+score+"分";
//      				return ;
				}
			}
//			console.log(arr);
//			console.log(snake.offsetTop);
			if(argument2=="offsetLeft"){
				snake.style.left = snake.offsetLeft+argument3+"px";
			}else{
				snake.style.top = snake.offsetTop+argument3+"px";
			}
//			如果蛇头与青蛙的位置一样则改变青蛙的位置，表示吃到了青蛙，自身长度加一，新建一个蛇身
			if(snake.offsetLeft==frog.offsetLeft&&snake.offsetTop==frog.offsetTop){
				apper = true;
//				克隆一个蛇身
				var snakeclone = document.createElement("div");
				snakeclone.className = "snake";
				divs.appendChild(snakeclone);
				a = snake.offsetLeft;
				b = snake.offsetTop;
				arrayAddress.push({left:a,top:b});
//				如果吃到一个青蛙加十分
				score+=10;
				score1.innerHTML = "得分："+score;
			}
//			判断是否出现新青蛙
			if(apper){
				frog.style.display = "block";
				console.log("1");
				frog.style.left = frogApper("X")*20+"px";
				frog.style.top = frogApper("Y")*20+"px";
				apper = false;
			}
//			如果撞到墙壁,游戏结束出现最终得分
			if (snake.offsetTop>880) {
        			snake.style.top = 880 + "px";
           		clearInterval(timer);
           		gameover.style.display = "block";
           		score2.innerHTML = "您的最终得分为:"+score+"分";
       	 	}
			if (snake.offsetLeft<0) {
        			snake.style.left = 0 + "px";
        			clearInterval(timer);
        			gameover.style.display = "block";
        			score2.innerHTML = "您的最终得分为:"+score+"分";
      	  	}
			if (snake.offsetTop<0) {
        			snake.style.top = 0 + "px";
        			clearInterval(timer);
        			gameover.style.display = "block";
        			score2.innerHTML = "您的最终得分为:"+score+"分";
        		}
			if (snake.offsetLeft>980) {
        			snake.style.left = 980 + "px";
        			clearInterval(timer);
        			gameover.style.display = "block";
        			score2.innerHTML = "您的最终得分为:"+score+"分";
       	 	}
		},100)
	}
//	W键为上;A键为左;S键为下;D键为右
	document.onkeydown = function () {
//		clearInterval(timer);
    		var event = event || window.event;
    		// S键
    		if (event&&event.keyCode==83&&move2==true) {  
    			move("top","offsetTop",i);
    			move2 = false;
    			move1 = true;
    		}
    		// A键
    		if (event&&event.keyCode==65&&move1==true) {
    			move("left","offsetLeft",-i);
    			move2 = true;
    			move1 = false;
    		}
    		// W键
    		if (event&&event.keyCode==87&&move2==true) {
    			move("top","offsetTop",-i);
    			move2 = false;
    			move1 = true;
//  		console.log(snake.offsetTop);
    		}
    		// D键
    		if (event&&event.keyCode==68&&move1==true) {
    			move("left","offsetLeft",i);
    			move1 = false;
    			move2 = true;
//  			console.log("D");
    		}
    	}
}
//随机数获得青蛙出现的坐标,argument为判断返回X还是Y
function frogApper(argument){
	var randomX = parseInt(Math.random()*50);
	var randomY = parseInt(Math.random()*40);
	if(argument=="X"){
		return randomX;
	}
	if(argument=="Y"){
		return randomY;
	}
}


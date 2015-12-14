(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;
var maxPage = 22;

document.addEventListener("touchmove",function(event){
	event.preventDefault(); },false);

$('img.next,img.img_submit').click(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != maxPage) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
})
$('img.index_btn').click(function(){
	$('#qa').removeClass('hide');
	$('#index').addClass('hidden');
})
function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	switch(tw) {
		case towards.up:
			outClass = "page-moveToTop";
			inClass = "page-moveFromBottom";
			break;
		case towards.down:
			outClass = "page-moveToBottom";
			inClass = "page-moveFromTop";
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	setTimeout(function(){
		$(lastPage).removeClass("page-current");
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		
		$(nowPage).addClass("page-current");
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		$(nowPage).find(".text").removeClass("hide");
		
		isAnimating = false;
	},1000);
	if (nowPage==='.page-2-1' || nowPage==='.page-4-1'|| nowPage==='.page-6-1'|| nowPage==='.page-8-1'|| nowPage==='.page-10-1'|| nowPage==='.page-12-1'|| nowPage==='.page-14-1'|| nowPage==='.page-16-1'|| nowPage==='.page-18-1'|| nowPage==='.page-20-1') {
		setTimeout(function(){
			$('.right.page').eq(QA.i0-1).find('img.man').attr('src','./images/success01.png');
		},1200);
	}
}
})();

function randomSort(a,b){
	return Math.random()-0.5;
}
$(document).ready(function(){
	QA = {
		a_word : ['中','暴','衣','简','纯','你','好','兼','获','活','雨','同','将','黄','美','光','色','花','广','逛','谈','量','亮','靓','从','聪','葱','元','愿','球','偶','周'],
		a1:['取','经'],
		a2:['瓦','斯','外','泄'],
		a3:['1'],
		a4:['名','字'],
		a5:['瞳','孔'],
		a6:['抵','制','日','货'],
		a7:['结','婚'],
		a8:['油'],
		a9:['都','是','虫','子','惹','的','祸'],
		a10:['玉','米'], 
		q1:'孙悟空与苍井空的相似之处？',
		q2:'比「春光外泄」更严重的是什么？',
		q3:'每隔1分钟打1炮，10分钟共打多少炮？',
		q4:'什么玩意儿，可长可短，西方人比较长，东方人比较短？',
		q5:'人体的那个部位在受到外界的刺激后会涨大数倍？',
		q6:'嫖客罢嫖，打一个历史用语？',
		q7:'离婚的主要起因是什么？',
		q8:'厨房里通常哪种调味品先用完？',
		q9:'烂掉的萝卜跟怀孕的女人有什么共同特点？',
		q10:'什么东西长在半中腰，有皮又有毛，长有五六寸，子孙里面包?',
		qRandom : [1,2,3,4,5,6,7,8,9,10].sort(randomSort), //将问题的呈现顺序随机化
		i:0,
		i0:0,
		a_length:0,
		a_obj:new Object(),
		score:0,
		setQA : function(){
			var num = String(this.qRandom[this.i]);
			var Qobj = eval('QA.q'+num);//转换为对象
			var Aobj = this.a_obj = eval('QA.a'+num);//转换为对象
			this.a_length = Aobj.length;
			var a_wordNum = 12-Aobj.length;//非答案字数
			var newWordList = new Array(); //将答案中的字数组随机排列
			//kingvid modify 9.01 start
			if (num == '3') {
				newWordList = [0,1,2,3,4,5,6,7,8,9];
				$('.select_answer').addClass('math');
			}else{
				$('.select_answer').removeClass('math');
				newWordList = Aobj.concat(this.a_word.sort(randomSort).slice(0,a_wordNum)).sort(randomSort);
			}
			//kingvid modify 9.01 end
			var $answer = $('.answer').eq(this.i);
			$answer.find('.q_content p span').text(Qobj);//设置问题
			$answer.find('.select_answer li').each(function(i){  //设置答案贴士
				$(this).text(newWordList[i]);
			})
			$answer.find('.box-wrapper').addClass('_'+Aobj.length);
			return this;
		},
		word_click:function(){
			var $answer = $('.answer').eq(this.i);
			$answer.find('.select_answer > ul > li').click(function(){
				var word = $(this).text();
				$answer.find('.box-wrapper > li.key').each(function(){
					if ($(this).text() === '') {
						$(this).text(word);
						return false;
					}
				})
			})
			$('.box-wrapper > li.key').click(function(){
				$(this).text('');
			})
			return this;
		},
		submit:function(){
			$('img.img_submit').click(function(e){
				e.preventDefault();
				var tORf = true;
				var $answer = $('.answer').eq(QA.i);
				$answer.find('.box-wrapper > li.key').each(function(i){
					if (i<QA.a_length) {
						if (QA.a_obj[i] !== $(this).text()) tORf = false;
					}else return false;
				})
				if (tORf) {
					QA.score +=10;
					$(this).parents('.page').next('.right').removeClass('hidden');
				}else{
					$(this).parents('.page').next().next('.wrong').removeClass('hidden');
				}
				if (QA.i<9) {
					QA.i++;
					QA.setQA().word_click();
				}
				QA.i0++;
			})
			return this;
		},
		more : function(){
			$('img.more').click(function(){
				window.location = "index.html";
			})
			return this;
		},
		share : function(){
			$('img.share').click(function(){
				$('.moment_share').removeClass('hidden');
			})
			$('#share_back').click(function(){
				$('.moment_share').addClass('hidden');
			})
		}

	}
	QA.setQA().word_click().submit().more().share();
})
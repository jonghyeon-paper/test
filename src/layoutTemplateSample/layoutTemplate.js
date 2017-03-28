(function(){
}());

var LayoutTemplate = function() {
	
	/* ********************************* default ******************************** */
	/*
	┌────target(div)────────────────────────────────
	│ ┌────customize area(div)──────────────────────
	│ │ ┌────button area(div)───────────────────────
	│ │ │ customizeButton / viewButton              
	│ │ │                                           
	│ │ ┌────data area(div)─────────────────────────
	│ │ │ insertButton                              
	│ │ │                                           
	│ ┌────real area(div)──  ┌────view area(div)──  
	│ │                      │                      
	│ │                      │                      
	 */
	
	// customize area DOM
	var $customizeButton = $('<a>').attr({href: '#', onclick: 'return false;', id: 'customizeButton'})
	                               .css({color: '#fff', 'text-decoration': 'none'})
	                               .html('CUSTOMIZE MODE')
	                               .on('mouseenter', function(){$(this).css({color: '#000'});})
	                               .on('mouseleave', function(){$(this).css({color: '#fff'})});
	
	var $viewButton = $('<a>').attr({href: '#', onclick: 'return false;', id: 'viewButton'})
	                          .css({color: '#fff', 'text-decoration': 'none'})
	                          .html('VIEW MODE')
	                          .on('mouseenter', function(){$(this).css({color: '#000'});})
	                          .on('mouseleave', function(){$(this).css({color: '#fff'})});;
	
	var $buttonArea = $('<div>').attr({id: 'buttonArea'})
	                            .css({padding: '10px', 'text-align': 'center', 'background-color': '#ced9ff', 'box-shadow': '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)'})
	                            .append($customizeButton)
	                            .append($viewButton);
	
	var $insertButton = $('<a>').attr({href: '#', onclick: 'return false;', id: 'insertbutton'})
	                            .css({width: '75px', height: '35px', display: 'inline-block', 'background-color': '#fff', color: '#000', 'text-align': 'center', 'text-decoration': 'none', 'font-size': '17px', border: '1px solid #cccccc'})
	                            .html('ADD');
	
	var $dataArea = $('<div>').attr({id : 'dataArea'})
	                          .css({width: '100%', height : '260px', 'background-color': '#f1f1f1', display: 'none'})
	                          .append($('<div>').css({margin: '10px 0 0 5px', width: '95%', height: '35px'}).append($insertButton));
	
	var $customizeArea = $('<div>').attr({id: 'customizeArea'})
	                               .css({width: '100%', disalay: 'none'})
	                               .append($buttonArea)
	                               .append($dataArea);
	
	// real area DOM
	var $realArea = $('<div>').attr({id : 'realArea'})
	                          .css({width: '100%', height: '100%', display: 'none'});
	
	// view area DOM
	var $viewArea = $('<div>').attr({id : 'viewArea'})
	                          .css({width: '100%', height: '100%', display : 'none'});
	
	// customize area event bind
	$customizeArea.find('#insertbutton').on('click', function(){
		var targetWidth = parseInt($('#' + targetId).innerWidth(), 10);
		var targetheight = parseInt($('#' + targetId).innerHeight(), 10);
		
		var contentWidth = Math.floor((targetWidth - 30) / 4);
		contentWidth = contentWidth % 2 === 0 ? contentWidth : contentWidth - 1;
		var addWidthSize = contentWidth;
		
		var contentheight = Math.floor(contentWidth * 3 / 4);
		addHeightSize = addHeightSize % 2 === 0 ? addHeightSize : addHeightSize - 1;
		var addHeightSize = contentheight;
		
		console.log("contentWidth >> " + contentWidth);
		console.log("contentheight >> " + contentheight);
		console.log("addWidthSize >> " + addWidthSize);
		console.log("addHeightSize >> " + addHeightSize);
		
		var $targetContent = $dataArea.find('li[class*=on]');
		
		if ($targetContent.length > 0) {
			$targetContent.each(function(){
				var widthSize = $(this).data('tempWidth') ? $(this).data('tempWidth') : contentWidth + 'px';
				$(this).removeData('tempWidth');
				var heightSize = $(this).data('tempHieght') ? $(this).data('tempHieght') : contentheight + 'px';
				$(this).removeData('tempHieght');
				
				var $removeButton = $('<button>').attr({type : 'button'}).html('X').on('click', function() {addContentData($(this).parent().parent().parent().data('data')); $(this).parent().parent().parent().remove();})
				
				var $title = $('<div>').css({width: '100%', cursor: 'move'})
				                       .append($('<div>').css({float: 'left', width: '80%', 'text-align': 'center'}).html($(this).data('data').title))
				                       .append($('<div>').css({float: 'left', width: '20%', 'text-align': 'center'}).append($removeButton));
				
				var $div = $('<div>').attr({id: 'content-' + $(this).data('data').id})
				                     .css({float: 'left', border: '1px dashed #dddddd', width: widthSize, height: heightSize})
				                     .append($title)
				                     .append(makeViz(contentItem.url)) // 설정영역에서 실제화면 노출
				                     .data('data', $(this).data('data'));
				
				$div.resizable({
					grid: [addWidthSize, addHeightSize]
				});
				
				$viewArea.append($div);
				
				$(this).remove();
			});
			
		}
	});
	
	// button area event bind
	$buttonArea.find('#customizeButton').on('click', function() {
		// 뷰, 사용자정의 영역 컨트롤
		$customizeButton.hide();
		$viewButton.show();
		
		$dataArea.show();
		$viewArea.show();
		$realArea.hide();
	}).end().find('#viewButton').on('click', function(){
		// 리얼영역 리셋
		$realArea.find('> div[id^=content-]').remove();
		
		// 뷰, 사용자정의 영역 컨트롤
		$customizeButton.show();
		$viewButton.hide();
		
		$dataArea.hide();
		$viewArea.hide();
		$realArea.show();

		// 사용자정의 데이터 저장(내부 객체에 저장)
		saveCustomizeData();
		
		// 실재영역에 컨텐츠를 그린다.
		drawRealArea();
		
		// 사용자정의 함수로 데이터 저장
		if (saveFunction !== null) {
			saveFunction.call(this, layoutTemplateInformation);
		}
		
		// 사용자정의 함수로 데이터 후처리
		if (afterSaveFunction !== null) {
			afterSaveFunction.call(this, layoutTemplateInformation);
		}
	});
	
	/* ********************************* function ******************************** */
	
	// 컨텐츠 데이터를 그린다.
	var drawConetentData = function() {
		if (contentArray.length < 1) {
			return false;
		} 
		
		var $contentUl = $('<ul>').css({'list-style-type': 'none', width: '150px'});
		for (var i = 0; i < contentArray.length; i++) {
			$contentUl.append($('<li>').html(contentArray[i].title)
			                           .attr({id: 'content-' + contentArray[i].id})
			                           .data('data', contentArray[i]) // json 데이터(데이터를 보려면 string으로 변환해서 속성으로 추가하면 됨)
			                 );
		}
		$dataArea.append($contentUl);
		
		$contentUl.on('click', 'li', function() {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on').css({'background-color' : ''});
			} else {
				$(this).addClass('on').css({'background-color' : 'yellow'});
			}
		});
	};
	
	// 컨텐츠 데이터를 추가한다.
	var addContentData = function(data) {
		$dataArea.find('ul').append($('<li>').attr({id: 'content-' + data.id})
		                                     .html(data.title)
		                                     .data('data', data)
		                           );
	};
	
	// 사용자정의 데이터 저장
	var saveCustomizeData = function() {
		var contentList = [];
		$viewArea.find('div[id^=content-]').each(function(){
			var temp = $(this).data('data');
			temp.width = $(this).innerWidth();
			temp.height = $(this).innerHeight();
			
			contentList.push($(this).data('data'));
		});
		
		layoutTemplateInformation = {
				targetId : targetId,
				contents : contentList
		};
		
		console.log(JSON.stringify(layoutTemplateInformation));
	};
	
	// 위젯을 그린다.
	var drawLayoutTemplate = function() {
		drawConetentData();
		
		$viewArea.sortable();
		
		$('#' + targetId).append($customizeArea)
		                 .append($realArea)
		                 .append($viewArea);
		
		// 뷰 영역 컨트롤, 버튼 컨트롤
		$customizeButton.show();
		$viewButton.hide();
		$viewArea.hide();
		$realArea.show();
	};
	
	// 전달받은 설정정보로 위젯을 그린다.
	var drawDataLayoutTemplate = function() {
		console.log(JSON.stringify(layoutTemplateInformation));
		
		var contentArray = layoutTemplateInformation.contents;
		for (var cIndex in contentArray) {
			var contentItem = contentArray[cIndex];
			
			// (뷰영역 적용) 컨텐츠 선택
			$dataArea.find('ul > li[id=content-' + contentItem.id + ']').data('temp-width', contentItem.width).data('temp-height', contentItem.height).click();
		}
		// (뷰영역 적용) 컨텐츠 > 컨텐츠 적용
		$customizeArea.find('#insertbutton').click();
		
		// 실재영역에 컨텐츠를 그린다.
		drawRealArea();
		
		// 사용자정의 함수로 데이터 후처리
		if (afterSaveFunction !== null) {
			afterSaveFunction.call(this, layoutTemplateInformation);
		}
		
		// 뷰, 사용자정의 영역 컨트롤
		$customizeButton.show();
		$viewButton.hide();
		$viewArea.hide();
		$realArea.show();
	};
	
	// 실재영역에 컨텐츠를 그린다.
	var drawRealArea = function() {
		var contentArray = layoutTemplateInformation.contents;
		for (var cIndex in contentArray) {
			var contentItem = contentArray[cIndex];
			var $div = $('<div>').attr({id: 'content-' + contentItem.id})
			                     .css({float: 'left', width: contentItem.width + 'px', height: contentItem.height + 'px'})
			                     .append(makeViz(contentItem.url))
			                     .appendTo($realArea);
		}
		
		$realArea.show();
	};
	
	// 태블로영역 객체 생성
	var makeViz = function(vizUrl) {
		var $template = $("#" + contentTemplateId).clone();
		$template.attr("id", "").removeClass("hide");
		
		nextbi.common.tableau.initViz($template, vizUrl, {
			onFirstInteractive : function(targetViz, today, format) {
				console.log('viz initialized.');
			}
		});
		return $template;
	}
	
	/* ********************************* process ******************************** */
	
	// variable
	var targetId = null;
	var contentArray = [];
	var contentTemplateId = null;
	var saveFunction = null;
	var afterSaveFunction = function(data) {
		var $realArea = $('#' + data.targetId + ' > #realArea');
		
		var contentArray = data.contents;
		for (var cIndex in contentArray) {
			var contentItem = contentArray[cIndex];
			var $div = $('<div>').attr({id: 'content-' + contentItem.id})
			                     .css({float: 'left', border: '1px solid #dddddd', width: contentItem.width + 'px', height: contentItem.height + 'px', 'text-align': 'center'})
			                     .append($('<div>').html(contentItem.title))
			                     .appendTo($realArea);
		}
		
		$realArea.show();
	};
	
	var layoutTemplateInformation = {};
	
	this.setTargetId = function(divId) {
		targetId = divId;
	};
	
	this.setContentArray = function(data) {
		contentArray = data;
	};
	
	this.setContentTemplateId = function(divId) {
		contentTemplateId = divId;
	};
	
	this.setSave = function(func) {
		if (typeof func === 'function') {
			saveFunction = func;
		}
	};
	
	this.setAfterSave = function(func) {
		if (typeof func === 'function') {
			afterSaveFunction = func;
		}
	};
	
	this.getLayoutTemplateData = function() {
		return layoutTemplateInformation;
	};
	
	this.draw = function(data) {
		drawLayoutTemplate();
		
		if (data !== null && data !== undefined && data !== '') {
			layoutTemplateInformation = JSON.parse(data);
			drawDataLayoutTemplate();
		}
	};
	
	return this;
};

/////////////////////////////////////////////////////////////////////////////

function getAllCookies() {
	var result = '';
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		result += cookies[i] + '<br>';
	}
	return result;
}

function getCookie(name) {
	var result = '';
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].indexOf(name) > -1) {
			return cookies[i].replace(name + '=', '');
		}
	}
	return result;
}

var setCookie = function(name, value, expiredays) {
	var todayDate = new Date();
	if (expiredays == null) {
		expiredays = 30;
	}
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + '=' + value + '; path=/; expires=' + todayDate.toGMTString() + ';';
}
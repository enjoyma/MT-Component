/**
 * 基于jQuery的自定义样式Radio
 * @param  {[type]} $      [description]
 * @param  {[type]} window [description]
 * @return {[type]}        [description]
 * 2014-11-30   马厅  hzmating
 */
(function($, window) {
    $.nRadio = function(){
        return new nRadio();
    };
    var nRadio = function(){
        this.init = function(elems){//elem为元素数组,$元素均可
            var $radios = this.radioFilter(elems);
            if($radios.length){
            	this.makenRadio($radios);
            }
        };
    	this.radioFilter = function(elems){
    		var radios = [];
    		var n = elems.length, i = 0;
    		for(;i<n;i++){
    			elems[i].tagName.toLowerCase() == "input" && 
    			elems[i].type.toLowerCase() == "radio" && 
    			elems[i].name != "" && radios.push(elems[i]);
    		}
    		return $(radios);
    	};
    	this.makenRadio = function($radios){
    		console.log($radios);
    		//wrap radios
    		$radios.each($.proxy(function(num, radio){
    			$(radio).wrap($(radio.checked ? "<a class='wrapnRadio checked'>":"<a class='wrapnRadio unchecked'>"));
    			//bind event
    			this.bindEvent($(radio),$radios);
    		},this));
    	}
    	this.bindEvent = function($radio,$radios){
    		$radio.parent().click(function(){
    			var $this = $(this), checked = $this.hasClass("checked");
    			if(checked)
    				return;
    			// $this.toggleClass("checked", !checked).toggleClass("unchecked", checked);
    			var $a = $radios.filter("[name="+$radio[0].name+"]").parent(".checked");
       			$a.removeClass("checked").addClass("unchecked").find("input").attr("checked",false);
    			$this.removeClass("unchecked").addClass("checked").find("input").attr("checked",true);
    		});
    	}
    }
    $.nRadio = $.nRadio();
})($, window);
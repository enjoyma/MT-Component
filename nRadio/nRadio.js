/**
 * 基于jQuery的自定义样式Radio
 * @param  [elem,elem] or jQuery elem
 * @return null
 * 对外接口
 * 1.$.nRadio.init(jQelem) //初始化，装饰原始radio
 * 2.$.nRadio.check(jQelem) //jQelem为radio或radio的父标签a
 * 2014-11-30   马厅  hzmating
 */
(function($, window) {
    var _nRadio = function(){
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
            //wrap radios
            $radios.each($.proxy(function(num, radio){
                $(radio).wrap($(radio.checked ? "<a class='wrapnRadio checked'>":"<a class='wrapnRadio unchecked'>"));
                //bind event
                this.bindEvent($(radio),$radios);
            },this));
        };
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
        };
        this.check = function(){
            alert();
        };
    }
    var nRadio = new _nRadio();
    //暴露接口
    $.nRadio = {
        "init" : function(elems){ nRadio.init(elems);},
        "check" : function(elems){ nRadio.check(elems);},
    }
    // $.nRadio.init = nRadio.init;
    // $.nRadio.check = nRadio.check;
})($, window);
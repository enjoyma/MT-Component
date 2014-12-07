/**
 * 基于jQuery的自定义样式Radio
 * @param  [original elem,original elem] or jQuery elem
 * @return null
 * 对外接口
 * 1.$.nRadio.init(jQelem) //初始化，装饰原始radio, 建议 $.nRadio.init($("input:radio"))
 * 2.$.nRadio.check(jQelem) //jQelem为radio或radio的父标签a(待实现)
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
            //wrap radios first
            $radios.each($.proxy(function(num, radio){
                $(radio).wrap($("<a href='javascript:;' class='wrapnRadio "+ (radio.checked ? "nRadioChecked" : "nRadioUnchecked") +"'></a>"));
            },this));
            //then bind event
            $radios.each($.proxy(function(num, radio){
                this.bindEvent($(radio),$radios);
            },this));
        };
        this.bindEvent = function($radio,$radios){
            var $a = $radio.parent(),
                $radioGroup =  $radios.filter("[name="+$radio[0].name+"]"),
                $label = $(document).find("label[for="+$radio.attr("id")+"]");
            //bind a
            $a.click(function(){
                if($a.hasClass("nRadioChecked"))
                    return;
                if($label.length){
                    $label.click();
                }else{
                    updateStatus($a, $radioGroup);
                }
            });
            //bind label  ,search by label[for=id]
            if($label.length){
                $label.click(function(){
                    if(!$a.hasClass("nRadioChecked")){
                        //坑：label也要设置input的checked状态
                        updateStatus($a, $radioGroup);
                    }
                });
            }
            function updateStatus($a, $radioGroup){
                $radioGroup.parent(".nRadioChecked").removeClass("nRadioChecked").addClass("nRadioUnchecked").find("input").attr("checked",false);
                $a.removeClass("nRadioUnchecked").addClass("nRadioChecked").find("input").attr("checked",true);
            }
        };
        this.check = function(){
            alert("sorry!not complete!");
        };
    }
    var nRadio = new _nRadio();
    //暴露接口
    $.nRadio = {
        "init" : function(elems){ nRadio.init(elems);},
        "check" : function(elems){ nRadio.check(elems);}
    }
})($, window);
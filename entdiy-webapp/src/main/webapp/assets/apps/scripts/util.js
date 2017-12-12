var Util=function(){return{traverseTreeToKeyValue:function(b,a){if(a==undefined){a={}}$.each(b,function(c,d){a[d.id]=d.name;if(typeof(d.children)==="object"){Util.traverseTreeToKeyValue(d.children,a)}});return a},assert:function(b,a){if(!b){alert(a)}},assertNotBlank:function(b,a){if(b==undefined||$.trim(b)==""){Util.assert(false,a);return}},isDebugEnable:function(){return true},debug:function(a){if(window.console){console.info(a)}else{alert(a)}},hashCode:function(c){var b=0;if(c.length==0){return b}for(i=0;i<c.length;i++){var a=c.charCodeAt(i);b=((b<<5)-b)+a;b=b&b}if(b<0){b=-b}return b},addOrReplaceUrlParameter:function(f,a,e){var d=f.indexOf("?");if(d==-1){f=f+"?"+a+"="+e}else{var g=f.split("?");var h=g[1].split("&");var c="";var b=false;for(i=0;i<h.length;i++){c=h[i].split("=")[0];if(c==a){h[i]=a+"="+e;b=true;break}}if(!b){f=f+"&"+a+"="+e}else{f=g[0]+"?";for(i=0;i<h.length;i++){if(i>0){f=f+"&"}f=f+h[i]}}}return f},smartParseURL:function(a){if(Util.startWith(a,"http:")||Util.startWith(a,"https:")){return a}if(Util.startWith(a,WEB_ROOT)){return a}return WEB_ROOT+a},cutContextPath:function(a){if(Util.startWith(a,"http:")||Util.startWith(a,"https:")){return a}if(WEB_ROOT==""||WEB_ROOT=="/"){return a}if(Util.startWith(a,WEB_ROOT)){return a.replace(WEB_ROOT,"")}return a},getParameterFromUrl:function(c,b){var d=new RegExp("(\\?|&)"+b+"=([^&?]*)","i");var a=c.match(d);if(a){return a[2]}return null},subStringBetween:function(d,f,b){var e=new RegExp(f+".*?"+b,"img");var c=new RegExp(f,"g");var a=new RegExp(b,"g");return d.match(e).join("=").replace(c,"").replace(a,"").split("=")},split:function(a){return a.split(",")},isArrayContainElement:function(c,b){var a=c.length;while(a--){if(c[a]==b){return true}}return false},getTextWithoutChildren:function(a){return $(a)[0].childNodes[0].nodeValue.trim()},findClosestFormInputByName:function(b,a){return $(b).closest("form").find("[name='"+a+"']")},setInputValIfBlank:function(a,b){if($.trim($(a).val())==""){$(a).val(b)}},unEditable:function(b){var a=$(b);return a.attr("readonly")||a.attr("disabled")},startWith:function(b,c){var a=new RegExp("^"+c);return a.test(b)},endWith:function(c,a){var b=new RegExp(a+"$");return b.test(c)},parseFloatValDefaultZero:function(b){if($.trim($(b).val())==""){return 0}else{var a=parseFloat($.trim($(b).val()));if(isNaN(a)){return 0}else{return a}}},notSmallViewport:function(){var a=$(window).width();return a>=768},dataStartWith:function(e,d){var f=e.replace(/-([a-z])/ig,function(h,g){return g.toUpperCase()});var c={};for(var b in d){if(Util.startWith(b,f)){var a=b.replace(f,"");a=a.substring(0,1).toLowerCase()+a.substring(1);if(a&&a!=""){c[a]=d[b]}}}return c},handleAjaxError:function(c){var b="数据请求异常，请联系管理员";if(c.status==401){var a=c.getResponseHeader("Location");swal({title:"登录会话异常",text:"系统检测到当前登录会话已失效，请确认转向登录界面重新登录？",allowOutsideClick:false,showConfirmButton:true,showCancelButton:true,closeOnConfirm:true,closeOnCancel:true,confirmButtonText:"确认",cancelButtonText:"取消"},function(d){if(d){window.location.href=a}});b="未认证访问，请尝试重新登录访问试试，如果问题依然请联系管理员"}else{if(c.status==403){b="未授权访问，请尝试重新登录访问试试，如果问题依然请联系管理员"}else{if(c.status==404){b="请求资源未找到，请尝试刷新页面试试，如果问题依然请联系管理员"}}}return"E"+c.status+"： "+b},init:function(){$.fn.plot=function(e){var d=$(this);if(d.attr("chart-plot-done")){return}d.attr("chart-plot-done",true);d.css("min-height","100px");var a=$.extend({},d.data("plotOptions")||{},e||{});var b=a.data;var c=a.options;$.each(b,function(g,h){if(typeof h.data==="function"){h.data=h.data.call(d)}});c=$.extend(true,{pointhover:true,series:{lines:{show:true,lineWidth:2,fill:true,fillColor:{colors:[{opacity:0.05},{opacity:0.01}]}},points:{show:true},shadowSize:2},grid:{hoverable:true,clickable:true,tickColor:"#eee",borderWidth:0},colors:["#d12610","#37b7f3","#52e136"],xaxis:{timezone:"browser",monthNames:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}},c);$.plot(d,b,c);if(a.pointhover){var f=$("#plothoverTooltip");if(f.size()==0){f=$("<div id='plothoverTooltip'></div>").css({position:"absolute",display:"none",border:"1px solid #333",padding:"4px",color:"#fff","border-radius":"3px","background-color":"#333",opacity:0.8,"min-width":"50px","text-align":"center"}).appendTo("body")}d.bind("plothover",function(h,k,g){if(g){var j=g.datapoint[1];f.html(j).css({top:g.pageY,left:g.pageX+15}).fadeIn(200)}else{f.hide()}})}},$.fn.treeSelect=function(b){var g=$(this);if(g.attr("select2-done")){return this}g.attr("select2-done",true);if(Util.unEditable(g)){return this}var m=g.data("tree-url");if(m){g.select2ToTree({treeData:{dataUrl:m,valFld:"id",labelFld:"display",incFld:"children"}})}return;b=$.extend({url:g.attr("data-url"),position:g.attr("data-position")},b);var f="__treeselect_"+new Date().getTime();g.attr("id",f);var e=g.closest(".panel-content");if(e.size()==0){e=$("body")}var l=$('<i class="fa fa-times"></i>').insertBefore(g);var c=$('<i class="fa fa-angle-double-down btn-toggle"></i>').insertBefore(g);var a=g.parent().children();a.wrapAll('<div class="input-group" style="width:100%"><div class="input-icon right"></div></div>');var h=$('<div style="z-index: 990; display: none; position: absolute; background-color: #FFFFFF; border: 1px solid #DDDDDD"></div>');h.appendTo(e);l.click(function(){a.val("")});var o=[];o.push('<div role="navigation" class="navbar navbar-default" style="border: 0px; margin:0px">');o.push('<div class="collapse navbar-collapse navbar-ex1-collapse" style="padding: 0">');o.push('<form role="search" class="navbar-form navbar-left">');o.push('<div class="form-group" style="border-bottom: 0px">');o.push('<input type="text" name="keyword" class="form-control input-small">');o.push("</div>");o.push('<button class="btn blue" type="submit">查询</button>');o.push("</form>");o.push('<ul class="nav navbar-nav navbar-right">');o.push('<li><a href="javascript:;" class="btn-open-all" style="padding-left: 0">展开</li>');o.push('<li><a href="javascript:;" class="btn-close-all" style="padding-left: 0">收拢</a></li>');o.push("</ul>");o.push("</div>");o.push("</div>");var j=$(o.join("")).appendTo(h);var n=$('<div style="max-height: 300px;overflow: auto"></div>').appendTo(h);var k=$('<ul class="ztree"></ul>').appendTo(n);k.attr("id","ztree_"+f);k.attr("id-for",f);k.attr("data-url",b.url);var d=function(v){var p=g.attr("name");var t=p.split(".");var s=[];$.each(t,function(C,B){if(C<t.length-1){s.push(B)}});var z=s.join(".")+".id";var y={};if(v){y[p]=Util.startWith(v.id,"-")?"":v.name;y[z]=Util.startWith(v.id,"-")?"":v.id}else{y[p]="";y[z]=""}var x=g.closest(".ui-jqgrid-btable");if(x.size()>0){var q=false;var w=x.jqGrid("getGridParam","colModel");for(var r=0;r<w.length;r++){var u=w[r];if(u.name==z||u.index==z){q=true;break}}if(!q){alert("页面配置错误： "+p+" 对应的id属性 "+z+" 未定义");return}x.jqGrid("setEditingRowdata",y)}else{if(g.closest(".form-group").size()>0){var A=g.closest("form");A.setFormDatas(y,true)}}g.focus()};g.click(function(){var u=g.attr("treeselect-cached-done");if(u==undefined){g.attr("treeselect-cached-done",true);g.attr("disabled",true);g.addClass("spinner");var w=g.cacheData(b.url);$.fn.zTree.init(k,{callback:{onClick:function(y,A,z){if(b.callback&&b.callback.onSingleClick){var x=b.callback.onSingleClick.call(this,y,A,z);if(x==undefined||x==true){h.hide();c.removeClass("fa-angle-double-up");c.addClass("fa-angle-double-down")}}else{d(z);h.hide();c.removeClass("fa-angle-double-up");c.addClass("fa-angle-double-down")}g.trigger("treeselect.nodeSelect",[z]);y.stopPropagation();y.preventDefault();return false}}},w);g.removeAttr("disabled");g.removeClass("spinner")}var r=$.fn.zTree.getZTreeObj(k.attr("id"));r.cancelSelectedNode();if($.trim(g.val())!=""){var q=r.getNodesByParamFuzzy("name",g.val());for(var s=0,p=q.length;s<p;s++){var v=q[s];r.selectNode(v)}}h.children(".ztree").hide();k.show();var t=g.outerWidth();if(t<330){t=330}h.css({width:t+"px"}).slideDown("fast");h.position($.extend(true,{my:"right top",at:"right bottom",of:g.parent("div")},b.position));c.removeClass("fa-angle-double-down");c.addClass("fa-angle-double-up")}).keydown(function(p){if(p.keyCode===13){return true}return false});c.click(function(p){if($(this).hasClass("fa-angle-double-down")){g.click()}else{c.removeClass("fa-angle-double-up");c.addClass("fa-angle-double-down");h.hide()}p.stopPropagation();p.preventDefault()});j.find("form").submit(function(u){var v=j.find("input[name='keyword']").val();var r=$.fn.zTree.getZTreeObj(k.attr("id"));r.cancelSelectedNode();var q=r.getNodesByParamFuzzy("name",v);for(var s=0,p=q.length;s<p;s++){var t=q[s];r.selectNode(t,true)}u.stopPropagation();u.preventDefault();return false});j.find(".btn-open-all").click(function(q){var p=$.fn.zTree.getZTreeObj(k.attr("id"));p.expandAll(true);q.stopPropagation();q.preventDefault();return false});j.find(".btn-close-all").click(function(q){var p=$.fn.zTree.getZTreeObj(k.attr("id"));p.expandAll(false);q.stopPropagation();q.preventDefault();return false});$(document).on("mousedown",function(r){var s=h;var q=g;var p=r.target.tagName;if(p=="HTML"){return}if(!(q.is(r.target)||q.find(r.target).length||s.is(r.target)||s.find(r.target).length)){s.hide()}})},$.fn.ajaxGetUrl=function(b,d,c){Util.assertNotBlank(b,"ajaxGetUrl调用的url参数不能为空");$("#btn-profile-param").hide();var a=$(this);a.addClass("ajax-get-container");a.attr("data-url",b);App.blockUI({target:a,animate:true,overlayColor:"none"});$.ajax({type:"GET",cache:false,url:Util.smartParseURL(b),data:c,dataType:"html",headers:{"Sitemesh-Decorator":"body"},success:function(f){var g=a.height();if(g<100){g=100}a.css({"min-height":g});a.empty();var e=null;if(a.is("tbody")){e=a}else{e=$("<div class='ajax-page-inner'/>").appendTo(a)}e.hide();e.html(f);Global.runComponents(Global.Component_Run_Point.BeforeAjaxPageShow,e);e.show();if(d){d.call(a,f)}Global.runComponents(Global.Component_Run_Point.AfterAjaxPageShow,e);a.css({"min-height":100});App.unblockUI(a)},error:function(e){Global.notify("error",Util.handleAjaxError(e),"请求异常");App.unblockUI(a)}});return a};$.fn.ajaxJsonUrl=function(b,d,c){Util.assertNotBlank(b,"ajaxJsonUrl调用的url参数不能为空");var a=$(this);App.blockUI({target:a,animate:true,overlayColor:"none"});$.ajax({traditional:true,type:"GET",cache:false,url:Util.smartParseURL(b),dataType:"json",headers:{Ajaxify:true},data:c,success:function(e){if(e.type=="error"||e.type=="warning"||e.type=="failure"){Global.notify("error",e.message)}else{if(d){d.call(a,e)}json=e}App.unblockUI(a)},error:function(e){Global.notify("error",Util.handleAjaxError(e),"请求异常");App.unblockUI(a)}})};$.fn.ajaxJsonSync=function(b,e,d){Util.assertNotBlank(b,"ajaxJsonSync 调用的url参数不能为空");var a=$(this);App.blockUI({target:a,animate:true,overlayColor:"none"});var c=null;$.ajax({traditional:true,type:"GET",cache:false,async:false,url:Util.smartParseURL(b),data:d,contentType:"application/json",dataType:"json",headers:{Ajaxify:true},success:function(f){if(f.type=="error"||f.type=="warning"||f.type=="failure"){Global.notify("error",f.message)}else{if(e){e.call(a,f)}c=f}App.unblockUI(a)},error:function(f){Global.notify("error",Util.handleAjaxError(f),"请求异常");App.unblockUI(a)}});return c};$.fn.ajaxPostURL=function(b){var a=b.url;Util.assertNotBlank(a);var e=b.success;var d=b.confirmMsg;if(d==undefined){d="确认提交数据？"}if(d&&d!="false"){if(!confirm(d)){return false}}var b=$.extend({data:{}},b);var c=$(this);App.blockUI({target:c,animate:true,overlayColor:"none"});a=encodeURI(a);$.ajax({type:"POST",url:Util.smartParseURL(a),contentType:"application/x-www-form-urlencoded",dataType:"json",headers:{Ajaxify:true},data:b.data,success:function(f){App.unblockUI(c);if(!f.type){Global.notify("error",f,"系统处理异常");return}if(f.type=="confirm"){swal({title:"操作确认",text:f.message+" 请确认是否继续提交表单？",allowOutsideClick:false,showConfirmButton:true,showCancelButton:true,closeOnConfirm:true,closeOnCancel:true,confirmButtonText:"确认",cancelButtonText:"取消"},function(j){if(j){c.ajaxPostURL({url:Util.addOrReplaceUrlParameter(a,"_serverValidationConfirmed_",true),confirmMsg:false,success:b.success,data:b.data})}});return}if(f.type=="success"||f.type=="warning"){Global.notify(f.type,f.message);if(e){e.call(c,f)}}else{if(f.data){var h=[];for(var g in f.data){h.push(f.data[g])}Global.notify("error",h.join("<br>"),f.message)}else{Global.notify("error",f.message)}if(b.failure){b.failure.call(c,f)}}},error:function(f){Global.notify("error",Util.handleAjaxError(f),"请求异常");App.unblockUI(c)}})}}}}();var BooleanUtil=function(){return{toBoolean:function(b){if(b){var a=$.type(b);if(a==="string"&&(b=="true"||b=="1"||b=="y"||b=="yes"||b=="readonly"||b=="checked"||b=="enabled"||b=="enable"||b=="selected")){return true}else{if(a==="number"&&(b==1)){return true}}}return false}}}();
+function(d){var c=function(f,e){this.$element=d(f);this.options=d.extend({},c.DEFAULTS,e);this.init()};c.VERSION="1.0.0";c.DEFAULTS={};c.prototype.init=function(){var f=this.$element;var g=this.options;var i=g.active||"0";var h=f.children("li:not(.tools):not(.dropdown)");var e=f.parent().find(" > .tab-content > div.tab-pane");h.each(function(l,k){var o=d(k);var n=o.children('a[href="#tab-auto"]');if(n.size()>0){var j=e.eq(l);var m="__tab-"+new Date().getTime()+l;j.attr("id",m);n.attr("href","#"+m)}if(o.is(".active")){o.find("> a").click();i=false}});if(i){h.filter(":eq("+i+")").find("> a").click()}};function b(e){return this.each(function(){var h=d(this);var g=h.data("ExtAjaxBootstrapTabs");var f=typeof e=="object"&&e;if(!g){h.data("ExtAjaxBootstrapTabs",(g=new c(this,f)))}if(typeof e=="string"){g[e]()}})}var a=d.fn.extAjaxBootstrapTabs;d.fn.extAjaxBootstrapTabs=b;d.fn.extAjaxBootstrapTabs.noConflict=function(){d.fn.extAjaxBootstrapTabs=a;return this};d(document).ready(function(){d(document).off("click.tab.data-api");d(document).on("click.tab.data-api",'a[data-toggle="tab"], a[data-toggle="pill"]',function(j){var i=d(this);var k=i.attr("data-ajax");if(k=="false"){return true}if(i.hasClass("disabled")||i.attr("data-tab-disabled")=="true"){return false}var h=i.attr("data-url")?i.attr("data-url"):i.attr("href");h=d.trim(h);if(!Util.startWith(h,"#")){i.attr("data-url",h);var f="tab_content_"+Util.hashCode(h);i.attr("href","#"+f);var o=i.closest("ul.nav").parent();var n=o.find(" > div.tab-content");if(n.length==0){n=d('<div class="tab-content">').appendTo(o)}var g=n.find("div#"+f);if(g.length==0){g=d('<div id="'+f+'" class="tab-pane active">').appendTo(n)}if(g.is(":empty")){g.ajaxGetUrl(h,function(){g.append('<div style="clear:both"></div>');g.find(".nav > li.active > a").click()})}}d(this).tab("show");var m=d(this).closest(".nav-tabs");var l=m.find("li:not(.tools)").index(d(this).parent("li"));m.attr("data-active",l);j.preventDefault()})});Global.addComponent({name:"ExtAjaxBootstrapTabs",plugin:b,expr:"ul.nav-tabs"})}(jQuery);
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});
//# sourceMappingURL=jquery.form.min.js.map

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyReadingChart=function(account,cb_no_reading) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";
      const tokWh = function(n) {
        return (n/1000).toFixed(3).replace('.',',');
      }
      const parent = this;
      let ctx=this;
      if(ctx.attr("data-resolution") == null) {
        ctx.attr("data-resolution","3600000");
      }
      if(ctx.attr("data-from") == null) {
        ctx.attr("data-from","-86400000");
      }
      if(ctx.attr("data-chart") == null) {
        ctx.attr("data-chart","line");
      }
      let add_query = "";
      if(ctx.attr("data-from") != null) {
        if(ctx.attr("data-from")*1>new Date().getTime()) {
            ctx.attr("data-from","-86400000");
        }

        if(ctx.attr("data-from")*1 < 0) {
          add_query += "&from="+(new Date().getTime()+((1*ctx.attr("data-from"))-(1*ctx.attr("data-resolution"))));
        } else {

          add_query += "&from="+ctx.attr("data-from");
        }
      }
      if(ctx.attr("data-to") != null) {
        add_query += "&to="+ctx.attr("data-to");
      }
      const refreshReading = function() {
          $.getJSON("https://api.corrently.io/core/reading?account="+q+"&history="+ctx.attr('data-resolution')+add_query,function(data) {
            let data_1_8_0 = [];
            let data_9_99_0 = [];
            let previous_ts=0;
            if((typeof data.history == "undefined") || (data.history == null) || (data.history.length == 0)) {
                console.log("No Reading");
                if(cb_no_reading != null) {
                  cb_no_reading();
                }
            }
            for(var i=1;i<data.history.length;i++) {
              if(previous_ts<data.history[i].timeStamp) {
                if((data.history[i]["1.8.0"]!=null)&&(data.history[i]["1.8.0"]-data.history[i-1]["1.8.0"]>0)) {
                  data_1_8_0.push({
                    y:Math.round((((data.history[i]["1.8.0"]-data.history[i-1]["1.8.0"]))/((data.history[i].timeStamp-data.history[i-1].timeStamp)/3600000))),
                    x:data.history[i].timeStamp*1
                  })
                }
                if(data.history[i]["9.99.0"] != null) {
                  data_9_99_0.push( {
                    y:data.history[i]["9.99.0"]*1,
                    x:data.history[i].timeStamp*1
                  });
                }
              } else {
                console.log("Timesort error");
              }
              previous_ts = data.history[i].timeStamp;
            }
            if(typeof data_1_8_0[data_1_8_0.length-1] != "undefined") {
              ctx.attr("data-to",data_1_8_0[data_1_8_0.length-1].x);
            } else return;

            ctx.attr("data-from",data_1_8_0[0].x);
            let ts = new Date(ctx.attr("data-to")*1);
            let title = 'bis '+ts.getDate()+"."+(ts.getMonth()+1)+"."+(ts.getYear()+1900);
            ts = new Date(ctx.attr("data-from")*1);
            let long_title = 'von '+ts.getDate()+"."+(ts.getMonth()+1)+"."+(ts.getYear()+1900)+' '+title;
            let ctype = ctx.attr("data-chart");
            let l1 = Math.round(Math.abs(data.history[data.history.length-1]["1.8.1"]-data.history[0]["1.8.1"])/1);
            let totalConsumption = Math.round(Math.abs(data.history[data.history.length-1]["1.8.0"]-data.history[0]["1.8.0"])/1);
            let l2 = Math.round(Math.abs(data.history[data.history.length-1]["1.8.2"]-data.history[0]["1.8.2"])/1);
            //let l2 = totalConsumption-l1;
            let green = Math.round((l1/(l1+l2))*100);
            let grey = 100-green;
            let donut_data = [
              green,
              grey,
            ];
            // Render in html Elements
            $('.usageKwh').html((totalConsumption/1000).toFixed(3).replace('.',','));
            $('.greenKwh').html((l1/1000).toFixed(3).replace('.',','));
            $('.greyKwh').html((l2/1000).toFixed(3).replace('.',','));
            $('.totalReading').html((data["1.8.0"]/1000).toFixed(3).replace('.',','));
            $('.greenReading').html((data["1.8.1"]/1000).toFixed(3).replace('.',','));
            $('.greyReading').html((data["1.8.2"]/1000).toFixed(3).replace('.',','));
            $('.timeReading').html(new Date(data.timeStamp).toLocaleString());
            if((ctype=="line")||(ctype=='bar')) {
              let myChart = new Chart(ctx, {
                  type: ctype,
                  data: {
                    datasets: [{
                        type:ctype,
                        label: 'Verbrauch',
                        data: data_1_8_0,
                        borderColor: '#ff0000',
                        backgroundColor:'#ff0000',
                        fill: false,
                        yAxisID: 'y-axis-1'
                    },
                    {
                        type:ctype,
                        label: 'GrünstromIndex',
                        data: data_9_99_0,
                        borderColor: '#5cb85c',
                        backgroundColor: '#5cb85c',
                        fill: false,
                        yAxisID: 'y-axis-2'
                    }
                  ]
                  },
                  options: {
                      title: {
                        display:true,
                        text:title
                      },
                      tooltips: {
                        callbacks: {
                           label: function (t, d) {
                                  if (t.datasetIndex === 0) {
                                      return '' + t.yLabel + ' W';
                                  } else if (t.datasetIndex === 1) {
                                      return '' + t.yLabel + ' Punkte';
                                  }
                                }
                         }
                      },
                      legend: { position:"bottom" },
                      scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear'
                        }],
                        yAxes: [{
                              ticks: {
                                  beginAtZero: false
                              },
                              display: true,
                              position: 'left',
                              id: 'y-axis-1',
                              scaleLabel: {
                                display:true,
                                labelString:'Wh'
                              }
                          },{
                                ticks: {
                                    beginAtZero: false
                                },
                                display: true,
                                position: 'right',
                                id: 'y-axis-2',
                                scaleLabel: {
                                  display:true,
                                  labelString:'Punkte'
                                }
                            }]
                      }
                  }
              });
            }
            if(ctype=="donut") {
              let myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                    datasets: [{
                        label: 'Verbrauch',
                        data: donut_data,
                        backgroundColor: [
                          '#5cb85c',
                          '#a0a0a0'
                        ]
                    }],
                    labels: [
                      'Grünstrom',
                      'Graustrom'
                    ]
                  },
                  options: {
                    responsive: true,
                    legend: {
                      position: 'bottom',
                    },
                    title: {
                      display: true,
                      text: long_title
                    },
                    animation: {
                      animateScale: true,
                      animateRotate: true
                    }
                  }
              });
            }
          });
      };
      refreshReading();
      setInterval(refreshReading,60000);
    }
    /**
    *  Ausgabe der Zählerstände eines Corrently Account als MSCONS Nachricht (in einem Code Block)
    */

}( jQuery ));

(function ( $ ) {
    /**
    * Ausgabe des GrünstromIndex als HTML Tabelle für die angegeben Postleitzahl (oder via GeoIP, wenn keine angegeben wurde)
    */
    $.fn.correntlyGSI=function(zipcode) {
      let url="https://api.corrently.io/core/gsi"
      if(zipcode!=null) url+="?plz="+zipcode; else
      if(this.attr("data-plz")!=null) url+"?plz="+this.attr("data-plz"); else
      if(this.attr("data-zip")!=null) url+"?plz="+this.attr("data-zip");
      const parent = this;
      parent.html("<span class='text-muted'>wird geladen...</span>");
      const refreshGSI = function() {
        if(parent.attr('data-refresh')!=null) {
          if(parent.attr('data-refresh')>new Date().getTime()) {
            return;
          }
        }
        $.getJSON(url,function(data) {
          $('#fortext').html("für "+data.location.city);
          let daterow="<tr><td class='small'>Datum</td>";
          let timerow="<tr><td class='small'>Zeit</td>";
          let barrow="<tr><td class='small'>Preisniveau</td>";
          let inforow="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>örtlicher&nbsp;Energiepreis</td>";

          for(var i=0;i<data.forecast.length;i++) {
              let date = new Date(data.forecast[i].timeStamp);
              if((i==0)||(date.getHours()==0)) {
                daterow+="<td class='small'>"+date.getDate()+"."+(date.getMonth()+1)+"</td>";
              } else daterow+="<td>&nbsp;</td>";
              let bgclass="bg-warning";
              if(data.forecast[i].gsi<48) bgclass="bg-secondary";
              if(data.forecast[i].gsi>52) bgclass="bg-success";
              timerow+="<td  class='"+bgclass+" small' style='text-align:right'>"+date.getHours()+":00</td>";
              barrow+="<td style='vertical-align:bottom'><div class='"+bgclass+"' style=';height:"+Math.round((100-data.forecast[i].gsi)*2)+"px'></div></td>";
              inforow+="<td style='text-align:right' class='"+bgclass+" small' >"+(5-(2*(data.forecast[i].gsi/100))).toFixed(2).replace('.',',')+"</td>";
          }
          daterow+="</tr>";
          timerow+="</tr>";
          barrow+="</tr>";
          inforow+="</tr>";
          parent.html("<table class='table table-sm table-responsive'>"+barrow+daterow+timerow+inforow+"</table>");
          parent.attr('data-refresh',data.forecast[0].timeStamp);
        });
      }
      refreshGSI();
      setInterval(refreshGSI,60000);
    }
}( jQuery ));

(function ( $ ) {
    $.fn.correntlyMarket=function() {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Bezeichnung</th>";
          html+="<th>Emitent</th>";
          html+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>";
          html+="<th colspan='2'>GrünstromBonus<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th>";
          html+="</tr>";
          for(let i=0;i<data.results.length;i++) {
            html+="<tr>";
            html+="<td>"+data.results[i].title+"</td>";
            html+="<td>"+data.results[i].emitent+"</td>";
            html+="<td>"+data.results[i].decom+"</td>";
            html+="<td>"+data.results[i].cori+" kWh</td>";
            html+="<td>"+(data.results[i].cori*0.02).toFixed(2).replace('.',',')+" €</td>";
            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
      });
    },
    $.fn.correntlyBoard=function(a) {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="";
          for(let i=0;i<data.results.length;i++) {
            if(data.results[i].asset==a) {
              $('#asset_title').html(data.results[i].title);
              let fields = data.results[i].totalSupply;
              let l=0;
              html+="<div style='width:750px;float:none'>";
              for(let j=0;j<fields;j++) {
                html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"'></div>";
              }
              html+="</div>";
            }
          }
          parent.html(html);
          let cnt_sel=0;
          $('.field').click(function(el) {
              if($(el.currentTarget).attr('selected')) {
                $(el.currentTarget).css("background-color", "#c0c0c0");
                $(el.currentTarget).removeAttr('selected');
                cnt_sel--;
              } else {
                $(el.currentTarget).css("background-color", "red");
                $(el.currentTarget).attr('selected','selected');
                cnt_sel++;
              }
              $('#selected_fields').html(cnt_sel);
          });
      });
    },
    $.fn.correntlyCommisioning=function(account) {
      const parent = this;
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x4D530cc530bCE8c84E2271528eA10D6480cbDACE";

      $.getJSON("https://api.corrently.io/core/commissioning?account="+q,function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Produkt</th>";
          html+="<th>Backoffice Vertrag</th>";
          html+="<th>Eingang</th>";
          html+="<th>Lieferung</th>";
          html+="</tr>";

          for(let i=0;i<data.length;i++) {
            html+="<tr>";
            html+="<td title='"+data[i].product+"'><a href='./contracts.html?a="+data[i].product+"' class='pLabel_"+data[i].product+"'>"+data[i].product+"</a></td>";
            html+="<td><a href='./contracts.html?a="+data[i].quitance+"'>"+data[i].quitance+"</a></td>";
            html+="<td>"+new Date(data[i].commissioning*1).toLocaleString()+"</td>";
            html+="<td title='"+data[i].delivery+"'>"+new Date(data[i].delivered*1).toLocaleString()+"</td>";
            if(data[i].product=="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22") {
                window.ce_meter = data[i].quitance;
                html+="<td><a href='./reading.html?a="+data[i].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"
            } else if(data[i].product=="0x8dd8eddF4f8133f468867c551C17ad7324B411C6") {
                window.ce_sko = data[i].quitance;
                html+="<td><a href='./stromkonto.html?a="+data[i].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"
            } else {
              html+="<td></td>";
            }

            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
          for(let i=0;i<data.length;i++) {
              $.getJSON("https://api.corrently.io/core/contract?account="+data[i].product,function(data2) {
                $(".pLabel_"+data2.account).html(data2.name);
              });
          }
      });
    }
    $.fn.correntlyContract=function(account) {
      const parent = this;
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0xcf74487007Ed9eD579b2eb5498cb719d46bb9Ab4";

      $.getJSON("https://api.corrently.io/core/contract?account="+q,function(data) {
          if(data.type == "dealitem") data.type="Digitales Asset";
          if(data.type == "product") data.type="Produkt/Vertrag";
          let html="";
          html+= "<h2>"+data.name+"</h2> <span class='text-muted'>("+data.type+")</span>";
          html+= "<p>"+data.description+"</p>";
          parent.html(html);
      });
    }
}( jQuery ));

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyReadingTable=function(account,) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";
      const tokWh = function(n) {
        return (n/1000).toFixed(3).replace('.',',');
      }
      const parent = this;
      parent.html("<span class='text-muted'>wird geladen...</span>");
      const refreshReading = function() {
          $.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+q,function(data) {
            let html = "<div class='table-responsive'><table class='table table-sm'>";
            html+="<tr><th>&nbsp;</th><th>Obis Code</th><th title='"+q+"'>Übernahme<br/>Zählerstand</th><th>Belieferung<br/>Zählerstand</th><th>Diffferenz</th><th>Letzte Ablesung</th></tr>";
            html+="<tr>";
            html+="<td colspan=3><span class='text-muted'>"+q+"</span></td>";
            if(typeof data.firstReading != "undefined")  html+="<td>"+new Date(data.firstReading.timeStamp).toLocaleString()+"</td>"; else html+="<td></td>";
            if(typeof data.firstReading != "undefined") html+="<td>"+((data.timeStamp-data.firstReading.timeStamp)/86400000).toFixed(1).replace('.',',')+" Tage</td>";  else html+="<td></td>";
            html+="<td>"+new Date(data.timeStamp).toLocaleString()+"</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td>Gesamt</td>";
            html+="<td>1.8.0</td>";
            html+="<td>"+tokWh((data["1.8.0"]-(data["1.8.1"]+data["1.8.2"])))+"</td>";
            if(typeof data.firstReading != "undefined") {
               html+="<td>"+tokWh(data.firstReading["1.8.0"])+"</td>";
               html+="<td>"+tokWh(data["1.8.0"]-data.firstReading["1.8.0"])+"</td>";
            } else {
              html+="<td></td>";
              html+="<td></td>";
            }
            html+="<td>"+tokWh(data["1.8.0"])+"</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td>Grünstrom</td>";
            html+="<td>1.8.1</td>";
            html+="<td>&nbsp;</td>";
            if(typeof data.firstReading != "undefined") {
               html+="<td>"+tokWh(data.firstReading["1.8.1"])+"</td>";
               html+="<td>"+tokWh(data["1.8.1"]-data.firstReading["1.8.1"])+"</td>";
            } else {
              html+="<td></td>";
              html+="<td></td>";
            }
            html+="<td>"+tokWh(data["1.8.1"])+"</td>";
            html+="</tr>";
            html+="<tr>";
            html+="<td>Graustrom</td>";
            html+="<td>1.8.2</td>";
            html+="<td>&nbsp;</td>";
            if(typeof data.firstReading != "undefined") {
               html+="<td>"+tokWh(data.firstReading["1.8.2"])+"</td>";
               html+="<td>"+tokWh(data["1.8.2"]-data.firstReading["1.8.2"])+"</td>";
            } else {
              html+="<td></td>";
              html+="<td></td>";
            }
            html+="<td>"+tokWh(data["1.8.2"])+"</td>";
            html+="</tr>";
            html+= "</table></div>";
            parent.html(html);
            if(parent == null) {
              $('#gsi_card').html(html);
            }
          });
      };
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlyClearing=function(account) {
      let q = account;
      let zip = "10117";
      let idx = 0;

      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(this.attr("data-zip") != null ) zip=this.attr("data-zip");
      if(this.attr("zip") != null ) zip=this.attr("zip");

      if(this.attr("data-plz") != null ) zip=this.attr("data-plz");
      if(this.attr("plz") != null ) zip=this.attr("plz");

      if(this.attr("data-idx") != null ) idx=this.attr("data-idx");
      if(this.attr("idx") != null ) idx=this.attr("idx");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";
      const tokWh = function(n) {
        return (n/1000).toFixed(3).replace('.',',');
      }
      const parent = this;
      parent.html("<span class='text-muted'>wird geladen...</span>");
      $.getJSON("https://api.corrently.io/core/tarif?&zip="+zip,function(tarifinfo) {
          let tarif = tarifinfo[idx*1];
          const refreshReading = function() {
              $.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+q,function(data) {
                let html = "<div class='table-responsive'><table class='table table-sm'>";
                html+="<tr class='bg-dark text-light'><td colspan='4'><h4>Energie</h4></td></tr>";
                html+="<tr class='bg-secondary text-light'><th>Belieferungsbeginn</th><td style='text-align:right'>"+new Date(data.firstReading.timeStamp*1).toLocaleString()+"</td><td>("+((data.timeStamp-data.firstReading.timeStamp)/86400000).toFixed(1).replace('.',',')+" Tage)</td><td>&nbsp;</td></tr>";
                html+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+tokWh(data.firstReading["1.8.0"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+tokWh(data.firstReading["1.8.1"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+tokWh(data.firstReading["1.8.2"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr class='bg-secondary text-light'><th>Aktuell</th><td style='text-align:right'>"+new Date(data.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                html+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+tokWh(data["1.8.0"])+"</td><td>("+tokWh(data["1.8.0"]-data.firstReading["1.8.0"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+tokWh(data["1.8.1"])+"</td><td>("+tokWh(data["1.8.1"]-data.firstReading["1.8.1"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+tokWh(data["1.8.2"])+"</td><td>("+tokWh(data["1.8.2"]-data.firstReading["1.8.2"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td colspan='3'>&nbsp;</td></tr>";
                html+="<tr class='bg-dark text-light'><td colspan='4'><h4>Geld</h4></td></tr>";
                html+="<tr class='bg-secondary text-light'><th>Belieferung</th><td style='text-align:right'>"+new Date(data.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                let gp = (((tarif.gp*12)/365)*((data.timeStamp-data.firstReading.timeStamp)/86400000));
                let ap = ((tarif.ap/100000)*(data["1.8.0"]-data.firstReading["1.8.0"]));
                let bp = ((2/100000)*(data["1.8.1"]-data.firstReading["1.8.1"]));
                html+="<tr><td>&nbsp;+ Grundgebühr</td><td style='text-align:right'>"+gp.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>&nbsp;+ Energiekosten</td><td style='text-align:right'>"+ap.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>= Bezugskosten</td><td style='text-align:right'>"+(gp+ap).toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>&nbsp;- Corrently Grünstrom Bonus</td><td style='text-align:right'>"+bp.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><th>Brutto Kosten</th><td style='text-align:right'>"+((gp+ap)-bp).toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+= "</table></div>";
                parent.html(html);
                if(parent == null) {
                  $('#gsi_card').html(html);
                }
              });
          };
          refreshReading();
          setInterval(refreshReading,60000);
      });
    },
    /**
    *  Ausgabe der Zählerstände eines Corrently Account als MSCONS Nachricht (in einem Code Block)
    */
    $.fn.correntlyMSCONS=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+q,function(data) {
            let html="";
            html+="<code>";
            html+=data.msg;
            html+="</code>";
            parent.html(html);
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlyUpdateReading=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+q,function(data) {
            let html="";
            html+="<code>";
            html+=data.msg;
            html+="</code>";
            parent.html(html);
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    }
}( jQuery ));

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlySKOBalance=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x9d28463d51aC40662865D2462e80825D4DBB41d5";
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/core/stromkonto?account="+q,function(data) {
           /*
           $($(parent).find("#soll")[0]).html(data.result.soll_eur);
           $($(parent).find("#haben")[0]).html(data.result.haben_eur);
           $($(parent).find("#balance")[0]).html(data.result.balance_eur);
           */
           $('#soll_eur').html(data.result.soll_eur.toFixed(2).replace('.',','));
           $('#haben_eur').html(data.result.haben_eur.toFixed(2).replace('.',','));
           $('#balance_eur').html(data.result.balance_eur.toFixed(2).replace('.',','));
           if(typeof data.result.link != "undefined") {
             $.getJSON("https://api.corrently.io/core/dispatcher?account="+data.result.link,function(data) {

             });
           }
           $.getJSON("https://api.corrently.io/core/exd?account="+account,function(data) {
             if(typeof data["2.8.0"] != "undefined") {
               $('#p_2_8_0').html((data["2.8.0"]/1000).toFixed(3).replace('.',','));
             }

             console.log(data);
           })
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlySKODepot=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x504ec8497EBD02369550f6586EB32b26f088F25B";
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
           let html = "<table class='table'>";
           html+="<tr><th>Anlage</th><th>Anteile (kWh/Jahr)</th></tr>";
           if((typeof data.assets != "undefined") && (data.assets!=null)) {
               for(let i=0;i<data.assets.length;i++) {
                  html+="<tr>";
                  html+="<td>"+data.assets[i].asset_title+"</td>";
                  html+="<td>"+data.assets[i].shares+"</td>";
                  html+="</tr>";
               }
           }
           html+="</table>";
           parent.html(html);
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    }

}( jQuery ));

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyTarif=function(zip) {
      let parent = this;
      let q = zip;
      if(q == null) q = $.getUrlVar('p');
      if(this.attr("data-zip") != null ) q=this.attr("data-zip");
      if(this.attr("zip") != null ) q=this.attr("zip");
      if(this.attr("data-plz") != null ) q=this.attr("data-plz");
      if(this.attr("plz") != null ) q=this.attr("plz");

      $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
            let html = "<table class='table table-condensed'>";
            html+="<tr><th>Ortsteil</th><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
            for(let i=0;i<data.length;i++) {
              if(data[i].subcity.length > 0) {
              html+="<tr><td>"+data[i].subcity+"</td>";
            } else {
              html+="<tr><td>"+q+"</td>";
            }
              html+="<td>"+(data[i].ap/100).toFixed(4).replace('.',',')+"</td>";
              html+="<td>"+(data[i].gp).replace('.',',')+"</td>";
              html+="<td><a href='https://corrently.energy/stromprodukte/"+q+"/' class='btn btn-sm btn-warning'>Details</td>";
              html+="</tr>";
            }
            html+="</table>";
            parent.html(html);
      });
    }

}( jQuery ));

$.extend({
   getUrlVars: function(){
     var vars = [], hash;
     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
     for(var i = 0; i < hashes.length; i++)
     {
       hash = hashes[i].split('=');
       vars.push(hash[0]);
       vars[hash[0]] = hash[1];
     }
     return vars;
   },
   getUrlVar: function(name){
     return $.getUrlVars()[name];
   }
});

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
      if(q == null) q="0xD02DbB0b8F2A4Bfe54DD997Cd47922Fa2352F7fD";
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

            data.history.sort(function(a,b) {
              return a.timeStamp - b.timeStamp;
            });

            for(var i=1;i<data.history.length;i++) {
              if((previous_ts<=data.history[i].timeStamp)&&(data.history[i].timeStamp> new Date().getTime()-86400000*3)) {
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
                // console.log("Timesort error");
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

            //tmp disabled
            $('.greenKwh').attr('title',(l1/1000).toFixed(3).replace('.',','));
            $('.greyKwh').attr('title',(l2/1000).toFixed(3).replace('.',','));
            if((l1+l2) > (totalConsumption*1.15)) {
              $('.greenKwh').html('nicht verfügbar');
              $('.greyKwh').html('nicht verfügbar');
            }

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
                      plugins: {
                         datalabels: {
                             display:false
                         }
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
                      'Restökostrom'
                    ]
                  },
                  options: {
                    responsive: true,
                    legend: {
                      position: 'bottom',
                    },
                    plugins: {
                       datalabels: {
                           display:false
                       }
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
    },
    $.fn.correntlyHKNChart=function(zip) {
      let q = zip;
      if(this.attr("data-zip") != null ) q=this.attr("data-zip");
      if(this.attr("data-plz") != null ) q=this.attr("data-plz");


      if(q == null) q = $.getUrlVar('q');
      if(q == null) q="69256";

      if((typeof window !== 'undefined')&&(typeof window.localStorage !== 'undefined')) {
        let account = window.localStorage.getItem("account");
        if((typeof account !== 'undefined') && (account !== null)) {
          q += "&key="+account;
        }
      }
      const parent = this;
      let ctx=this;

      const refreshReading = function() {
          $.getJSON("https://api.corrently.io/v2.0/gsi/dispatch?zip="+q,function(data) {
            $('#dispatchTS').html("Daten Mix und Herkunft im Zeitraum: "+new Date(data.timeframe.start).toLocaleString() + " bis " + new Date(data.timeframe.end).toLocaleString());
              let html = '<table class="table table-condensed">';
              html+="<tr><th>Energieträger</th><th style='text-align:right;align:right'>Anteil</th></tr>"
              let chartdata = [];
              for (let [key, value] of Object.entries(data.postmix)) {
                if(key == 'Kl�rgas') key='Klärgas';
                html+="<tr><td>"+key+"</td><td align='right'>"+(value*100).toFixed(1).replace('.',',')+"%</td></tr>";
                chartdata.push({
                  key:key,
                  value:value
                });
              }
              html+="</table>"
              let history_categories = [];
              let history_labels = [];
              for(let i=0;i<data.history.length;i++) {
                history_labels.push(data.history[i].epochday);
                let categorie = [];
                for (let [key, value] of Object.entries(data.history[i].mix)) {
                  if(key == 'Kl�rgas') key='Klärgas';
                  html+="<tr><td>"+key+"</td><td align='right'>"+(value*100).toFixed(1).replace('.',',')+"%</td></tr>";
                  categorie.push({
                    key:key,
                    value:value
                  });
                }
                history_categories.push(categorie);
              }
              window.gsi_history_categories = history_categories;
              window.gsi_history_labels = history_labels;

              $('#esrctable').html(html);
              let donut_data = [];
              let labels = [];
              let sum = 0;
              let sources = [];
              let unify = {};
              for(let i=0;i<data.dispatch_from.length;i++) {
                sum+=data.dispatch_from[i].energy;
                sources.push(data.dispatch_from[i]);
              }

              function compare(a, b) {
                  if (a.value < b.value) return 1;
                  if (b.value < a.value) return -1;
                  return 0;
              }

              chartdata.sort(compare);

              for(let i=0;((i<5) &&( i<chartdata.length));i++) {
                labels.push(chartdata[i].key);
                donut_data.push(Math.round(chartdata[i].value*100));
              }

              let myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                    datasets: [{
                        label: 'Herkunft',
                        data: donut_data,
                        backgroundColor: [
                          '#006C32',
                          '#D38200',
                          '#318B4E',
                          '#FFA700',
                          '#54AC6C'
                        ]
                    }],
                    labels: labels
                  },
                  options: {
                    responsive: true,
                    legend: {
                      position: 'left',
                    },
                    plugins: {
                       datalabels: {
                           display:false
                       }
                    },
                    title: {
                      display: true,
                      text: 'Aktueller Ökostrommix',
                      fontSize: '32',
                      fontColor: '#000000'
                    },
                    animation: {
                      animateScale: true,
                      animateRotate: true
                    },
                    tooltips: {
                          enabled: true,
                          mode: 'single',
                          callbacks: {
                            label: function(tooltipItems, data) {
                              return labels[tooltipItems.index] + ': ' + data.datasets[0].data[tooltipItems.index] + '%';
                            }
                          }
                    }
                  }
              });
          });
      };
      refreshReading();
      setInterval(refreshReading,3600000);
    }
    /**
    *  Ausgabe der Zählerstände eines Corrently Account als MSCONS Nachricht (in einem Code Block)
    */

}( jQuery ));

(function ( $ ) {
  $.fn.correntlyGSIDispatch=function(zipcode) {
    let url="https://api.corrently.io/v2.0/gsi/dispatch";
    let maxrows = 100;
    let nolink = false;
    if(zipcode!=null) {
      if(zipcode.length>5) {
      url+="?account="+zipcode;
      } else {
      url+="?zip="+zipcode;
      }
    } else
    if(this.attr("data-plz")!=null) url+"?zip="+this.attr("data-plz"); else
    if(this.attr("data-zip")!=null) url+"?zip="+this.attr("data-zip");
    if(this.attr("maxrows")!=null) maxrows=this.attr("maxrows")*1;
    if(this.attr("nolink")!=null) nolink=true;
    const parent = this;
    if(($('.gsiDataGiven').length==0)&&(typeof parent !=='undefined')&&(typeof parent.html !== 'undefined')&&(  parent.html().length < 100)) {
      parent.html("<span class='text-muted'>wird geladen... (Berechnung kann bis zu einer Minute dauern)</span>");
    }
    $.getJSON(url,function(data) {
      function compare( a, b ) {
          if ( a.energy < b.energy ){
            return -1;
          }
          if ( a.energy > b.energy ){
            return 1;
          }
          return 0;
        }

        let sum_from = 0;
        let sum_to = 0;
        for(let i=0;i<data.dispatch_from.values.length;i++) {
          sum_from+=data.dispatch_from.energy;
        }
        for(let i=0;i<data.dispatch_to.values.length;i++) {
          sum_to+=data.dispatch_to.energy;
        }
        let html="<table class='table table-striped gsiDataGiven'>";
        //html+="<thead><tr class='bg-dark text-light'><th colspan='4'><h3>Energiebilanz (nur Grünstrom): <strong>"+(sum_to-sum_from)+"</strong></h3></th></tr>";
        html+="<thead><tr><th colspan='2'>Grünstrom Import</th><th colspan='2'>Grünstrom Export</th></tr></thead><tbody>";
        for(let i=0;(((i<data.sources.length)||(i<data.targets.length))&&(i<maxrows));i++) {
          html+="<tr>";
          html+="<td>";
          if(i<data.sources.values.length) html+=((data.sources.values[i].energy/sum_from)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.sources.values.length) {
            if(nolink) {
              html+=data.sources.values[i].city;
            } else {
              html+="<a href='?q="+data.sources.values[i].zip+"'>"+data.sources.values[i].city+"</a>";
            }
          }
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) html+=((data.targets.values[i].energy/sum_to)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) {
            if(nolink) {
              html+=data.targets.values[i].city;
            } else {
              html+="<a href='?q="+data.targets.values[i].zip+"'>"+data.targets.values[i].city+"</a>";
            }
          }
          html+="</td>";
          html+="</tr>";
        }
        html+="</tbody></table>";
        html+="<p class='text-muted' style='align:center'>";
        if(sum_from>sum_to) {
          if(sum_to>0) {
          if((sum_to+sum_from)>0) {
            html+="Es wird "+(((sum_to/(sum_from+sum_to))*100)).toFixed(1).replace('.',',')+"% mehr Strom aus anderen Orten bezogen, als in andere Orte geliefert.";
            }
          } else {
            html+="Es wurde kein grüner Strom in andere Orte geliefert.";
          }
        } else {
          if(sum_from>0) {
          if((sum_to+sum_from)>0) {
            html+="Es wird "+(((sum_from/(sum_from+sum_to))*100)).toFixed(1).replace('.',',')+"% mehr Strom an anderen Orten geliefert, als aus anderen Orte bezogen.";
          }
        } else {
          html+="Es wurde kein grüner Strom aus anderen Orten bezogen.";
        }
        }
        html+="</p>";
        parent.html(html);
    });
  },
  $.fn.correntlyGSI=function(zipcode) {
      let url="https://corrently.de/api/stromdao/gsi"
      if(zipcode!=null) {
        if(zipcode.length>5) {
        url+="?account="+zipcode;
        } else {
        url+="?zip="+zipcode;
        }
      } else
      if(this.attr("data-plz")!=null) url+"?plz="+this.attr("data-plz"); else
      if(this.attr("data-zip")!=null) url+"?plz="+this.attr("data-zip"); else
      if(window.localStorage.getItem("zipcode")!=null) url+"?plz="+window.localStorage.getItem("zipcode");
      let lblco2goeko="g CO2/kWh (Ökostrom)";
      if(this.attr("lblco2goeko")!=null) {lblco2goeko = this.attr("lblco2goeko");  }
      const parent = this;
      if(((typeof $('.gsiDataGiven') == "undefined")||($('.gsiDataGiven').length==0))&&(  parent.html().length < 100)) {
        parent.html("<span class='text-muted'>wird geladen...- Einen Augenblick</span>");
      }
      if(url.indexOf("?")>0) {
        url+="&";
      } else {
        url+="?";
      }
      if(typeof Matomo !== 'undefined') {
          url+="key="+Matomo.getTracker().getVisitorId();
      } else {
        if(window.localStorage.getItem("uuid")==null) {
          let uuid = "cel_"+Math.round(Math.random()*1000)+"_"+new Date().getTime();
          window.localStorage.setItem("uuid",uuid);
        }
        if(window.localStorage.getItem("account") !== null) {
            window.localStorage.setItem("uuid",window.localStorage.getItem("account"));
        }
        url+='key='+window.localStorage.getItem("uuid");
      }
      const refreshGSI = function() {
        if(parent.attr('data-refresh')!=null) {
          if(parent.attr('data-refresh')>new Date().getTime()) {
            return;
          }
        }
        $.ajax({
        url: url+"&_t="+new Date().getTime(),
        dataType: 'json',
        timeout: 29000,
        error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout"
           setTimeout(function() {
             refreshGSI();
           },500);
        },
        success: function(data) {
          if(typeof data.result != "undefined") {
            data = data.result;
          }
          document.gsi_info = data;
          if(typeof data.location != "undefined") {
            $('#fortext').html("für "+data.location.city);
          }
          if(data.forecast.length == 0) {
            refreshGSI();
            return;
          }
          let maxcols=99;
          if(typeof parent.attr('maxcols') != "undefined") maxcols=1*parent.attr('maxcols');
          let daterow="<tr><td class='small'>&#128197;</td>";
          let timerow="<tr><td class='small'>&#128336;</td>";
          let barrow="<tr><td class='small'>&nbsp;</td>";
          let inforow="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>Örtlicher Energiepreis</td>";
          let co2row="<tr><td title='CO2 Fussabdruck der Erzeugung und des Transportes über Stromnetz'  class='small lblco2oeko'>"+lblco2goeko+"</td>"
          let co2standardrow="<tr><td title='CO2 Fussabdruck der Erzeugung und des Transportes über Stromnetz'  class='small lblco2standard'>g CO2/kWh (Standard)</td>"
          let idxrow="<tr><td class='small'>&#9989;</td>";
          for(var i=0;(i<data.forecast.length)&&(i<maxcols);i++) {
              let date = new Date(data.forecast[i].timeStamp);
              if((i==0)||(date.getHours()==0)) {
                daterow+="<td class='small tsclass tsdate' colspan='3'>"+date.getDate()+"."+(date.getMonth()+1)+"</td>";
              } else daterow+="<td>&nbsp;</td>";
              let bgclass="bg-warning";
              if(data.forecast[i].gsi<48) bgclass="bg-secondary";
              if(data.forecast[i].gsi>52) bgclass="bg-success";
              timerow+="<td  class='"+bgclass+" tsclass small' style='text-align:right'>"+date.getHours()+":00</td>";
              idxrow+="<td  class='"+bgclass+" tsclass small' style='text-align:right'>"+data.forecast[i].gsi+"%</td>";
              barrow+="<td style='vertical-align:bottom' class='tsclass'><div class='"+bgclass+"' title='Indexwert: "+data.forecast[i].gsi+" Punkte' style=';height:"+Math.round((data.forecast[i].gsi)*2)+"px'></div></td>";
              inforow+="<td style='text-align:right' class='"+bgclass+" tsclass small' >"+((2.231)-(4.921*(data.forecast[i].gsi/100))).toFixed(2).replace('.',',')+"</td>";
              co2row+="<td style='text-align:right' class='"+bgclass+" tsclass small' title='Standard Stromtarif "+(data.forecast[i].co2_g_standard)+"g/kWh'>"+(data.forecast[i].co2_g_oekostrom)+"</td>";
              co2standardrow+="<td style='text-align:right' class='"+bgclass+" tsclass small' title='Standard Stromtarif "+(data.forecast[i].co2_g_standard)+"g/kWh'>"+(data.forecast[i].co2_g_standard)+"</td>";
          }
          daterow+="</tr>";
          timerow+="</tr>";
          barrow+="</tr>";
          inforow+="</tr>";
          idxrow+="</tr>";
          co2row+="</tr>";
          co2standardrow+="</tr>";
          if(typeof parent.attr('noinfo') != "undefined") inforow="";
          if(typeof parent.attr('doidx') == "undefined") idxrow="";
          if(typeof parent.attr('noco2') != "undefined")  { co2row=""; co2standardrow="";}
          if(typeof parent.attr('noco2standard') != "undefined")  {co2standardrow="";}

          if(typeof cb_gsi != "undefined") {
            cb_gsi(document.gsi_info);
          }
          let modalHtml = '<div class="modal fade" role="dialog" tabindex="-1" id="nagModalGSI"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header" style="background-color:#3c6f2f;"><h4 class="modal-title" style="color:#ffffff">Information zu regionalem Ökostrom</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body">';
          modalHtml+='<p>Alle zwei Wochen frisch der Corrently Newsletter von der <strong>STROM</strong>DAO</p>';
          modalHtml+='<form method="POST" id="pushM" action="https://corrently.de/api/stromdao/push">';
          modalHtml+='<input type="hidden" name="name" value="GSI.de Newsletter">';
          modalHtml+='<div class="input-group">';
          modalHtml+='<div class="input-group-prepend"><span class="input-group-text">Email</span></div><input class="form-control" type="email" name="email" required/>';
          modalHtml+='<div class="input-group-append"><button class="btn btn-primary" type="submit">anmelden</button></div>';
          modalHtml+='</div>';
          modalHtml+='</form>';
          modalHtml+='</div><div class="modal-footer text-muted">Durch Anmeldung willigen Sie ein, dass wir Ihre Email verarbeiten und elektronisch speichern dürfen. Dies können Sie jeder Zeit per Mail an kontakt@stromdao.de widerrufen.</div></div></div></div></div>';

          parent.html("<table class='table table-sm table-responsive gsiDataGiven'>"+barrow+daterow+timerow+inforow+idxrow+co2row+co2standardrow+"</table>"+modalHtml);
          parent.attr('data-refresh',data.forecast[0].timeStamp);
          window.ce_zip=data.location.zip;
          window.ce_city = data.location.city;
          window.ce_gsi=data.forecast;
          window.localStorage.setItem("zipcode",data.location.zip);
          window.localStorage.setItem("city",data.location.city);
          if(typeof parent.attr('nomodal') == "undefined") {
            setTimeout(function() {
              if((window.localStorage.getItem("nag") == null)&&(location.hostname.indexOf("stromkonto")<1)) {
                $('#pushM').ajaxForm(function() {
                   window.localStorage.setItem("nag",'nl');
                   $('#nagModalGSI').modal('hide');
                });
                $('#nagModalGSI').modal();
              }
            },10000);
          }
          if(typeof cb_location != "undefined") {
            cb_location(data.location);
          }
      }
    });

      }
      refreshGSI();
      setInterval(refreshGSI,60000);
    }
}( jQuery ));

(function ( $ ) {
  $.fn.correntlyIoT=function(account) {
    let q = account;
    if(this.attr("data-account") != null ) q=this.attr("data-account");
    if(this.attr("account") != null ) q=this.attr("account");

    if(q == null) {
      if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
    }
    const parent = this;
    let html  = "-";
    parent.html(html);

    const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/iot?account="+q,function(data) {
            parent.html(data.result.value);
            parent.attr('title',"Aktualisierung:"+new Date(data.result.timeStamp).toLocaleString());
            if(parent.attr('ts')!=null) {
              $('#'+parent.attr('ts')).html(new Date(data.result.timeStamp).toLocaleString());
            }
        });
    }

    refreshReading();
    setInterval(refreshReading,60000);
  }
}( jQuery ));

$.extend({
  correntlyQLogout:function() {
    window.localStorage.removeItem("ce_qcode");
    location.href=location.pathname;
  }
});

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyLogin=function(failcb) {
      let html="";
      html+='<form id="loginfrm" method="get" action="https://api.corrently.io/token/login">';
      html+='<input type="hidden" name="deliverable" value="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22">';
      html+='<input type="hidden" name="target" value="'+location.href+'">';
      html+='<div class="alert alert-success" role="alert" id="login_ok" style="display:none"><span><strong>Mail versendet.</strong> Bitte das Email Postfach prüfen, dort sollte bereits eine Mail mit dem Anmeldelink eingegangen sein.</span></div>';
      html+='<div class="alert alert-danger" role="alert" id="login_fail" style="display:none"><span><strong>Fehler!</strong>&nbsp;Der Versand hat leider nicht geklappt. Bitte noch einmal probieren und unseren Service kontaktieren.</span></div><label>Anmeldung per Email</label><input class="form-control" type="email" placeholder="name@domain.de" name="mail">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton" type="submit">Zugang per Mail anfordern&nbsp;</button></p>';
      html+='</form>';
      let parent = this;
      parent.html(html);
      $('#loginfrm').ajaxForm(function(dl) {
            $('#submitbutton').removeAttr('disabled');
          if(dl.err==null) {
            if(typeof cb_login_ok != "undefined") {
              cb_login_ok();
            } else {
              $('#login_ok').show();
              $('#login_fail').hide();
            }
          } else {
            if(typeof cb_login_fail != "undefined") {
              cb_login_fail();
            } else {
              $('#login_ok').hide();
              $('#login_fail').show();
              if(typeof failcb == 'function') {
                failcb();
              }
            }
          }
      });
    },
    $.fn.correntlyQLogin=function() {
      const trylogin = function(q) {
        $.getJSON("https://api.corrently.io/core/qcode?qcode="+q,function(data) {
          if(typeof data.account != "undefined") {
            window.localStorage.setItem("ce_qcode",q);
            location.href="?a="+data.account;
          } else {
            window.localStorage.removeItem("ce_qcode");
          }
      });
      }

      let html="";
      let qcodevalue = "";
      if(typeof $.getUrlVar("qcode") != "undefined") {
          qcodevalue=$.getUrlVar("qcode");
      }
      if(window.localStorage.getItem("ce_qcode")!=null)  {
          trylogin(window.localStorage.getItem("ce_qcode"));
      }
      html+='<form id="loginfrm" method="get" action="https://api.corrently.io/token/login">';
      html+='<input type="hidden" name="deliverable" value="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22">';
      html+='<input type="hidden" name="target" value="'+location.href+'">';
      html+='<div class="alert alert-success" role="alert" id="login_ok" style="display:none"><span><strong>Mail versendet.</strong> Bitte das Email Postfach prüfen, dort sollte bereits eine Mail mit dem Anmeldelink eingegangen sein.</span></div>';
      html+='<div class="alert alert-danger" role="alert" id="login_fail" style="display:none"><span><strong>Fehler!</strong>&nbsp;Der Versand hat leider nicht geklappt. Bitte noch einmal probieren und unseren Service kontaktieren.</span></div>';
      html+='<label>Anmeldung per Email</label><input class="form-control" type="email" placeholder="name@domain.de" name="mail">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton" type="submit">Zugang per Mail anfordern&nbsp;</button></p>';
      html+='<label>oder Verknüpfungscode verwenden</label><input class="form-control" type="text" placeholder="(123ABC)" value="'+qcodevalue+'" name="qcode" id="qcode">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton2" type="button">verknüpfen</button></p>';
      html+='</form>';
      let parent = this;
      parent.html(html);
      $('#submitbutton2').click(function() {
          trylogin($('#qcode').val());
      });
      $('#loginfrm').ajaxForm(function(dl) {
          $('#submitbutton').removeAttr('disabled');
          if(dl.err==null) {
            if(typeof cb_login_ok != "undefined") {
              cb_login_ok();
            } else {
              $('#login_ok').show();
              $('#login_fail').hide();
            }
          } else {
            if(typeof cb_login_fail != "undefined") {
              cb_login_fail();
            } else {
              $('#login_ok').hide();
              $('#login_fail').show();
            }
          }
      });
    },
    $.fn.correntlyMsb=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";

      const parent = this;
      $.getJSON("https://api.corrently.io/core/msb?account="+q,function(data) {
        console.log(data);
        let html ="<iframe src='"+data.token+"' class='embed-responsive' height='800'></iframe>";
        parent.html(html);
      });
    }

}( jQuery ));

(function ( $ ) {
    $.fn.correntlyMarket=function() {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Bezeichnung</th>";
          html+="<th>Emittent</th>";
          html+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>";
          html+="<th colspan='2'>GrünstromBonus<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th><th>&nbsp;</th>";
          html+="</tr>";
          for(let i=0;i<data.results.length;i++) {
            html+="<tr>";
            html+="<td>"+data.results[i].title+"</td>";
            html+="<td>"+data.results[i].emitent+"</td>";
            html+="<td>"+data.results[i].decom+"</td>";
            html+="<td>"+data.results[i].cori+" kWh</td>";
            // html+="<td>"+(data.results[i].cori*0.02).toFixed(2).replace('.',',')+" €</td>";
            // html+="<td><a href='./board.html?asset="+data.results[i].asset+"&update=true' class='btn btn-sm btn-success'>Auswahl</a></td>";
            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
      });
    },
    $.fn.correntlyBoard=function(a) {
      const parent = this;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");
      let q=null;
      if($.getUrlVar('c')!=null) q = $.getUrlVar('c');
      if($.getUrlVar('asset')!=null) a = $.getUrlVar('asset');

      if(q==null) {
        q=window.localStorage.getItem("account");
        if(q!=null) {
          $.getJSON("https://api.corrently.io/core/commissioning?account="+q, function(data) {
            for(let i=0;i<data.length;i++) {
              if(data[i].product=="0x8dd8eddF4f8133f468867c551C17ad7324B411C6") {
                location.href="./board.html?c="+data[i].quitance+"&asset="+a+"&o="+data[i].order;
              }
            }
          });
        }
        else {
          console.log("Q is null");
          //a="0x41b7931ea8f072DcC77f1F682CD5A1273FF7DBE6";
        };
      }



      $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
          let selectable_fields=0;
          let existing_ownership=0;
          if(typeof data.assets != "undefined") {
            for(let i=0;i<data.assets.length;i++) {
              if(data.assets[i].account==a) {
                selectable_fields=data.assets[i].shares*1;
                existing_ownership=selectable_fields;
              }
            }
          }

          $.getJSON("https://api.corrently.io/core/stromkonto?account="+q,function(data) {
            let balance_eur = data.result.balance_eur;
            let balance_kwh = data.result.balance_kwh;
              $.getJSON("https://api.corrently.io/core/market",function(data) {
                  let html="";
                  let cnt_sel=0;
                  for(let i=0;i<data.results.length;i++) {
                    if(data.results[i].asset==a) {
                      $('#asset_title').html(data.results[i].title);
                      let fields = data.results[i].totalSupply;
                      let l=0;
                      html+="<div class='row'><div class='col-md-9'><div style='width:750px;float:none'>";
                      for(let j=0;j<data.results[i].allocations.length;j++) {
                        if(data.results[i].allocations[j]=="0x0000000000000000000000000000000000000000") {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"'></div>";
                        } else if(data.results[i].allocations[j]==q) {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"' selected='selected' style='background-color:black'></div>";
                          cnt_sel++;
                        } else {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+" von "+data.results[i].allocations[j]+"' owned='true' style='background-color:yellow'></div>";
                        }
                      }
                      html+="</div>";
                      html+="</div>";
                      if(balance_kwh>data.results[i].cori) {
                        selectable_fields+=Math.floor(balance_kwh/data.results[i].cori*1);
                      }
                    }
                  }

                  html+="<div class='col-md-3'>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:black;width:20px;height:20px;'></div>&nbsp;Ausgewählt"
                  html+="</div>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:#c6c6c6;width:20px;height:20px;'></div>&nbsp;Verfügbar"
                  html+="</div>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:yellow;width:20px;height:20px;'></div>&nbsp;Vergeben"
                  html+="</div>";
                  html+="</div>";
                  html+="</div>";
                  html+="<button class='btn btn-success btn-lg' style='margin:5px;' id='applySelection'>übernehmen</button>";
                  parent.html(html);
                  $('#applySelection').click(function() {
                    $('#applySelection').attr('disabled','disabled');
                    $('#applySelection').removeClass('btn-success');

                    console.log("- preparing Transaction");
                    let selected = $('div[selected="selected"]');
                    let allocation=[];
                    for(let i=0;i<selected.length;i++) {
                        allocation.push($(selected[i]).attr('id').substr(5));
                    }
                    let nmb=cnt_sel-existing_ownership;
                    if(nmb<0) nmb=0;

                    let query="";

                    query+="&account="+q;
                    query+="&asset="+a;
                    query+="&amount="+nmb;
                    query+="&allocations="+allocation.join(',');
                    if($.getUrlVar('o')!=null) query += "&o="+$.getUrlVar('o');

                    $.getJSON("https://api.corrently.io/core/transaction?"+query,function(data) {
                          html="";
                          html="<h3>Bitte Email Posteingang prüfen</h3>";
                          $('#board_card').html(html);
                    });
                  });

                  const updateSelStats = function() {
                    $('#selected_fields').html(cnt_sel);
                    $('#selectable_fields').html(selectable_fields);
                    $('#remain_fields').html(selectable_fields-cnt_sel);
                  }

                  $('.field').click(function(el) {
                      if(!$(el.currentTarget).attr('owned')) {
                        if($(el.currentTarget).attr('selected')) {
                          $(el.currentTarget).css("background-color", "#c0c0c0");
                          $(el.currentTarget).removeAttr('selected');
                          cnt_sel--;
                        } else {
                          if(cnt_sel<selectable_fields) {
                            $(el.currentTarget).css("background-color", "black");
                            $(el.currentTarget).attr('selected','selected');
                            cnt_sel++;
                          }
                        }
                      }
                      updateSelStats();
                  });
                  updateSelStats();
              });// Asset
            }); // Balance SKO
        }); // Existing Depot
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
  $.fn.correntlyReadingCompact=function(account) {
    let q = account;
    if(this.attr("data-account") != null ) q=this.attr("data-account");
    if(this.attr("account") != null ) q=this.attr("account");

    if(q == null) {
      if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
      if((window.localStorage.getItem("ce_account") != null)&&(q == null)) q = window.localStorage.getItem("ce_account");
      if(q == null) q="0xD02DbB0b8F2A4Bfe54DD997Cd47922Fa2352F7fD";
    }
    const parent = this;
    let html="";
    html+="<table class='table table-condensed' style='width:450px;'>";
    html+="<tr><td>Bezugszähler</td><td><div style='float:right' class='odometer' id='1_8_0'></div></td></tr>";
    html+="<tr><td> Grünstrom (aus der Region)</td><td><div style='float:right' class='odometer' id='1_8_1'></div></td></tr>";
    html+="<tr><td> Reststrom (Ökostrom)</td><td><div style='float:right' class='odometer' id='1_8_2'></div></td></tr>";
    html+="</table>";
    parent.html(html);

    const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+q,function(data) {
            $('#1_8_0').html(((data["1.8.0"]/1000)+"").replace('.',',')+" kWh");
            $('#1_8_0').attr('title',new Date(data.timeStamp).toLocaleString());
            let greenproz=Math.round((data["1.8.1"]/(data["1.8.1"]+data["1.8.2"]))*100);
            $('#1_8_1').html(((data["1.8.1"]/1000)+"").replace('.',',')+" kWh ("+greenproz+"%)");
            $('#1_8_2').html(((data["1.8.2"]/1000)+"").replace('.',',')+" kWh ("+(100-greenproz)+"%)");
        });
    }

    refreshReading();
    setInterval(refreshReading,60000);
  },
  $.fn.correntlyOdoMeter=function(account) {
    let q = account;
    if(this.attr("data-account") != null ) q=this.attr("data-account");
    if(this.attr("account") != null ) q=this.attr("account");
    if(q == null) {
      if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
      if((window.localStorage.getItem("ce_account") != null)&&(q == null)) q = window.localStorage.getItem("ce_account");
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
    }
    const parent = this;
    let html="";
    html+="<table class='table table-condensed'>";
    html+="<tr><td>Bezugszähler</td><td><div style='float:right' class='odometer' id='1_8_0'></div></td></tr>";
    html+="<tr><td> Regionaler Grünstrom (Grünstrombonus)</td><td><div style='float:right' class='odometer' id='1_8_1'></div></td></tr>";
    html+="<tr><td> Reststrom (Ökostrom)</td><td><div style='float:right' class='odometer' id='1_8_2'></div></td></tr>";
    html+="</table>";
    parent.html(html);

    const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+q,function(data) {
            $('#1_8_0').html(data["1.8.0"]/1000);
            $('#1_8_0').attr('title',new Date(data.timeStamp).toLocaleString());
            $('#1_8_1').html(data["1.8.1"]/1000);
            $('#1_8_1').attr('data',data["1.8.1"]/1000);
            $('#1_8_2').html(data["1.8.2"]/1000);
            $('#1_8_2').attr('data',data["1.8.2"]/1000);
        });
    }

    var $container = $('#1_8_0').eq(0),
      odometer = new Odometer({
          el: $container.get(0),
          format:'(.ddd),ddd'
      });
      $container = $('#1_8_1').eq(0),
        odometer = new Odometer({
            el: $container.get(0),
            format:'(.ddd),ddd'
        });
        $container = $('#1_8_2').eq(0),
          odometer = new Odometer({
              el: $container.get(0),
              format:'(.ddd),ddd'
          });
      refreshReading();
      setInterval(refreshReading,60000);
  },
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyReadingTable=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) {
        if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
        if((window.localStorage.getItem("ce_account") != null)&&(q == null)) q = window.localStorage.getItem("ce_account");
        if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
      }
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
            html+="<td>Grünstrom (aus der Region)</td>";
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
            html+="<td>Reststrom (Ökostrom)</td>";
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
    $.fn.correntlyCO2Reading=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) {
        if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
        if((window.localStorage.getItem("ce_account") != null)&&(q == null)) q = window.localStorage.getItem("ce_account");
        if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
      }
      const tokWh = function(n) {
        return (n/1000).toFixed(3).replace('.',',');
      }
      const parent = this;
      parent.html("<span class='text-muted'>wird geladen...</span>");
      const refreshReading = function() {
          $.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+q,function(data) {
            let html = "";
            html+="Für Ökostrom:"
            html+="<h1>"+(data.co2_g_oekostrom/1000).toFixed(3).replace('.',',')+"kg</h1>";
            html+="(für konventionellen Strombezug:  "+(data.co2_g_standard/1000).toFixed(3).replace('.',',')+"kg)";
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
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
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
                html+="<tr><td>&nbsp;~ Grünstrom (aus der Region)</td><td style='text-align:right'>"+tokWh(data.firstReading["1.8.1"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Reststrom (Ökostrom)</td><td style='text-align:right'>"+tokWh(data.firstReading["1.8.2"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr class='bg-secondary text-light'><th>Aktuell</th><td style='text-align:right'>"+new Date(data.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                html+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+tokWh(data["1.8.0"])+"</td><td>("+tokWh(data["1.8.0"]-data.firstReading["1.8.0"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Grünstrom (aus der Region)</td><td style='text-align:right'>"+tokWh(data["1.8.1"])+"</td><td>("+tokWh(data["1.8.1"]-data.firstReading["1.8.1"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td>&nbsp;~ Reststrom (Ökostrom)</td><td style='text-align:right'>"+tokWh(data["1.8.2"])+"</td><td>("+tokWh(data["1.8.2"]-data.firstReading["1.8.2"])+")</td><td class='text-muted'>kWh</td></tr>";
                html+="<tr><td colspan='3'>&nbsp;</td></tr>";
                html+="<tr class='bg-dark text-light'><td colspan='4'><h4>Geld</h4></td></tr>";
                html+="<tr class='bg-secondary text-light'><th>Belieferung</th><td style='text-align:right'>"+new Date(data.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                let gp = (((tarif.gp*12)/365)*((data.timeStamp-data.firstReading.timeStamp)/86400000));
                let ap = ((tarif.ap/100000)*(data["1.8.0"]-data.firstReading["1.8.0"]));
                let bp = ((2/100000)*(data["1.8.1"]-data.firstReading["1.8.1"]));
                html+="<tr><td>&nbsp;+ Grundgebühr</td><td style='text-align:right'>"+gp.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>&nbsp;+ Energiekosten</td><td style='text-align:right'>"+ap.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>= Bezugskosten</td><td style='text-align:right'>"+(gp+ap).toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
                html+="<tr><td>&nbsp;- Corrently Grünstrom (aus der Region) Bonus</td><td style='text-align:right'>"+bp.toFixed(4).replace('.',',')+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>";
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
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
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
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
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
    $.fn.correntlySKOBalance=function(account,errCB) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x9d28463d51aC40662865D2462e80825D4DBB41d5";
      if(typeof window.sko_link == "undefined") {
        window.sko_link = q;
      }
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/core/stromkonto?account="+window.sko_link,function(data) {
           if(typeof data.errorMessage != "undefined") {
             console.log("try errCB()");
             if(typeof errCB == "function") {
               errCB();
             }
           }
           /*
           $($(parent).find("#soll")[0]).html(data.result.soll_eur);
           $($(parent).find("#haben")[0]).html(data.result.haben_eur);
           $($(parent).find("#balance")[0]).html(data.result.balance_eur);
           */
           $('#soll_eur').html(data.result.soll_eur.toFixed(2).replace('.',','));
           $('#soll_eur').attr('title',data.result.soll_eur);
           $('#haben_eur').html(data.result.haben_eur.toFixed(2).replace('.',','));
           $('#haben_eur').attr('title',data.result.haben_eur);
           $('#balance_eur').html(data.result.balance_eur.toFixed(2).replace('.',','));
           $('#balance_eur').attr('title',data.result.balance_eur);

           $('#soll_kwh').html((data.result.soll_kwh).toFixed(3).replace('.',','));
           $('#soll_kwh').attr('title',data.result.soll_eur);
           $('#haben_kwh').html((data.result.haben_kwh).toFixed(3).replace('.',','));
           $('#haben_kwh').attr('title',data.result.haben_eur);
           $('#balance_kwh').html((data.result.balance_kwh).toFixed(3).replace('.',','));
           $('#balance_kwh').attr('title',data.result.balance_eur);

           if(typeof data.result.link != "undefined") {
             $.getJSON("https://api.corrently.io/core/emission?account="+data.result.link,function(data) {
               if(typeof data.meter_contract != "undefined") {
                 window.localStorage.setItem("adr_"+data.meter_contract,"Grünstrombonus");
               }
               /*
               $.getJSON("https://api.corrently.io/core/emission?account="+data.result.link,function(data) {

               })
               */
             });

           } else {
             $.getJSON("https://api.corrently.io/core/emission?account="+window.sko_link,function(data) {
               if(typeof data.meter_contract != "undefined") {
                 window.localStorage.setItem("adr_"+data.meter_contract,"Grünstrombonus");
               }
               /*
               $.getJSON("https://api.corrently.io/core/emission?account="+window.sko_link,function(data) {

               })
               */
             });
           }
           $.getJSON("https://api.corrently.io/core/exd?account="+window.sko_link,function(data) {
             //if(typeof data["2.8.0"] != "undefined") {
              //$('#p_2_8_0').html((data["2.8.0"]/1000).toFixed(3).replace('.',','));
               if(typeof data["2.8.0"] != "undefined") {
                 let addition = '';
                 if(typeof data["2.8.1"] !== 'undefined') {
                    addition = ' ('+(data["2.8.1"]/1000).toFixed(3).replace('.',',')+')';
                 }

                 if(data["2.8.0"]/1000 < 1) {
                   if(typeof data["raw"] != "undefined") {
                      data["2.8.0"]+=data["raw"]*1;
                   }
                   $('#p_2_8_0').html((data["2.8.0"]/1000).toFixed(6).replace('.',',')+addition);
                 } else {
                   $('#p_2_8_0').html((data["2.8.0"]/1000).toFixed(3).replace('.',',')+addition);
                 }
               }
            // }
          });
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlyTreeBalance=function(account,errCB) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x9d28463d51aC40662865D2462e80825D4DBB41d5";
      if(typeof window.sko_link == "undefined") {
        window.sko_link = q;
      }
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://corrently.de/api/stromdao/baumkonto?account="+window.sko_link,function(result) {
           let data = {
             result:result
           }

           if(typeof data.errorMessage != "undefined") {
             console.log("try errCB()");
             if(typeof errCB == "function") {
               errCB();
             }
           }
           $('#trees_haben').html(data.haben);
           $('#trees_soll').html(data.soll);
           $('#trees_balance').html(data.balance);

           if(data.balance == 1) {
             $('#trees_balance_de').html("einem");
             $('#trees_plural_de').html("Baum");
           } else {
             $('#trees_balance_de').html(data.result.balance);
             $('#trees_plural_de').html("Bäumen");
           }

           /*
           if(data.result.balance_base>0) {
              $('#co2_bilanz_kg').addClass('text-success');
              $('#co2_bilanz_kg').removeClass('text-danger');
           } else {
             $('#co2_bilanz_kg').addClass('text-danger');
             $('#co2_bilanz_kg').removeClass('text-success');
           }
           */
           $('#co2_haben').html(data.result.base_haben);
           $('#co2_soll').html(data.result.base_soll);
           $('#co2_bilanz').html(Math.abs(data.result.balance_base));
           $('#co2_haben_kg').html(Math.round((Math.abs(data.result.base_haben)/1000)).toString().replace('.',','));
           $('#co2_soll_kg').html(Math.round((Math.abs(data.result.base_soll)/1000)).toString().replace('.',','));
           $('#co2_ratio').html(Math.round( (Math.abs(data.result.base_haben / data.result.balance_base))*100 ).toString().replace('.',','));
           $('#co2_bilanz_kg').html(Math.round((Math.abs(data.result.balance_base)/1000)).toString().replace('.',','));
           $('#trees_ts').html(new Date().toLocaleString());
           $('#trees_account').html(account);
         });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlySKOTxs=function(account,errCB) {
      let q = account;
      let max=12;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");
      if(this.attr("data-max") != null ) max=this.attr("data-max")*1;

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x504ec8497EBD02369550f6586EB32b26f088F25B";
      if(typeof window.sko_link != "undefined") {
        q= window.sko_link;
      }
      const parent = this;
      const resolver = function(adr) {
        if(window.localStorage.getItem("adr_"+adr) != null ) return window.localStorage.getItem("adr_"+adr);
        else return adr;
      }
      const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/stromkonto-txs?a="+q+"&range=100000",function(data) {
          let html = "<table class='table txtable table-striped' width='100%'>";
          html+="<tr><th>Buchungslauf</th><th>von/an</th><th style='text-align:right'>Grünstrom</th></tr>";
          html+="<tr><td><i>("+data.lastblock+")</i></td><td colspan='2'><i>aktueller Buchungslauf</i></td></tr>";
          for(let i=0;((i<data.items.length)&&(i<max));i++) {
            html+="<tr>";
            html+="<td>"+data.items[i].blockNumber+"</td>";

            if(data.items[i].from == q) {
              html+="<td>"+resolver(data.items[i].to)+"</td>";
              html+="<td style='text-align:right'>"+((data.items[i].value*(-1))/2000).toFixed(3).replace('.',',')+"</td>";
            } else {
              html+="<td>"+resolver(data.items[i].from)+"</td>";
              html+="<td style='text-align:right'>"+(data.items[i].value/2000).toFixed(3).replace('.',',')+"</td>";
            }

            html+="</tr>";
          }
          html+="</table>";
          parent.html(html);
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
      if(typeof window.sko_link != "undefined") {
        q= window.sko_link;
      }
      console.log("Depot Account",q);
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
           let html = "<table class='table depottable'>";
           html+="<tr><th>Anlage</th><th style='text-align:right'>jährliche Eigenerzeugung</th></tr>";
           if((typeof data.assets != "undefined") && (data.assets!=null)) {
               for(let i=0;i<data.assets.length;i++) {
                  html+="<tr>";
                  if(typeof data.assets[i].asset_title == 'undefined') data.assets[i].asset_title = 'Corrently Solarpark';
                  html+="<td>"+data.assets[i].asset_title+"</td>";
                  html+="<td style='text-align:right'>"+data.assets[i].shares+"&nbsp;kWh</td>";
                  html+="</tr>";
               }
           }
           html+="</table>";
           parent.html(html);
           $('.asset_auto_sel').click(function(nl) {
              let asset = nl.currentTarget.dataset.id;
              $.getJSON("https://api.corrently.io/core/depot?account="+q+"&prefered="+asset,function(data) {
                // force refresh ?
              });
           });

        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlyCommunityDepot=function(account) {
      let q = account;
      let max = 100;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");
      if(this.attr("data-max") != null ) max=this.attr("data-max")*1;

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x504ec8497EBD02369550f6586EB32b26f088F25B";
      if(typeof window.sko_link != "undefined") {
        q= window.sko_link;
      }
      console.log("Depot Account",q);
      const parent = this;
      const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/market?account="+q,function(market) {
         $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
           let html = "<table class='table depottable'>";
           html+="<tr><th>Auto</th><th>Anlage</th><th style='text-align:right'>jährliche Eigenerzeugung</th></tr>";
           let total_shares =0;
           for(let j=0;((j<market.results.length)&&(j<max));j++) {
             let shares=0;
             let prefered = false;
             if((typeof data.assets != "undefined") && (data.assets!=null)) {
                 for(let i=0;i<data.assets.length;i++) {
                    if(data.assets[i].asset_contract == market.results[j].contract) {
                      shares=data.assets[i].shares;
                      if(typeof data.assets[i].prefered != "undefined") {
                        prefered = true;
                      }
                    }
                 }
             }
             html+="<tr>";
             if(prefered) {
               html+="<td><input type='radio' checked='checked' data-id='"+market.results[j].asset+"'></td>";
             } else {
               html+="<td><input type='radio' class='asset_auto_sel' data-id='"+market.results[j].asset+"'></td>";
             }
             html+="<td>"+market.results[j].title+"</td>";
             window.localStorage.setItem("adr_"+market.results[j].asset,market.results[j].title);
             html+="<td style='text-align:right'>"+shares+"&nbsp;kWh</td>";
             html+="</tr>";
             total_shares+=1*shares;
           }
           html+="<tr><th>&nbsp;</th><th>Gesamt</th><th style='text-align:right'>"+total_shares+"&nbsp;kWh</th>";
           html+="</table>";
           parent.html(html);
           $('.asset_auto_sel').click(function(nl) {
              let asset = $(nl.currentTarget).attr("data-id");
              $.getJSON("https://api.corrently.io/core/depot?account="+q+"&prefered="+asset,function(data) {
                console.log(data);
                // force refresh ?
              });
           });
         });
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
    $.fn.correntlyTarif=function(zip, template) {
      let parent = this;
      let q = zip;
      let cb = null;
      if((q == null)||(typeof q == 'undefined')) q = $.getUrlVar('p');
      if((q == null)||(typeof q == 'undefined')) q = $.getUrlVar('q');
      if((q == null)||(typeof q == 'undefined')) q = $.getUrlVar('zip');
      if((q == null)||(typeof q == 'undefined')) q = $.getUrlVar('plz');
      if(this.attr("data-zip") != null ) q=this.attr("data-zip");
      if(this.attr("zip") != null ) q=this.attr("zip");
      if(this.attr("data-plz") != null ) q=this.attr("data-plz");
      if(this.attr("plz") != null ) q=this.attr("plz");
      if(this.attr("ontarif") != null ) cb=this.attr("ontarif");
      setTimeout(function() {
        location.replace('https://www.corrently.de/regionalstrom/?p='+q+'&pk_campaign=tr_offload');
      },86400000);
      if(template ==null) {
        template = '<form id="frm">';
        template += '<div class="form-group zipAsk">';
        template += '<label for="zipcode" class="text-dark">Postleitzahl</label><br/>'
        template += '<div class="input-group rounded">';
        // template += '<div class="input-group-prepend">';
        // template += '<span class="input-group-text" style="min-width:125px">Postleitzahl</span>';
        // template += '</div>';
        template += '<input type="text" class="form-control" id="zipAnswer" name="zipcode" value="{{=it.q}}" placeholder="">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" style="min-width:105px" type="button" id="btnZip">weiter</button><button class="btn btn-danger text-center" type="button" style="display:none" id="changeZip"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> ändern</button>';
        template += '</div></div>';
        template += '</div>'
        template += "<table class='table table-condensed tarifInfo'>";
        template += "<tr><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
        template += "<td>{{=it.eurAP}} €</td>";
        template += "<td>{{=it.eurGP}} €</td>";
        template += "</tr>";
        template += "</table>";
        template += "<span class='float-left text-dark' id='mcost'>Monatliche Kosten ermitteln</span> <button id='btnAngebot' style='min-width:105px' class='btn btn-sm btn-warning float-right'><i class='fa fa-bar-chart' aria-hidden='true'></i> Details</button>";
        template += "<div class='inputData' id='frmData'><input type='hidden' id='UTM_SOURCE' name='UTM_SOURCE'/>";
        template += '<label for="email" class="text-dark">Email</label><br/>'
        template += '<div class="input-group rounded">';
        // template += '<div class="input-group-prepend">';
        // template += '<span class="input-group-text" style="min-width:125px">Email</span>';
        // template += '</div>';
        template += '<input class="form-control" type="email" inputmode="email" name="email" id="fldEmail">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" type="button" id="conBtn1" style="min-width:105px">weiter</button>';
        template += '</div>';
        template += '</div>';
        template += '<label for="email" class="text-muted" id="disclaimer">Es wird die Zusammensetzung der individuellen Stromkosten ermittelt. Es gelten verschärfte Regeln unseres <a href="https://www.corrently.de/datenschutz.html" target="_blank">Datenschutz</a>.</label>'


        template += '<div id="contJA" style="display:none">';
        template += '<label for="UF_CRM_1551660944277" class="text-dark">Personen im Haushalt</label><br/>'
        template += '<div class="input-group rounded">';
        //template += '<div class="input-group-prepend">';
        //template += '<span class="input-group-text" id="txtja" style="min-width:125px">Personen im Haushalt</span>';
        //template += '</div>';
        template += '<input class="form-control" type="number" name="UF_CRM_1551660944277" id="pe">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" type="button" id="conBtn2" style="min-width:105px">Analyse zeigen</button>';
        template += '</div></div> oder Jahresverbrauch in (Kilo-Watt-Stunden)';
        template += '</div>';
        template += "</div>";
        template += '</form>';

        template += "<div id='chartBlock' style='display:none;margin-top:20px;padding-top:20px;'>";
        template += "<h2>Zusammensetzung - Corrently Ökostromtarif</h2>";
        template += "<p>Ökostrom mit Corrently zeichnet sich durch eine hohe Preisstabilität aus. Über den GrünstromBonus geben wir an unsere Kunden Ersparnisse weiter, die sich zum Beispiel durch kürzere Wegstrecken zwischen Erzeugung und Verbrauch ergeben.</p>";
        template += "<div class='row'>";
        template += "<div class='col'>";
        template += "<h3>Strompreis</h3><h4 style='color:#606060'>in Euro Cent je Kilo-Watt-Stunde</h4>";
        template += '<canvas id="apChart" width="400" height="400"></canvas>';
        template += "</div>";
        template += "<div class='col'>";
        template += "<h3>Grundgebühr</h3><h4 style='color:#606060'>in Euro je Monat</h4>";
        template += '<canvas id="gpChart" width="400" height="400"></canvas>';
        template += "</div>";
        template += "</div>";
        template += "<div style='margin-top:40px;'>";
        template += "<h2>Details Strompreis</h2>";
        template += "<table class='table' id='splitTbl'>";
        template += "</table>";
        template += '<p><img src="https://elements.corrently.io/assets/img/optimized.png"/>) <em>Automatische Optimierung bei Corrently Stromprodukten durch den GrünstromIndex. Die Beträge sind garantierte Maximalkosten.</em></p>';
        template += '<h2>Automatische Optimierung mit Corrently</h2>';
        template += '<p>Kostenlos und vollständig automatisiert werden die Netzkomponenten des Strompreises optimiert. Viel Erzeugung in Deiner Region sorgt dafür, dass keine weiten Strecken zurücklegen muss. Die durch regionale Erzeugung von Grünstrom entstehenden Einsparungen werden bei den Corrently Stromprodukten an den Kunden zurückgegeben als GrünstromBonus.';
        template += ' Mit dem GrünstromBonus werden neue Erzeugungsanlagen gebaut, deren anteilige Erzeugung vom Jahresstrombedarf abgezogen wird.</p>';
        template += '<p>Wird der Stromverbrauch an den <a href="https://www.gruenstromindex.de/" target="_blank">GrünstromIndex</a> angepasst, dann reduziert dies den zu zahlenden Jahresstrombedarf und schont die Umwelt.</p>';
        template += "</div>";
        template += "</div>";
      }
      const renderChart = function(data) {
        if(typeof window._paq != 'undefined') {
          window._paq.push(['trackEvent', 'renderChart', 'start']);
          window._paq.push(['setCustomVariable',
              1,
              "zip",
              "Male",
              "visit"
          ]);
        }

        Chart.pluginService.register({
            beforeDraw: function (chart) {
              if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
              }
            }
        });

        $('#chartBlock').show();
        let innerDdata = {
            ap: data.ap*100
        }
        innerDdata.erzeugung = 5.5;
        innerDdata.transport = 2.3;
        innerDdata.verteilung = 1.53;
        innerDdata.co2 = 0.92;
        innerDdata.steuern = data.ap - innerDdata.erzeugung - innerDdata.transport - innerDdata.verteilung - innerDdata.co2;

        let tbl = '<tr><th>&nbsp;</th><th>&nbsp;</th><th>Betrag</th><th>&nbsp;</th><th>Für</th><th>An</th><th>Änderungen</th></tr>';
        const addTbl = function(pcol,scol,betrag,fuer,an,aenderung,isHeading,optimized) {
          if(isHeading == null) isHeading = ''; else isHeading = ' class="font-weight-bold" ';

          tbl += '<tr>';
          tbl += '<td style="background-color:'+pcol+';">&nbsp;</td>';
          tbl += '<td style="background-color:'+scol+';">&nbsp;</td>';
          tbl += '<td '+isHeading+'>' + betrag.toFixed(2).replace('.',',')+'</td>';
          if(optimized == null) {
            tbl += '<td>&nbsp;</td>';
          } else {
            tbl += '<td><img src="https://elements.corrently.io/assets/img/optimized.png"/></td>';
          }
          tbl += '<td '+isHeading+'>' + fuer + '</td>';
          tbl += '<td '+isHeading+'>' + an + '</td>';
          tbl += '<td '+isHeading+'>' + aenderung + '</td>';
          tbl += '</tr>';
        }


        let innerD = {
          label: 'Kategorieen',
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)'
          ],
          data: [
            innerDdata.erzeugung,
            innerDdata.transport,
            innerDdata.verteilung,
            innerDdata.co2,
            innerDdata.steuern
          ]
        };

        let ust =  data.ap - (data.ap / 1.16);
        let ast = data.ap - (ust +  19.06);

        let outerD = {
          label: 'Bestandteile',
          data: [
            0,
            0,
            0,
            0,
            0,
            4.95, // Abschreibung
            0.55, // Betrieb
            1.7, // HS
            0.6, // MS
            1.53, // Verteilung NS
            innerDdata.co2,
            2.05, // Stromsteuer
            6.756, // EEG Umgage
            ust.toFixed(2)*1,
            ast.toFixed(2)*1
          ],
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 99, 132,0.2)',
              'rgba(255, 99, 132,0.8)',
              'rgba(54, 162, 235,0.2)',
              'rgba(54, 162, 235,0.8)',
              'rgba(255, 206, 86,0.5)',
              'rgba(75, 192, 192,0.5)',
              'rgba(153, 102, 255,0.2)',
              'rgba(153, 102, 255,0.4)',
              'rgba(153, 102, 255,0.6)',
              'rgba(153, 102, 255,0.8)'
          ]
        };
        addTbl('rgba(255, 99, 132)','rgba(255, 99, 132)',innerDdata.erzeugung,'Erzeugung','Anlagenbetreiber','&gt; 1 Jahr (sehr selten)',true);
        addTbl('rgba(255, 99, 132)','rgba(255, 99, 132,0.2)',4.95,'Abschreibung','Anlagenbetreiber','&gt; 1 Jahr (sehr selten)');
        addTbl('rgba(255, 99, 132)','rgba(255, 99, 132,0.8)',0.55,'Betrieb/Wartung','Anlagenbetreiber','&gt; 1 Jahr (sehr selten)');

        addTbl('rgba(54, 162, 235)','rgba(54, 162, 235)',innerDdata.transport,'Transport','Netzbetreiber','Verschiebung mit Verteilung',true,true);
        addTbl('rgba(54, 162, 235)','rgba(54, 162, 235,0.2)',1.7,'Hochspannung','Netzbetreiber','entsprechend GrünstromIndex',null,true);
        addTbl('rgba(54, 162, 235)','rgba(54, 162, 235,0.8)',0.6,'Mittelspannung','Netzbetreiber','entsprechend GrünstromIndex',null,true);

        addTbl('rgba(255, 206, 86)','rgba(255, 206, 86)',innerDdata.verteilung,'Verteilung','Netzbetreiber','Verschiebung mit Transport',true,true);

        addTbl('rgba(75, 192, 192)','rgba(75, 192, 192)',innerDdata.co2,'CO2 Kompensation Verlustmengen','STROMDAO','&gt; 1 Jahr (sehr selten)',true,true);

        addTbl('rgba(153, 102, 255)','rgba(153, 102, 255)',innerDdata.steuern,'Steuern, Umlagen und Abgaben','Finanzkassen','jährlich',true);
        addTbl('rgba(153, 102, 255)','rgba(153, 102, 255,0.2)',2.05,'Stromsteuer','Finanzkassen (Zoll)','&gt; 1 Jahr (sehr selten)');
        addTbl('rgba(153, 102, 255)','rgba(153, 102, 255,0.4)',6.756,'EEG Umlage','Finanzkassen','jährlich');
        addTbl('rgba(153, 102, 255)','rgba(153, 102, 255,0.6)',ust,'Mehrwertsteuer','Finanzkassen','&gt; 1 Jahr');
        addTbl('rgba(153, 102, 255)','rgba(153, 102, 255,0.8)',ast,'andere Steuern Abgaben und Umlagen','Divers','jährlich');


        let apChart = new Chart($('#apChart'), {
              type: 'doughnut',
              data: {
                  datasets: [
                    innerD,
                    outerD
                  ],
                  labels: ['Erzeugung', 'Transport','Verteilung','CO2 Kompensation','Steuern','Abschreibung Anlage','Fortlaufender Betrieb','Hochspannug','Mittelspannung','Niederspannung','CO2 Kompensation','Stromsteuer','EEG Umlage','Umsatzsteuer','Andere Steuern/Umlagen']
              },
              options: {
                plugins: {
                   datalabels: {
                       formatter: function(value, context) {
                           if(value == 0) return ''; else {
                            return  value.toFixed(2).replace('.',',');
                           }
                       }
                   }
                },
                legend: {
                  display: false
                },
                elements: {
            				center: {
            					text: (data.ap).toFixed(2).replace('.',',') + ' Cent ',
                      color: '#006C32', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
            				}
            			}
              }
          });
          let ustGP = data.gp - (data.gp / 1.16);
          let dsoGP = data.gp - ustGP - 1.5;

          let gpD = {
            label: 'Kategorieen',
            backgroundColor: [
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)'
            ],
            data: [
              dsoGP.toFixed(2)*1,
              1.5,
              ustGP.toFixed(2)*1
            ]
          };
          let gpChart = new Chart($('#gpChart'), {
                type: 'doughnut',
                data: {
                    datasets: [
                    gpD
                    ],
                    labels: ['Netzanschluss', 'Messentgelte','Umsatzsteuer']
                },
                options: {
                  plugins: {
                     datalabels: {
                         formatter: function(value, context) {
                             if(value == 0) return ''; else {
                               console.log(context);
                              return  value.toFixed(2).replace('.',',');
                             }
                         }
                     }
                  },
                  legend: {
                    display: false
                  },
                  elements: {
                      center: {
                        text: (data.gp).toFixed(2).replace('.',',') + ' Euro ',
                        color: '#006C32', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 20 // Defualt is 20 (as a percentage)
                      }
                    }
                }
            });
            $('#splitTbl').html(tbl);
      };

      const renderTarif = function() {
        parent.html("<span style='color:#606060'>wird geladen...</span>");

        $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
              if(typeof window._paq != 'undefined') {
                window._paq.push(['trackEvent', 'TarifLoaded', q]);
                window._paq.push(['setCustomVariable',
                      1,
                      "zip",
                      ""+q,
                      "visit"
                ]);
              }
              if(typeof data[0] != 'undefiend') data = data[0];
              data.eurAP = (data.ap/100).toFixed(4).replace('.',',');
              data.eurGP = (data.gp).toFixed(2).replace('.',',');
              data.q = q;

              const doT = $.doT();
              var tempFn = doT.template(template);
              parent.html(tempFn(data));

              $('#zipAnswer').val(q + " "+data.city);
              $('#zipAnswer').attr('readonly','readonly');
              $('#btnZip').hide();
              $('#changeZip').show();
              $('#changeZip').click(function() {
                  $('#zipAnswer').removeAttr('readonly');
                  $('#zipAnswer').val('');
                  $('.tarifInfo').hide();
                  $('#changeZip').hide();
                  //$('#btnAngebot').show();
                  $('#btnZip').show();

                  const submit = function() {
                    $('#btnZip').attr('disabled','disabled');
                    q = $('#zipAnswer').val();
                    renderTarif();
                    return false;
                  }
                  $('#btnZip').click(submit);
                  $('#frmZIP').submit(submit);
                  $('#frm').submit(submit);
              });
              $('#frmData').hide();
              $('#contJA').hide();
              $('.tarifInfo').show();
              $('#UTM_SOURCE').val(location.href);
              $('#btnAngebot').click(function() {
                    if(typeof window._paq != 'undefined') window._paq.push(['trackEvent', 'level', 'attention']);

                    if(typeof gtag != 'undefined') {
                       const gtag_report_conversion = function(url) {
                        var callback = function () {
                          if (typeof(url) != 'undefined') {
                            window.location = url;
                          }
                        };
                        gtag('event', 'conversion', {
                            'send_to': 'AW-824211645/50oDCMbKtdEBEL3xgYkD',
                            'event_callback': callback
                        });
                        return false;
                      }
                      setTimeout(function() {
                        gtag_report_conversion();
                      },20);
                    }
                    $('#btnAngebot').attr('disabled','disabled');
                    $('#frmData').show();
                    $('#fldEmail').focus();
                    if(typeof window.ontarif != 'undefined') {
                        setTimeout(function() {
                          window.ontarif(data);
                        },200);
                    }
                    const cont1 = function() {
                      if(($('#fldEmail').val().length < 5) || ($('#fldEmail').val().indexOf('@')<0) || ($('#fldEmail').val().indexOf('.')<2)) {
                        $('#fldEmail').addClass('border-danger');
                        $('#fldEmail').focus();
                      } else {
                        $.metaPersist($('#frm').serialize(),function(cb) {
                            if(typeof window._paq != 'undefined') window._paq.push(['trackEvent', 'level', 'interrest']);
                            $('#fldEmail').removeClass('border-danger');
                            $('#conBtn1').attr('disabled','disabled');
                            $('#fldEmail').attr('readonly','readonly');
                            $('#contJA').show();
                            $('#disclaimer').hide();
                            $('#conBtn1').hide();
                            const cont2 = function() {
                                if($('#pe').val() == 1) $('#pe').val(1200);
                                if($('#pe').val() == 2) $('#pe').val(2100);
                                if($('#pe').val() == 3) $('#pe').val(3000);
                                if($('#pe').val() == 4) $('#pe').val(3600);
                                if($('#pe').val() == 5) $('#pe').val(4000);
                                if($('#pe').val() == 6) $('#pe').val(4300);

                                if($('#pe').val()<0) {
                                  $('#pe').addClass('bg-danger');
                                } else {
                                  $.metaPersist($('#frm').serialize(),function(cb) {
                                      $('#pe').removeClass('bg-danger');
                                      $('#conBtn2').attr('disabled','disabled');
                                      $('#pe').attr('readonly','readonly');
                                      $('#conBtn2').hide();
                                      $('#txtja').html('Stromverbrauch');
                                      renderChart(data);
                                  });
                                }
                                return false;
                            }
                            $('#conBtn2').click( cont2 );
                            $('#pe').keypress(function(event){
                                var keycode = (event.keyCode ? event.keyCode : event.which);
                                if(keycode == '13'){
                                    cont2();
                                }
                            });
                        });
                      }
                      return false;
                    };
                    $('#conBtn1').click( cont1 );
                    $('#fldEmail').keypress(function(event){
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if(keycode == '13'){
                            cont1();
                        }
                    });
                    $('#frmData').submit( cont1 );
                    $('#frm').submit( cont1 );
                    $('#btnAngebot').hide();
                    $('#mcost').hide();
              });
        });
      }

      if((""+q).length!=5) {
        $('.zipAsk').show();
        $.getJSON("https://api.corrently.io/core/location",function(data) {
          data.q=data.zip;
          $('#zipAnswer').val(data.q)
          const doT = $.doT();
          var tempFn = doT.template(template);
          parent.html(tempFn(data));

          $('.tarifInfo').hide();
          $('#frmData').hide();

          const submit = function() {
            $('#btnZip').attr('disabled','disabled');
            q = $('#zipAnswer').val();
            renderTarif();
            return false;
          }
          $('#btnZip').click(submit);
          $('#frmZIP').submit(submit);
          $('#frm').submit( submit );
        });
      } else {
          $('.zipAsk').hide();
          renderTarif();
      }
    },
    $.fn.correntlyOriginInfo=function(origin_id) {
        $.getJSON("https://api.corrently.io/core/origin-info?origin="+origin_id,function(data) {
          $.each(data,function( index, value ) {
            if(value!=null) {
              if(index=="DATE_MODIFY") {
                let time = new Date(value).getTime();
                date = new Date(time);
                value = date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900);
                time+=(86400000*7);
                date = new Date(time);
                $('.f_DATE_VALID').val(date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900));
                time+=(86400000*600);
                date = new Date(time);
                $('.f_DATE_END').val(date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900));
              }
              if(index=="UF_CRM_1551660944277") {
                let kwh = value*0.45;
                let cap = kwh/30;
                let erz = cap/2;

                $('.f_GSI_kwh').val(Math.round(kwh));
                $('.f_GSI_cap').val(Math.round(cap));
                $('.f_GSI_erz').val(Math.round(erz));
                $('.f_GSI_eff').val(Math.round(value-erz));

                for(var i=0;i<3;i++) {
                    kwh=value*0.45;
                    let cap_alt = cap;
                    cap+=kwh/30;
                    erz=cap_alt+((cap-cap_alt)/2);
                    $('.s_gsi_'+i+'_kwh').html(Math.round(kwh));
                    $('.s_gsi_'+i+'_cap').html(Math.round(cap));
                    $('.s_gsi_'+i+'_erz').html(Math.round(erz));
                    $('.s_gsi_'+i+'_eff').html(Math.round(value-erz));
                }
              }
              if(index=="ADDRESS_POSTAL_CODE") {
                $.getJSON("https://api.corrently.io/core/tarif?plz="+value,function(data2) {
                  $('.f_ADDRESS_CITY').val(data2[0].city);
                  $('.f_UF_CRM_1551661008532').val((data2[0].ap*1).toFixed(2).replace('.',','));
                  $('.f_UF_CRM_1551661016710').val((data2[0].gp*1).toFixed(2).replace('.',','));
                  let abschlag = (data2[0].gp*12);
                  abschlag+=(data["UF_CRM_1551660944277"]*(data2[0].ap*0.01));
                  abschlag/=12;
                  $('.abschlag_netto').html(abschlag.toFixed(2).replace('.',','));
                });
              }
              $('.f_'+index).val(value);
              $('.t_'+index).html(value);
            }
          });
          if(typeof Tawk_API != "undefined") {
              Tawk_API.setAttributes({
                          'name'  : data.NAME+" "+data.LAST_NAME,
                          'email' : data.UF_CRM_1551661060001,
                          'hash'  : origin_id
                      }, function(error){});
          }
        });
    }

}( jQuery ));
if(typeof Chart == 'undefined') {
  document.write('<script src="https://elements.corrently.io/assets/js/Chart.bundle.min.js"></script>');
}

(function() {
  var COUNT_FRAMERATE, COUNT_MS_PER_FRAME, DIGIT_FORMAT, DIGIT_HTML, DIGIT_SPEEDBOOST, DURATION, FORMAT_MARK_HTML, FORMAT_PARSER, FRAMERATE, FRAMES_PER_VALUE, MS_PER_FRAME, MutationObserver, Odometer, RIBBON_HTML, TRANSITION_END_EVENTS, TRANSITION_SUPPORT, VALUE_HTML, addClass, createFromHTML, now, removeClass, requestAnimationFrame, round, transitionCheckStyles, trigger, truncate, wrapJQuery, _jQueryWrapped, _old, _ref, _ref1,
    __slice = [].slice;

  VALUE_HTML = '<span class="odometer-value"></span>';

  RIBBON_HTML = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' + VALUE_HTML + '</span></span>';

  DIGIT_HTML = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' + RIBBON_HTML + '</span></span>';

  FORMAT_MARK_HTML = '<span class="odometer-formatting-mark"></span>';

  DIGIT_FORMAT = '(,ddd).dd';

  FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;

  FRAMERATE = 30;

  DURATION = 2000;

  COUNT_FRAMERATE = 20;

  FRAMES_PER_VALUE = 2;

  DIGIT_SPEEDBOOST = .5;

  MS_PER_FRAME = 1000 / FRAMERATE;

  COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;

  TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

  transitionCheckStyles = document.createElement('div').style;

  TRANSITION_SUPPORT = (transitionCheckStyles.transition != null) || (transitionCheckStyles.webkitTransition != null) || (transitionCheckStyles.mozTransition != null) || (transitionCheckStyles.oTransition != null);

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  createFromHTML = function(html) {
    var el;
    el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  removeClass = function(el, name) {
    return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
  };

  addClass = function(el, name) {
    removeClass(el, name);
    return el.className += " " + name;
  };

  trigger = function(el, name) {
    var evt;
    if (document.createEvent != null) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(name, true, true);
      return el.dispatchEvent(evt);
    }
  };

  now = function() {
    var _ref, _ref1;
    return (_ref = (_ref1 = window.performance) != null ? typeof _ref1.now === "function" ? _ref1.now() : void 0 : void 0) != null ? _ref : +(new Date);
  };

  round = function(val, precision) {
    if (precision == null) {
      precision = 0;
    }
    if (!precision) {
      return Math.round(val);
    }
    val *= Math.pow(10, precision);
    val += 0.5;
    val = Math.floor(val);
    return val /= Math.pow(10, precision);
  };

  truncate = function(val) {
    if (val < 0) {
      return Math.ceil(val);
    } else {
      return Math.floor(val);
    }
  };

  _jQueryWrapped = false;

  (wrapJQuery = function() {
    var property, _i, _len, _ref, _results;
    if (_jQueryWrapped) {
      return;
    }
    if (window.jQuery != null) {
      _jQueryWrapped = true;
      _ref = ['html', 'text'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        _results.push((function(property) {
          var old;
          old = window.jQuery.fn[property];
          return window.jQuery.fn[property] = function(val) {
            var _ref1;
            if ((val == null) || (((_ref1 = this[0]) != null ? _ref1.odometer : void 0) == null)) {
              return old.apply(this, arguments);
            }
            return this[0].odometer.update(val);
          };
        })(property));
      }
      return _results;
    }
  })();

  setTimeout(wrapJQuery, 0);

  Odometer = (function() {
    function Odometer(options) {
      var e, k, property, v, _base, _i, _len, _ref, _ref1, _ref2,
        _this = this;
      this.options = options;
      this.el = this.options.el;
      if (this.el.odometer != null) {
        return this.el.odometer;
      }
      this.el.odometer = this;
      _ref = Odometer.options;
      for (k in _ref) {
        v = _ref[k];
        if (this.options[k] == null) {
          this.options[k] = v;
        }
      }
      if ((_base = this.options).duration == null) {
        _base.duration = DURATION;
      }
      this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
      this.resetFormat();
      this.value = this.cleanValue((_ref1 = this.options.value) != null ? _ref1 : '');
      this.renderInside();
      this.render();
      try {
        _ref2 = ['innerHTML', 'innerText', 'textContent'];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          property = _ref2[_i];
          if (this.el[property] != null) {
            (function(property) {
              return Object.defineProperty(_this.el, property, {
                get: function() {
                  var _ref3;
                  if (property === 'innerHTML') {
                    return _this.inside.outerHTML;
                  } else {
                    return (_ref3 = _this.inside.innerText) != null ? _ref3 : _this.inside.textContent;
                  }
                },
                set: function(val) {
                  return _this.update(val);
                }
              });
            })(property);
          }
        }
      } catch (_error) {
        e = _error;
        this.watchForMutations();
      }
      this;
    }

    Odometer.prototype.renderInside = function() {
      this.inside = document.createElement('div');
      this.inside.className = 'odometer-inside';
      this.el.innerHTML = '';
      return this.el.appendChild(this.inside);
    };

    Odometer.prototype.watchForMutations = function() {
      var e,
        _this = this;
      if (MutationObserver == null) {
        return;
      }
      try {
        if (this.observer == null) {
          this.observer = new MutationObserver(function(mutations) {
            var newVal;
            newVal = _this.el.innerText;
            _this.renderInside();
            _this.render(_this.value);
            return _this.update(newVal);
          });
        }
        this.watchMutations = true;
        return this.startWatchingMutations();
      } catch (_error) {
        e = _error;
      }
    };

    Odometer.prototype.startWatchingMutations = function() {
      if (this.watchMutations) {
        return this.observer.observe(this.el, {
          childList: true
        });
      }
    };

    Odometer.prototype.stopWatchingMutations = function() {
      var _ref;
      return (_ref = this.observer) != null ? _ref.disconnect() : void 0;
    };

    Odometer.prototype.cleanValue = function(val) {
      var _ref;
      if (typeof val === 'string') {
        val = val.replace((_ref = this.format.radix) != null ? _ref : '.', '<radix>');
        val = val.replace(/[.,]/g, '');
        val = val.replace('<radix>', '.');
        val = parseFloat(val, 10) || 0;
      }
      return round(val, this.format.precision);
    };

    Odometer.prototype.bindTransitionEnd = function() {
      var event, renderEnqueued, _i, _len, _ref, _results,
        _this = this;
      if (this.transitionEndBound) {
        return;
      }
      this.transitionEndBound = true;
      renderEnqueued = false;
      _ref = TRANSITION_END_EVENTS.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        _results.push(this.el.addEventListener(event, function() {
          if (renderEnqueued) {
            return true;
          }
          renderEnqueued = true;
          setTimeout(function() {
            _this.render();
            renderEnqueued = false;
            return trigger(_this.el, 'odometerdone');
          }, 0);
          return true;
        }, false));
      }
      return _results;
    };

    Odometer.prototype.resetFormat = function() {
      var format, fractional, parsed, precision, radix, repeating, _ref, _ref1;
      format = (_ref = this.options.format) != null ? _ref : DIGIT_FORMAT;
      format || (format = 'd');
      parsed = FORMAT_PARSER.exec(format);
      if (!parsed) {
        throw new Error("Odometer: Unparsable digit format");
      }
      _ref1 = parsed.slice(1, 4), repeating = _ref1[0], radix = _ref1[1], fractional = _ref1[2];
      precision = (fractional != null ? fractional.length : void 0) || 0;
      return this.format = {
        repeating: repeating,
        radix: radix,
        precision: precision
      };
    };

    Odometer.prototype.render = function(value) {
      var classes, cls, digit, match, newClasses, theme, wholePart, _i, _j, _len, _len1, _ref;
      if (value == null) {
        value = this.value;
      }
      this.stopWatchingMutations();
      this.resetFormat();
      this.inside.innerHTML = '';
      theme = this.options.theme;
      classes = this.el.className.split(' ');
      newClasses = [];
      for (_i = 0, _len = classes.length; _i < _len; _i++) {
        cls = classes[_i];
        if (!cls.length) {
          continue;
        }
        if (match = /^odometer-theme-(.+)$/.exec(cls)) {
          theme = match[1];
          continue;
        }
        if (/^odometer(-|$)/.test(cls)) {
          continue;
        }
        newClasses.push(cls);
      }
      newClasses.push('odometer');
      if (!TRANSITION_SUPPORT) {
        newClasses.push('odometer-no-transitions');
      }
      if (theme) {
        newClasses.push("odometer-theme-" + theme);
      } else {
        newClasses.push("odometer-auto-theme");
      }
      this.el.className = newClasses.join(' ');
      this.ribbons = {};
      this.digits = [];
      wholePart = !this.format.precision;
      _ref = value.toFixed(this.format.precision).split('').reverse();
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        digit = _ref[_j];
        if (digit === '.') {
          wholePart = true;
        }
        this.addDigit(digit, wholePart);
      }
      return this.startWatchingMutations();
    };

    Odometer.prototype.update = function(newValue) {
      var diff,
        _this = this;
      newValue = this.cleanValue(newValue);
      if (!(diff = newValue - this.value)) {
        return;
      }
      removeClass(this.el, 'odometer-animating-up odometer-animating-down odometer-animating');
      if (diff > 0) {
        addClass(this.el, 'odometer-animating-up');
      } else {
        addClass(this.el, 'odometer-animating-down');
      }
      this.stopWatchingMutations();
      this.animate(newValue);
      this.startWatchingMutations();
      setTimeout(function() {
        _this.el.offsetHeight;
        return addClass(_this.el, 'odometer-animating');
      }, 0);
      return this.value = newValue;
    };

    Odometer.prototype.renderDigit = function() {
      return createFromHTML(DIGIT_HTML);
    };

    Odometer.prototype.insertDigit = function(digit, before) {
      if (before != null) {
        return this.inside.insertBefore(digit, before);
      } else if (!this.inside.children.length) {
        return this.inside.appendChild(digit);
      } else {
        return this.inside.insertBefore(digit, this.inside.children[0]);
      }
    };

    Odometer.prototype.addSpacer = function(chr, before, extraClasses) {
      var spacer;
      spacer = createFromHTML(FORMAT_MARK_HTML);
      spacer.innerHTML = chr;
      if (extraClasses) {
        addClass(spacer, extraClasses);
      }
      return this.insertDigit(spacer, before);
    };

    Odometer.prototype.addDigit = function(value, repeating) {
      var chr, digit, resetted, _ref;
      if (repeating == null) {
        repeating = true;
      }
      if (value === '-') {
        return this.addSpacer(value, null, 'odometer-negation-mark');
      }
      if (value === '.') {
        return this.addSpacer((_ref = this.format.radix) != null ? _ref : '.', null, 'odometer-radix-mark');
      }
      if (repeating) {
        resetted = false;
        while (true) {
          if (!this.format.repeating.length) {
            if (resetted) {
              throw new Error("Bad odometer format without digits");
            }
            this.resetFormat();
            resetted = true;
          }
          chr = this.format.repeating[this.format.repeating.length - 1];
          this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1);
          if (chr === 'd') {
            break;
          }
          this.addSpacer(chr);
        }
      }
      digit = this.renderDigit();
      digit.querySelector('.odometer-value').innerHTML = value;
      this.digits.push(digit);
      return this.insertDigit(digit);
    };

    Odometer.prototype.animate = function(newValue) {
      if (!TRANSITION_SUPPORT || this.options.animation === 'count') {
        return this.animateCount(newValue);
      } else {
        return this.animateSlide(newValue);
      }
    };

    Odometer.prototype.animateCount = function(newValue) {
      var cur, diff, last, start, tick,
        _this = this;
      if (!(diff = +newValue - this.value)) {
        return;
      }
      start = last = now();
      cur = this.value;
      return (tick = function() {
        var delta, dist, fraction;
        if ((now() - start) > _this.options.duration) {
          _this.value = newValue;
          _this.render();
          trigger(_this.el, 'odometerdone');
          return;
        }
        delta = now() - last;
        if (delta > COUNT_MS_PER_FRAME) {
          last = now();
          fraction = delta / _this.options.duration;
          dist = diff * fraction;
          cur += dist;
          _this.render(Math.round(cur));
        }
        if (requestAnimationFrame != null) {
          return requestAnimationFrame(tick);
        } else {
          return setTimeout(tick, COUNT_MS_PER_FRAME);
        }
      })();
    };

    Odometer.prototype.getDigitCount = function() {
      var i, max, value, values, _i, _len;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
        value = values[i];
        values[i] = Math.abs(value);
      }
      max = Math.max.apply(Math, values);
      return Math.ceil(Math.log(max + 1) / Math.log(10));
    };

    Odometer.prototype.getFractionalDigitCount = function() {
      var i, parser, parts, value, values, _i, _len;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      parser = /^\-?\d*\.(\d*?)$/;
      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
        value = values[i];
        values[i] = value.toFixed(this.format.precision);
        parts = parser.exec(values[i]);
        if (parts == null) {
          values[i] = 0;
        } else {
          values[i] = parts[1].length;
        }
      }
      return Math.max.apply(Math, values);
    };

    Odometer.prototype.resetDigits = function() {
      this.digits = [];
      this.ribbons = [];
      this.inside.innerHTML = '';
      return this.resetFormat();
    };

    Odometer.prototype.animateSlide = function(newValue) {
      var boosted, cur, diff, digitCount, digits, dist, end, fractionalCount, frame, frames, i, incr, j, mark, numEl, oldValue, start, _base, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _results;
      oldValue = this.value;
      fractionalCount = this.getFractionalDigitCount(oldValue, newValue);

      /*if (fractionalCount) {
        newValue = newValue * Math.pow(10, fractionalCount);
        oldValue = oldValue * Math.pow(10, fractionalCount);
      }
      if (!(diff = newValue - oldValue)) {
        return;
      }
      this.bindTransitionEnd();
      digitCount = this.getDigitCount(oldValue, newValue);
      digits = [];
      boosted = 0; */
	    // #hack
	    // number of digits of the integer part
	    fractionalCount = this.getFractionalDigitCount(oldValue, newValue);

	    var nv = (truncate(newValue) + "").length,
	        ov = (truncate(oldValue) + "").length,
	        intergerCount = Math.max(nv, ov);

	    if (fractionalCount) {
	        newValue = newValue * Math.pow(10, fractionalCount);
	        oldValue = oldValue * Math.pow(10, fractionalCount);
	    }

	    if (!(diff = newValue - oldValue)) {
	        return;
	    }

	    this.bindTransitionEnd();
	    digitCount = intergerCount + fractionalCount;  // now useless : this.getDigitCount(oldValue, newValue);
	    digits = [];
	    boosted = 0;
	    // #hack
      for (i = _i = 0; 0 <= digitCount ? _i < digitCount : _i > digitCount; i = 0 <= digitCount ? ++_i : --_i) {
        start = truncate(oldValue / Math.pow(10, digitCount - i - 1));
        end = truncate(newValue / Math.pow(10, digitCount - i - 1));
        dist = end - start;
        if (Math.abs(dist) > this.MAX_VALUES) {
          frames = [];
          incr = dist / (this.MAX_VALUES + this.MAX_VALUES * boosted * DIGIT_SPEEDBOOST);
          cur = start;
          while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
            frames.push(Math.round(cur));
            cur += incr;
          }
          if (frames[frames.length - 1] !== end) {
            frames.push(end);
          }
          boosted++;
        } else {
          frames = (function() {
            _results = [];
            for (var _j = start; start <= end ? _j <= end : _j >= end; start <= end ? _j++ : _j--){ _results.push(_j); }
            return _results;
          }).apply(this);
        }
        for (i = _k = 0, _len = frames.length; _k < _len; i = ++_k) {
          frame = frames[i];
          frames[i] = Math.abs(frame % 10);
        }
        digits.push(frames);
      }
      this.resetDigits();
      _ref = digits.reverse();
      for (i = _l = 0, _len1 = _ref.length; _l < _len1; i = ++_l) {
        frames = _ref[i];
        if (!this.digits[i]) {
          this.addDigit(' ', i >= fractionalCount);
        }
        if ((_base = this.ribbons)[i] == null) {
          _base[i] = this.digits[i].querySelector('.odometer-ribbon-inner');
        }
        this.ribbons[i].innerHTML = '';
        if (diff < 0) {
          frames = frames.reverse();
        }
        for (j = _m = 0, _len2 = frames.length; _m < _len2; j = ++_m) {
          frame = frames[j];
          numEl = document.createElement('div');
          numEl.className = 'odometer-value';
          numEl.innerHTML = frame;
          this.ribbons[i].appendChild(numEl);
          if (j === frames.length - 1) {
            addClass(numEl, 'odometer-last-value');
          }
          if (j === 0) {
            addClass(numEl, 'odometer-first-value');
          }
        }
      }
      if (start < 0) {
        this.addDigit('-');
      }
      mark = this.inside.querySelector('.odometer-radix-mark');
      if (mark != null) {
        mark.parent.removeChild(mark);
      }
      if (fractionalCount) {
        return this.addSpacer(this.format.radix, this.digits[fractionalCount - 1], 'odometer-radix-mark');
      }
    };

    return Odometer;

  })();

  Odometer.options = (_ref = window.odometerOptions) != null ? _ref : {};

  setTimeout(function() {
    var k, v, _base, _ref1, _results;
    if (window.odometerOptions) {
      _ref1 = window.odometerOptions;
      _results = [];
      for (k in _ref1) {
        v = _ref1[k];
        _results.push((_base = Odometer.options)[k] != null ? (_base = Odometer.options)[k] : _base[k] = v);
      }
      return _results;
    }
  }, 0);

  Odometer.init = function() {
    var el, elements, _i, _len, _ref1, _results;
    if (document.querySelectorAll == null) {
      return;
    }
    elements = document.querySelectorAll(Odometer.options.selector || '.odometer');
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      el = elements[_i];
      _results.push(el.odometer = new Odometer({
        el: el,
        value: (_ref1 = el.innerText) != null ? _ref1 : el.textContent
      }));
    }
    return _results;
  };

  if ((((_ref1 = document.documentElement) != null ? _ref1.doScroll : void 0) != null) && (document.createEventObject != null)) {
    _old = document.onreadystatechange;
    document.onreadystatechange = function() {
      if (document.readyState === 'complete' && Odometer.options.auto !== false) {
        Odometer.init();
      }
      return _old != null ? _old.apply(this, arguments) : void 0;
    };
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (Odometer.options.auto !== false) {
        return Odometer.init();
      }
    }, false);
  }

  window.Odometer = Odometer;

}).call(this);

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
   },
   qcode:function(qcode) {
      return new Promise(async function(resolve,rejext) {
        $.getJSON("https://api.corrently.io/core/qcode?qcode="+qcode,function(data) {
          if(typeof data.account != "undefined") {
              window.localStorage.setItem("ce_qcode",qcode);
              window.localStorage.setItem("ce_account",data.account);
              resolve(data.account);
          } else {
          reject("");
          }
        })
      });
   },
   metaPersist:function(obj,cb) {
     obj+="&UTM_SOURCE="+window.location.hostname + window.location.pathname;
     if(typeof $.getUrlVar != "undefined") {
       if(typeof $.getUrlVar("UTM_CONTENT") != "undefined") {
         window.localStorage.setItem("UTM_CONTENT",$.getUrlVar("UTM_CONTENT"));
         obj+="&UTM_CONTENT="+$.getUrlVar("UTM_CONTENT");
       }
       if(typeof $.getUrlVar("UTM_MEDIUM") != "undefined") {
         window.localStorage.setItem("UTM_MEDIUM",$.getUrlVar("UTM_MEDIUM"));
         obj+="&UTM_MEDIUM="+$.getUrlVar("UTM_MEDIUM");
       }
     }
     if( window.localStorage.getItem("UTM_CONTENT") != null) {
        obj+="&UTM_CONTENT="+ window.localStorage.getItem("UTM_CONTENT");
     }
     if( window.localStorage.getItem("UTM_MEDIUM") != null) {
        obj+="&UTM_MEDIUM="+ window.localStorage.getItem("UTM_MEDIUM");
     }
     $.post("https://api.corrently.io/core/meta",obj,cb);
   },
   doT:function () {
	var doT = {
		name: "doT",
		version: "1.1.1",
		templateSettings: {
			evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
			interpolate: /\{\{=([\s\S]+?)\}\}/g,
			encode:      /\{\{!([\s\S]+?)\}\}/g,
			use:         /\{\{#([\s\S]+?)\}\}/g,
			useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
			define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
			defineParams:/^\s*([\w$]+):([\s\S]+)/,
			conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
			iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			varname:	"it",
			strip:		true,
			append:		true,
			selfcontained: false,
			doNotSkipEncoded: false
		},
		template: undefined, //fn, compile template
		compile:  undefined, //fn, for express
		log: true
	}, _globals;

	doT.encodeHTMLSource = function(doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	};

	_globals = (function(){ return this || (0,eval)("this"); }());

	/* istanbul ignore else */
	if (typeof module !== "undefined" && module.exports) {
		module.exports = doT;
	} else if (typeof define === "function" && define.amd) {
		define(function(){return doT;});
	} else {
		_globals.doT = doT;
	}

	var startend = {
		append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
		split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
	}, skip = /$^/;

	function resolveDefs(c, block, def) {
		return ((typeof block === "string") ? block : block.toString())
		.replace(c.define || skip, function(m, code, assign, value) {
			if (code.indexOf("def.") === 0) {
				code = code.substring(4);
			}
			if (!(code in def)) {
				if (assign === ":") {
					if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
						def[code] = {arg: param, text: v};
					});
					if (!(code in def)) def[code]= value;
				} else {
					new Function("def", "def['"+code+"']=" + value)(def);
				}
			}
			return "";
		})
		.replace(c.use || skip, function(m, code) {
			if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
				if (def[d] && def[d].arg && param) {
					var rw = (d+":"+param).replace(/'|\\/g, "_");
					def.__exp = def.__exp || {};
					def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
					return s + "def.__exp['"+rw+"']";
				}
			});
			var v = new Function("def", "return " + code)(def);
			return v ? resolveDefs(c, v, def) : v;
		});
	}

	function unescape(code) {
		return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
	}

	doT.template = function(tmpl, c, def) {
		c = c || doT.templateSettings;
		var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
			str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

		str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
					.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
			.replace(/'|\\/g, "\\$&")
			.replace(c.interpolate || skip, function(m, code) {
				return cse.start + unescape(code) + cse.end;
			})
			.replace(c.encode || skip, function(m, code) {
				needhtmlencode = true;
				return cse.startencode + unescape(code) + cse.end;
			})
			.replace(c.conditional || skip, function(m, elsecase, code) {
				return elsecase ?
					(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
					(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
			})
			.replace(c.iterate || skip, function(m, iterate, vname, iname) {
				if (!iterate) return "';} } out+='";
				sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
				return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
					+vname+"=arr"+sid+"["+indv+"+=1];out+='";
			})
			.replace(c.evaluate || skip, function(m, code) {
				return "';" + unescape(code) + "out+='";
			})
			+ "';return out;")
			.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
			.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
			//.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

		if (needhtmlencode) {
			if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
			str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
				+ doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
				+ str;
		}
		try {
			return new Function(c.varname, str);
		} catch (e) {
			/* istanbul ignore else */
			if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
			throw e;
		}
	};

	doT.compile = function(tmpl, def) {
		return doT.template(tmpl, null, def);
	};
  return doT;
}
});
$(document).ready(function() {
  if(typeof $.getUrlVar != "undefined") {
    if(typeof $.getUrlVar("a") != "undefined") {
      window.localStorage.setItem("ce_account",$.getUrlVar("a"));
    }
    if(typeof $.getUrlVar("qcode") != "undefined") {
      window.localStorage.setItem("ce_qcode",$.getUrlVar("qcode"));
    }
  }
  $('.printBtn').click(function() {
   window.print();
  })
});
/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 * v0.3.2
 *
 * Copyright (c) 2018 Ketan Mistry (https://iamketan.com.au)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {

    /*
    |--------------------------------------------------------------------------
    | Cookie Message
    |--------------------------------------------------------------------------
    |
    | Displays the cookie message on first visit or 30 days after their
    | last visit.
    |
    | @param event - 'reinit' to reopen the cookie message
    |
    */
    $.fn.ihavecookies = function(options, event) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            cookieTypes: [
                {
                    type: 'Seiten Einstellungen',
                    value: 'preferences',
                    description: 'Für die Personalisierung der Webseite notwendige Cookies.'
                },
                {
                    type: 'Analyse',
                    value: 'analytics',
                    description: 'Cookies zur Auswertung und Optimierung der Inhalte.'
                },
                {
                    type: 'Marketing',
                    value: 'marketing',
                    description: 'Social Media, Newsletter und Marketing Aktivitäten.'
                }
            ],
            title: 'Cookies & Datenschutz',
            message: 'Wenn Sie diese Website besuchen, verwendet die STROMDAO GmbH Cookies.',
            link: '/privacy-policy',
            delay: 2000,
            expires: 30,
            moreInfoLabel: 'Weitere Informationen',
            acceptBtnLabel: 'Cookies akzeptieren',
            advancedBtnLabel: 'Cookies anpassen',
            cookieTypesTitle: 'Cookies auswählen',
            fixedCookieTypeLabel:'Notwendige',
            fixedCookieTypeDesc: 'Für die Nutzung der Website essentielle Cookies.',
            onAccept: function(){},
            uncheckBoxes: false
        }, options);

        var myCookie = getCookie('cookieControl');
        var myCookiePrefs = getCookie('cookieControlPrefs');
        if (!myCookie || !myCookiePrefs || event == 'reinit') {
            // Remove all instances of the cookie message so it's not duplicated
            $('#gdpr-cookie-message').remove();

            // Set the 'necessary' cookie type checkbox which can not be unchecked
            var cookieTypes = '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' + settings.fixedCookieTypeDesc + '">' + settings.fixedCookieTypeLabel + '</label></li>';

            // Generate list of cookie type checkboxes
            preferences = JSON.parse(myCookiePrefs);
            $.each(settings.cookieTypes, function(index, field) {
                if (field.type !== '' && field.value !== '') {
                    var cookieTypeDescription = '';
                    if (field.description !== false) {
                        cookieTypeDescription = ' title="' + field.description + '"';
                    }
                    cookieTypes += '<li><input type="checkbox" id="gdpr-cookietype-' + field.value + '" name="gdpr[]" value="' + field.value + '" data-auto="on"> <label for="gdpr-cookietype-' + field.value + '"' + cookieTypeDescription + '>' + field.type + '</label></li>';
                }
            });

            // Display cookie message on page
            var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + settings.title + '</h4><p>' + settings.message + ' <a href="' + settings.link + '">' + settings.moreInfoLabel + '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + '</ul></div><p><button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button><button id="gdpr-cookie-advanced" type="button">' + settings.advancedBtnLabel + '</button></p></div>';
            setTimeout(function(){
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow', function(){
                    // If reinit'ing, open the advanced section of message
                    // and re-check all previously selected options.
                    if (event == 'reinit') {
                        $('#gdpr-cookie-advanced').trigger('click');
                        $.each(preferences, function(index, field) {
                            $('input#gdpr-cookietype-' + field).prop('checked', true);
                        });
                    }
                });
            }, settings.delay);

            // When accept button is clicked drop cookie
            $('body').on('click','#gdpr-cookie-accept', function(){
                // Set cookie
                dropCookie(true, settings.expires);

                // If 'data-auto' is set to ON, tick all checkboxes because
                // the user hasn't clicked the customise cookies button
                $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);

                // Save users cookie preferences (in a cookie!)
                var prefs = [];
                $.each($('input[name="gdpr[]"]').serializeArray(), function(i, field){
                    prefs.push(field.value);
                });
                setCookie('cookieControlPrefs', encodeURIComponent(JSON.stringify(prefs)), 365);

                // Run callback function
                settings.onAccept.call(this);
            });

            // Toggle advanced cookie options
            $('body').on('click', '#gdpr-cookie-advanced', function(){
                // Uncheck all checkboxes except for the disabled 'necessary'
                // one and set 'data-auto' to OFF for all. The user can now
                // select the cookies they want to accept.
                $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);
                $('#gdpr-cookie-types').slideDown('fast', function(){
                    $('#gdpr-cookie-advanced').prop('disabled', true);
                });
            });

        } else {
            var cookieVal = true;
            if (myCookie == 'false') {
                cookieVal = false;
            }
            dropCookie(cookieVal, settings.expires);
        }

        // Uncheck any checkboxes on page load
        if (settings.uncheckBoxes === true) {
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }

    };

    // Method to get cookie value
    $.fn.ihavecookies.cookie = function() {
        var preferences = getCookie('cookieControlPrefs');
        return JSON.parse(preferences);
    };

    // Method to check if user cookie preference exists
    $.fn.ihavecookies.preference = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if (control === false) {
            return false;
        }
        if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Drop Cookie
    |--------------------------------------------------------------------------
    |
    | Function to drop the cookie with a boolean value of true.
    |
    */
    var dropCookie = function(value, expiryDays) {
        setCookie('cookieControl', value, expiryDays);
        $('#gdpr-cookie-message').fadeOut('fast', function() {
            $(this).remove();
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Set Cookie
    |--------------------------------------------------------------------------
    |
    | Sets cookie with 'name' and value of 'value' for 'expiry_days'.
    |
    */
    var setCookie = function(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        return getCookie(name);
    };

    /*
    |--------------------------------------------------------------------------
    | Get Cookie
    |--------------------------------------------------------------------------
    |
    | Gets cookie called 'name'.
    |
    */
    var getCookie = function(name) {
        var cookie_name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookie_name) === 0) {
                return c.substring(cookie_name.length, c.length);
            }
        }
        return false;
    };

}(jQuery));

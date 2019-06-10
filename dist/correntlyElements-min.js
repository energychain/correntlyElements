!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,a){return void 0===a&&(a="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(a),a}:t(jQuery)}(function(t){"use strict";function e(e){var a=e.data;e.isDefaultPrevented()||(e.preventDefault(),t(e.target).closest("form").ajaxSubmit(a))}function a(e){var a=e.target,r=t(a);if(!r.is("[type=submit],[type=image]")){var n=r.closest("[type=submit]");if(0===n.length)return;a=n[0]}var s=a.form;if(s.clk=a,"image"===a.type)if(void 0!==e.offsetX)s.clk_x=e.offsetX,s.clk_y=e.offsetY;else if("function"==typeof t.fn.offset){var i=r.offset();s.clk_x=e.pageX-i.left,s.clk_y=e.pageY-i.top}else s.clk_x=e.pageX-a.offsetLeft,s.clk_y=e.pageY-a.offsetTop;setTimeout(function(){s.clk=s.clk_x=s.clk_y=null},100)}function r(){if(t.fn.ajaxSubmit.debug){var e="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e)}}var n=/\r?\n/g,s={};s.fileapi=void 0!==t('<input type="file">').get(0).files,s.formdata=void 0!==window.FormData;var i=!!t.fn.prop;t.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var t=this.prop.apply(this,arguments);return t&&t.jquery||"string"==typeof t?t:this.attr.apply(this,arguments)},t.fn.ajaxSubmit=function(e,a,n,l){function o(a){function n(t){var e=null;try{t.contentWindow&&(e=t.contentWindow.document)}catch(t){r("cannot get iframe.contentWindow document: "+t)}if(e)return e;try{e=t.contentDocument?t.contentDocument:t.document}catch(a){r("cannot get iframe.contentDocument: "+a),e=t.document}return e}function s(){var e=h.attr2("target"),a=h.attr2("action"),s=h.attr("enctype")||h.attr("encoding")||"multipart/form-data";k.setAttribute("target",f),c&&!/post/i.test(c)||k.setAttribute("method","POST"),a!==u.url&&k.setAttribute("action",u.url),u.skipEncodingOverride||c&&!/post/i.test(c)||h.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),u.timeout&&(w=setTimeout(function(){S=!0,l(j)},u.timeout));var i=[];try{if(u.extraData)for(var o in u.extraData)u.extraData.hasOwnProperty(o)&&(t.isPlainObject(u.extraData[o])&&u.extraData[o].hasOwnProperty("name")&&u.extraData[o].hasOwnProperty("value")?i.push(t('<input type="hidden" name="'+u.extraData[o].name+'">',F).val(u.extraData[o].value).appendTo(k)[0]):i.push(t('<input type="hidden" name="'+o+'">',F).val(u.extraData[o]).appendTo(k)[0]));u.iframeTarget||m.appendTo(T),b.attachEvent?b.attachEvent("onload",l):b.addEventListener("load",l,!1),setTimeout(function t(){try{var e=n(b).readyState;r("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){r("Server abort: ",e," (",e.name,")"),l(E),w&&clearTimeout(w),w=void 0}},15);try{k.submit()}catch(t){document.createElement("form").submit.apply(k)}}finally{k.setAttribute("action",a),k.setAttribute("enctype",s),e?k.setAttribute("target",e):h.removeAttr("target"),t(i).remove()}}function l(e){if(!y.aborted&&!z){if((_=n(b))||(r("cannot access response document"),e=E),e===j&&y)return y.abort("timeout"),void D.reject(y,"timeout");if(e===E&&y)return y.abort("server abort"),void D.reject(y,"error","server abort");if(_&&_.location.href!==u.iframeSrc||S){b.detachEvent?b.detachEvent("onload",l):b.removeEventListener("load",l,!1);var a,s="success";try{if(S)throw"timeout";var i="xml"===u.dataType||_.XMLDocument||t.isXMLDoc(_);if(r("isXml="+i),!i&&window.opera&&(null===_.body||!_.body.innerHTML)&&--R)return r("requeing onLoad callback, DOM not available"),void setTimeout(l,250);var o=_.body?_.body:_.documentElement;y.responseText=o?o.innerHTML:null,y.responseXML=_.XMLDocument?_.XMLDocument:_,i&&(u.dataType="xml"),y.getResponseHeader=function(t){return{"content-type":u.dataType}[t.toLowerCase()]},o&&(y.status=Number(o.getAttribute("status"))||y.status,y.statusText=o.getAttribute("statusText")||y.statusText);var c=(u.dataType||"").toLowerCase(),d=/(json|script|text)/.test(c);if(d||u.textarea){var h=_.getElementsByTagName("textarea")[0];if(h)y.responseText=h.value,y.status=Number(h.getAttribute("status"))||y.status,y.statusText=h.getAttribute("statusText")||y.statusText;else if(d){var f=_.getElementsByTagName("pre")[0],g=_.getElementsByTagName("body")[0];f?y.responseText=f.textContent?f.textContent:f.innerText:g&&(y.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!y.responseXML&&y.responseText&&(y.responseXML=L(y.responseText));try{O=N(y,c,u)}catch(t){s="parsererror",y.error=a=t||s}}catch(t){r("error caught: ",t),s="error",y.error=a=t||s}y.aborted&&(r("upload aborted"),s=null),y.status&&(s=y.status>=200&&y.status<300||304===y.status?"success":"error"),"success"===s?(u.success&&u.success.call(u.context,O,"success",y),D.resolve(y.responseText,"success",y),p&&t.event.trigger("ajaxSuccess",[y,u])):s&&(void 0===a&&(a=y.statusText),u.error&&u.error.call(u.context,y,s,a),D.reject(y,"error",a),p&&t.event.trigger("ajaxError",[y,u,a])),p&&t.event.trigger("ajaxComplete",[y,u]),p&&!--t.active&&t.event.trigger("ajaxStop"),u.complete&&u.complete.call(u.context,y,s),z=!0,u.timeout&&clearTimeout(w),setTimeout(function(){u.iframeTarget?m.attr("src",u.iframeSrc):m.remove(),y.responseXML=null},100)}}}var o,d,u,p,f,m,b,y,v,x,S,w,k=h[0],D=t.Deferred();if(D.abort=function(t){y.abort(t)},a)for(d=0;d<g.length;d++)o=t(g[d]),i?o.prop("disabled",!1):o.removeAttr("disabled");(u=t.extend(!0,{},t.ajaxSettings,e)).context=u.context||u,f="jqFormIO"+(new Date).getTime();var F=k.ownerDocument,T=h.closest("body");if(u.iframeTarget?(x=(m=t(u.iframeTarget,F)).attr2("name"))?f=x:m.attr2("name",f):(m=t('<iframe name="'+f+'" src="'+u.iframeSrc+'" />',F)).css({position:"absolute",top:"-1000px",left:"-1000px"}),b=m[0],y={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var a="timeout"===e?"timeout":"aborted";r("aborting upload... "+a),this.aborted=1;try{b.contentWindow.document.execCommand&&b.contentWindow.document.execCommand("Stop")}catch(t){}m.attr("src",u.iframeSrc),y.error=a,u.error&&u.error.call(u.context,y,a,e),p&&t.event.trigger("ajaxError",[y,u,a]),u.complete&&u.complete.call(u.context,y,a)}},(p=u.global)&&0==t.active++&&t.event.trigger("ajaxStart"),p&&t.event.trigger("ajaxSend",[y,u]),u.beforeSend&&!1===u.beforeSend.call(u.context,y,u))return u.global&&t.active--,D.reject(),D;if(y.aborted)return D.reject(),D;(v=k.clk)&&(x=v.name)&&!v.disabled&&(u.extraData=u.extraData||{},u.extraData[x]=v.value,"image"===v.type&&(u.extraData[x+".x"]=k.clk_x,u.extraData[x+".y"]=k.clk_y));var j=1,E=2,C=t("meta[name=csrf-token]").attr("content"),A=t("meta[name=csrf-param]").attr("content");A&&C&&(u.extraData=u.extraData||{},u.extraData[A]=C),u.forceSync?s():setTimeout(s,10);var O,_,z,R=50,L=t.parseXML||function(t,e){return window.ActiveXObject?((e=new ActiveXObject("Microsoft.XMLDOM")).async="false",e.loadXML(t)):e=(new DOMParser).parseFromString(t,"text/xml"),e&&e.documentElement&&"parsererror"!==e.documentElement.nodeName?e:null},M=t.parseJSON||function(t){return window.eval("("+t+")")},N=function(e,a,r){var n=e.getResponseHeader("content-type")||"",s=("xml"===a||!a)&&n.indexOf("xml")>=0,i=s?e.responseXML:e.responseText;return s&&"parsererror"===i.documentElement.nodeName&&t.error&&t.error("parsererror"),r&&r.dataFilter&&(i=r.dataFilter(i,a)),"string"==typeof i&&(("json"===a||!a)&&n.indexOf("json")>=0?i=M(i):("script"===a||!a)&&n.indexOf("javascript")>=0&&t.globalEval(i)),i};return D}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var c,d,u,h=this;"function"==typeof e?e={success:e}:"string"==typeof e||!1===e&&arguments.length>0?(e={url:e,data:a,dataType:n},"function"==typeof l&&(e.success=l)):void 0===e&&(e={}),c=e.method||e.type||this.attr2("method"),(u=(u="string"==typeof(d=e.url||this.attr2("action"))?t.trim(d):"")||window.location.href||"")&&(u=(u.match(/^([^#]+)/)||[])[1]),e=t.extend(!0,{url:u,success:t.ajaxSettings.success,type:c||t.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},e);var p={};if(this.trigger("form-pre-serialize",[this,e,p]),p.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(e.beforeSerialize&&!1===e.beforeSerialize(this,e))return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var f=e.traditional;void 0===f&&(f=t.ajaxSettings.traditional);var m,g=[],b=this.formToArray(e.semantic,g,e.filtering);if(e.data){var y=t.isFunction(e.data)?e.data(b):e.data;e.extraData=y,m=t.param(y,f)}if(e.beforeSubmit&&!1===e.beforeSubmit(b,this,e))return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[b,this,e,p]),p.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var v=t.param(b,f);m&&(v=v?v+"&"+m:m),"GET"===e.type.toUpperCase()?(e.url+=(e.url.indexOf("?")>=0?"&":"?")+v,e.data=null):e.data=v;var x=[];if(e.resetForm&&x.push(function(){h.resetForm()}),e.clearForm&&x.push(function(){h.clearForm(e.includeHidden)}),!e.dataType&&e.target){var S=e.success||function(){};x.push(function(a,r,n){var s=arguments,i=e.replaceTarget?"replaceWith":"html";t(e.target)[i](a).each(function(){S.apply(this,s)})})}else e.success&&(t.isArray(e.success)?t.merge(x,e.success):x.push(e.success));if(e.success=function(t,a,r){for(var n=e.context||this,s=0,i=x.length;s<i;s++)x[s].apply(n,[t,a,r||h,h])},e.error){var w=e.error;e.error=function(t,a,r){var n=e.context||this;w.apply(n,[t,a,r,h])}}if(e.complete){var k=e.complete;e.complete=function(t,a){var r=e.context||this;k.apply(r,[t,a,h])}}var D=t("input[type=file]:enabled",this).filter(function(){return""!==t(this).val()}).length>0,F="multipart/form-data",T=h.attr("enctype")===F||h.attr("encoding")===F,j=s.fileapi&&s.formdata;r("fileAPI :"+j);var E,C=(D||T)&&!j;!1!==e.iframe&&(e.iframe||C)?e.closeKeepAlive?t.get(e.closeKeepAlive,function(){E=o(b)}):E=o(b):E=(D||T)&&j?function(a){for(var r=new FormData,n=0;n<a.length;n++)r.append(a[n].name,a[n].value);if(e.extraData){var s=function(a){var r,n,s=t.param(a,e.traditional).split("&"),i=s.length,l=[];for(r=0;r<i;r++)s[r]=s[r].replace(/\+/g," "),n=s[r].split("="),l.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return l}(e.extraData);for(n=0;n<s.length;n++)s[n]&&r.append(s[n][0],s[n][1])}e.data=null;var i=t.extend(!0,{},t.ajaxSettings,e,{contentType:!1,processData:!1,cache:!1,type:c||"POST"});e.uploadProgress&&(i.xhr=function(){var a=t.ajaxSettings.xhr();return a.upload&&a.upload.addEventListener("progress",function(t){var a=0,r=t.loaded||t.position,n=t.total;t.lengthComputable&&(a=Math.ceil(r/n*100)),e.uploadProgress(t,r,n,a)},!1),a}),i.data=null;var l=i.beforeSend;return i.beforeSend=function(t,a){e.formData?a.data=e.formData:a.data=r,l&&l.call(this,t,a)},t.ajax(i)}(b):t.ajax(e),h.removeData("jqxhr").data("jqxhr",E);for(var A=0;A<g.length;A++)g[A]=null;return this.trigger("form-submit-notify",[this,e]),this},t.fn.ajaxForm=function(n,s,i,l){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:s,dataType:i},"function"==typeof l&&(n.success=l)),(n=n||{}).delegation=n.delegation&&t.isFunction(t.fn.on),!n.delegation&&0===this.length){var o={s:this.selector,c:this.context};return!t.isReady&&o.s?(r("DOM not ready, queuing ajaxForm"),t(function(){t(o.s,o.c).ajaxForm(n)}),this):(r("terminating; zero elements found by selector"+(t.isReady?"":" (DOM not ready)")),this)}return n.delegation?(t(document).off("submit.form-plugin",this.selector,e).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,n,e).on("click.form-plugin",this.selector,n,a),this):this.ajaxFormUnbind().on("submit.form-plugin",n,e).on("click.form-plugin",n,a)},t.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},t.fn.formToArray=function(e,a,r){var n=[];if(0===this.length)return n;var i,l,o,c,d,u,h,p,f=this[0],m=this.attr("id"),g=e||void 0===f.elements?f.getElementsByTagName("*"):f.elements;if(g&&(g=t.makeArray(g)),m&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(i=t(':input[form="'+m+'"]').get()).length&&(g=(g||[]).concat(i)),!g||!g.length)return n;for(t.isFunction(r)&&(g=t.map(g,r)),l=0,h=g.length;l<h;l++)if((c=(u=g[l]).name)&&!u.disabled)if(e&&f.clk&&"image"===u.type)f.clk===u&&(n.push({name:c,value:t(u).val(),type:u.type}),n.push({name:c+".x",value:f.clk_x},{name:c+".y",value:f.clk_y}));else if((d=t.fieldValue(u,!0))&&d.constructor===Array)for(a&&a.push(u),o=0,p=d.length;o<p;o++)n.push({name:c,value:d[o]});else if(s.fileapi&&"file"===u.type){a&&a.push(u);var b=u.files;if(b.length)for(o=0;o<b.length;o++)n.push({name:c,value:b[o],type:u.type});else n.push({name:c,value:"",type:u.type})}else null!=d&&(a&&a.push(u),n.push({name:c,value:d,type:u.type,required:u.required}));if(!e&&f.clk){var y=t(f.clk),v=y[0];(c=v.name)&&!v.disabled&&"image"===v.type&&(n.push({name:c,value:y.val()}),n.push({name:c+".x",value:f.clk_x},{name:c+".y",value:f.clk_y}))}return n},t.fn.formSerialize=function(e){return t.param(this.formToArray(e))},t.fn.fieldSerialize=function(e){var a=[];return this.each(function(){var r=this.name;if(r){var n=t.fieldValue(this,e);if(n&&n.constructor===Array)for(var s=0,i=n.length;s<i;s++)a.push({name:r,value:n[s]});else null!=n&&a.push({name:this.name,value:n})}}),t.param(a)},t.fn.fieldValue=function(e){for(var a=[],r=0,n=this.length;r<n;r++){var s=this[r],i=t.fieldValue(s,e);null==i||i.constructor===Array&&!i.length||(i.constructor===Array?t.merge(a,i):a.push(i))}return a},t.fieldValue=function(e,a){var r=e.name,s=e.type,i=e.tagName.toLowerCase();if(void 0===a&&(a=!0),a&&(!r||e.disabled||"reset"===s||"button"===s||("checkbox"===s||"radio"===s)&&!e.checked||("submit"===s||"image"===s)&&e.form&&e.form.clk!==e||"select"===i&&-1===e.selectedIndex))return null;if("select"===i){var l=e.selectedIndex;if(l<0)return null;for(var o=[],c=e.options,d="select-one"===s,u=d?l+1:c.length,h=d?l:0;h<u;h++){var p=c[h];if(p.selected&&!p.disabled){var f=p.value;if(f||(f=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),d)return f;o.push(f)}}return o}return t(e).val().replace(n,"\r\n")},t.fn.clearForm=function(e){return this.each(function(){t("input,select,textarea",this).clearFields(e)})},t.fn.clearFields=t.fn.clearInputs=function(e){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,n=this.tagName.toLowerCase();a.test(r)||"textarea"===n?this.value="":"checkbox"===r||"radio"===r?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===r?/MSIE/.test(navigator.userAgent)?t(this).replaceWith(t(this).clone(!0)):t(this).val(""):e&&(!0===e&&/hidden/.test(r)||"string"==typeof e&&t(this).is(e))&&(this.value="")})},t.fn.resetForm=function(){return this.each(function(){var e=t(this),a=this.tagName.toLowerCase();switch(a){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=e.parents("select");return r.length&&r[0].multiple?"option"===a?this.selected=this.defaultSelected:e.find("option").resetForm():r.resetForm(),!0;case"select":return e.find("option").each(function(t){if(this.selected=this.defaultSelected,this.defaultSelected&&!e[0].multiple)return e[0].selectedIndex=t,!1}),!0;case"label":var n=t(e.attr("for")),s=e.find("input,select,textarea");return n[0]&&s.unshift(n[0]),s.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return e.find("form,input,label,select,textarea").resetForm(),!0}})},t.fn.enable=function(t){return void 0===t&&(t=!0),this.each(function(){this.disabled=!t})},t.fn.selected=function(e){return void 0===e&&(e=!0),this.each(function(){var a=this.type;if("checkbox"===a||"radio"===a)this.checked=e;else if("option"===this.tagName.toLowerCase()){var r=t(this).parent("select");e&&r[0]&&"select-one"===r[0].type&&r.find("option").selected(!1),this.selected=e}})},t.fn.ajaxSubmit.debug=!1}),function(t){t.fn.correntlyReadingChart=function(e,a){let r=e;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account")),null==r&&(r=t.getUrlVar("a")),null==r&&(r="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");let n=this;null==n.attr("data-resolution")&&n.attr("data-resolution","3600000"),null==n.attr("data-from")&&n.attr("data-from","-86400000"),null==n.attr("data-chart")&&n.attr("data-chart","line");let s="";null!=n.attr("data-from")&&(1*n.attr("data-from")>(new Date).getTime()&&n.attr("data-from","-86400000"),1*n.attr("data-from")<0?s+="&from="+((new Date).getTime()+(1*n.attr("data-from")-1*n.attr("data-resolution"))):s+="&from="+n.attr("data-from")),null!=n.attr("data-to")&&(s+="&to="+n.attr("data-to"));const i=function(){t.getJSON("https://api.corrently.io/core/reading?account="+r+"&history="+n.attr("data-resolution")+s,function(e){let r=[],s=[],i=0;void 0!==e.history&&null!=e.history&&0!=e.history.length||(console.log("No Reading"),null!=a&&a());for(var l=1;l<e.history.length;l++)i<e.history[l].timeStamp?(null!=e.history[l]["1.8.0"]&&e.history[l]["1.8.0"]-e.history[l-1]["1.8.0"]>0&&r.push({y:Math.round((e.history[l]["1.8.0"]-e.history[l-1]["1.8.0"])/((e.history[l].timeStamp-e.history[l-1].timeStamp)/36e5)),x:1*e.history[l].timeStamp}),null!=e.history[l]["9.99.0"]&&s.push({y:1*e.history[l]["9.99.0"],x:1*e.history[l].timeStamp})):console.log("Timesort error"),i=e.history[l].timeStamp;if(void 0===r[r.length-1])return;n.attr("data-to",r[r.length-1].x),n.attr("data-from",r[0].x);let o=new Date(1*n.attr("data-to")),c="bis "+o.getDate()+"."+(o.getMonth()+1)+"."+(o.getYear()+1900),d="von "+(o=new Date(1*n.attr("data-from"))).getDate()+"."+(o.getMonth()+1)+"."+(o.getYear()+1900)+" "+c,u=n.attr("data-chart"),h=Math.round(Math.abs(e.history[e.history.length-1]["1.8.1"]-e.history[0]["1.8.1"])/1),p=Math.round(Math.abs(e.history[e.history.length-1]["1.8.0"]-e.history[0]["1.8.0"])/1),f=Math.round(Math.abs(e.history[e.history.length-1]["1.8.2"]-e.history[0]["1.8.2"])/1),m=Math.round(h/(h+f)*100),g=[m,100-m];if(t(".usageKwh").html((p/1e3).toFixed(3).replace(".",",")),t(".greenKwh").html((h/1e3).toFixed(3).replace(".",",")),t(".greyKwh").html((f/1e3).toFixed(3).replace(".",",")),t(".totalReading").html((e["1.8.0"]/1e3).toFixed(3).replace(".",",")),t(".greenReading").html((e["1.8.1"]/1e3).toFixed(3).replace(".",",")),t(".greyReading").html((e["1.8.2"]/1e3).toFixed(3).replace(".",",")),t(".timeReading").html(new Date(e.timeStamp).toLocaleString()),"line"==u||"bar"==u){new Chart(n,{type:u,data:{datasets:[{type:u,label:"Verbrauch",data:r,borderColor:"#ff0000",backgroundColor:"#ff0000",fill:!1,yAxisID:"y-axis-1"},{type:u,label:"GrünstromIndex",data:s,borderColor:"#5cb85c",backgroundColor:"#5cb85c",fill:!1,yAxisID:"y-axis-2"}]},options:{title:{display:!0,text:c},tooltips:{callbacks:{label:function(t,e){return 0===t.datasetIndex?t.yLabel+" W":1===t.datasetIndex?t.yLabel+" Punkte":void 0}}},legend:{position:"bottom"},scales:{xAxes:[{type:"time",distribution:"linear"}],yAxes:[{ticks:{beginAtZero:!1},display:!0,position:"left",id:"y-axis-1",scaleLabel:{display:!0,labelString:"Wh"}},{ticks:{beginAtZero:!1},display:!0,position:"right",id:"y-axis-2",scaleLabel:{display:!0,labelString:"Punkte"}}]}}})}if("donut"==u){new Chart(n,{type:"doughnut",data:{datasets:[{label:"Verbrauch",data:g,backgroundColor:["#5cb85c","#a0a0a0"]}],labels:["Grünstrom","Graustrom"]},options:{responsive:!0,legend:{position:"bottom"},title:{display:!0,text:d},animation:{animateScale:!0,animateRotate:!0}}})}})};i(),setInterval(i,6e4)}}(jQuery),function(t){t.fn.correntlyGSIDispatch=function(e){let a="https://api.corrently.io/core/srcgraph";null!=e?a+="?zip="+e:null!=this.attr("data-plz")?this.attr("data-plz"):null!=this.attr("data-zip")&&this.attr("data-zip");const r=this;r.html("<span class='text-muted'>wird geladen...</span>"),t.getJSON(a,function(t){function e(t,e){return t.energy<e.energy?-1:t.energy>e.energy?1:0}t.sources.values=t.sources.values.sort(e).reverse(),t.targets.values=t.targets.values.sort(e).reverse();let a=0,n=0;for(let e=0;e<t.sources.values.length;e++)a+=t.sources.values[e].energy;for(let e=0;e<t.targets.values.length;e++)n+=t.targets.values[e].energy;let s="<table class='table table-striped'>";s+="<thead><tr><th colspan='2'>Grünstrom Import</th><th colspan='2'>Grünstrom Export</th></tr></thead><tbody>";for(let e=0;e<t.sources.values.length||e<t.targets.values.length;e++)s+="<tr>",s+="<td>",e<t.sources.values.length&&(s+=(t.sources.values[e].energy/a*100).toFixed(1).replace(".",",")+"%"),s+="</td>",s+="<td>",e<t.sources.values.length&&(s+="<a href='?q="+t.sources.values[e].zip+"'>"+t.sources.values[e].city+"</a>"),s+="</td>",s+="<td>",e<t.targets.values.length&&(s+=(t.targets.values[e].energy/n*100).toFixed(1).replace(".",",")+"%"),s+="</td>",s+="<td>",e<t.targets.values.length&&(s+="<a href='?q="+t.targets.values[e].zip+"'>"+t.targets.values[e].city+"</a>"),s+="</td>",s+="</tr>";s+="</tbody></table>",s+="<p class='text-muted' style='align:center'>",console.log(a,n),a>n?n+a>0&&(s+="Es wird "+(n/(a+n)*100).toFixed(1).replace(".",",")+"% mehr Strom aus anderen Orten bezogen, als in andere Orte geliefert."):n+a>0&&(s+="Es wird "+(a/(a+n)*100).toFixed(1).replace(".",",")+"% mehr Strom an anderen Orten geliefert, als aus anderen Orte bezogent."),s+="</p>",r.html(s)})},t.fn.correntlyGSI=function(e){let a="https://api.corrently.io/core/gsi";null!=e?a+="?plz="+e:null!=this.attr("data-plz")?this.attr("data-plz"):null!=this.attr("data-zip")&&this.attr("data-zip");const r=this;r.html("<span class='text-muted'>wird geladen...</span>");const n=function(){null!=r.attr("data-refresh")&&r.attr("data-refresh")>(new Date).getTime()||t.ajax({url:a,dataType:"json",timeout:29e3,error:function(t,e,a){setTimeout(function(){n()},500)},success:function(e){document.gsi_info=e,t("#fortext").html("für "+e.location.city);let a="<tr><td class='small'>Datum</td>",n="<tr><td class='small'>Zeit</td>",s="<tr><td class='small'>Regionaler Grünstrom</td>",i="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>Örtlicher&nbsp;Energiepreis</td>";for(var l=0;l<e.forecast.length;l++){let t=new Date(e.forecast[l].timeStamp);0==l||0==t.getHours()?a+="<td class='small'>"+t.getDate()+"."+(t.getMonth()+1)+"</td>":a+="<td>&nbsp;</td>";let r="bg-warning";e.forecast[l].gsi<48&&(r="bg-secondary"),e.forecast[l].gsi>52&&(r="bg-success"),n+="<td  class='"+r+" small' style='text-align:right'>"+t.getHours()+":00</td>",s+="<td style='vertical-align:bottom'><div class='"+r+"' title='Indexwert: "+e.forecast[l].gsi+" Punkte' style=';height:"+Math.round(2*e.forecast[l].gsi)+"px'></div></td>",i+="<td style='text-align:right' class='"+r+" small' >"+(5-e.forecast[l].gsi/100*2).toFixed(2).replace(".",",")+"</td>"}a+="</tr>",n+="</tr>",s+="</tr>",i+="</tr>",r.html("<table class='table table-sm table-responsive'>"+s+a+n+i+"</table>"),r.attr("data-refresh",e.forecast[0].timeStamp),"undefined"!=typeof cb_location&&cb_location(e.location)}})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlyMarket=function(){const e=this;t.getJSON("https://api.corrently.io/core/market",function(t){let a="<table class='table table-condensed'>";a+="<tr>",a+="<th>Bezeichnung</th>",a+="<th>Emitent</th>",a+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>",a+="<th colspan='2'>GrünstromBonus<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th><th>&nbsp;</th>",a+="</tr>";for(let e=0;e<t.results.length;e++)a+="<tr>",a+="<td>"+t.results[e].title+"</td>",a+="<td>"+t.results[e].emitent+"</td>",a+="<td>"+t.results[e].decom+"</td>",a+="<td>"+t.results[e].cori+" kWh</td>",a+="<td>"+(.02*t.results[e].cori).toFixed(2).replace(".",",")+" €</td>",a+="<td><a href='./board.html?asset="+t.results[e].asset+"&update=true' class='btn btn-sm btn-success'>Auswahl</a></td>",a+="</tr>";e.html(a)})},t.fn.correntlyBoard=function(e){const a=this;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account"));let r=null;null!=t.getUrlVar("c")&&(r=t.getUrlVar("c")),null!=t.getUrlVar("asset")&&(e=t.getUrlVar("asset")),null==r&&(null!=(r=window.localStorage.getItem("account"))?t.getJSON("https://api.corrently.io/core/commissioning?account="+r,function(t){for(let a=0;a<t.length;a++)"0x8dd8eddF4f8133f468867c551C17ad7324B411C6"==t[a].product&&(location.href="./board.html?c="+t[a].quitance+"&asset="+e)}):console.log("Q is null")),t.getJSON("https://api.corrently.io/core/depot?account="+r,function(n){let s=0,i=0;if(void 0!==n.assets)for(let t=0;t<n.assets.length;t++)n.assets[t].account==e&&(s=1*n.assets[t].shares,i=s);t.getJSON("https://api.corrently.io/core/stromkonto?account="+r,function(n){let l=n.result.balance_eur;t.getJSON("https://api.corrently.io/core/market",function(n){let o="",c=0;for(let a=0;a<n.results.length;a++)if(n.results[a].asset==e){t("#asset_title").html(n.results[a].title);n.results[a].totalSupply;o+="<div class='row'><div class='col-md-9'><div style='width:750px;float:none'>";for(let t=0;t<n.results[a].allocations.length;t++)"0x0000000000000000000000000000000000000000"==n.results[a].allocations[t]?o+="<div class='field' id='cell_"+t+"' title='Zelle "+t+"'></div>":n.results[a].allocations[t]==r?(o+="<div class='field' id='cell_"+t+"' title='Zelle "+t+"' selected='selected' style='background-color:black'></div>",c++):o+="<div class='field' id='cell_"+t+"' title='Zelle "+t+" von "+n.results[a].allocations[t]+"' owned='true' style='background-color:yellow'></div>";o+="</div>",o+="</div>",l>0&&(s+=Math.floor(l/(.02*n.results[a].cori)))}o+="<div class='col-md-3'>",o+="<div class='row'>",o+="<div class='field' style='background-color:black;width:20px;height:20px;'></div>&nbsp;Ausgewählt",o+="</div>",o+="<div class='row'>",o+="<div class='field' style='background-color:#c6c6c6;width:20px;height:20px;'></div>&nbsp;Verfügbar",o+="</div>",o+="<div class='row'>",o+="<div class='field' style='background-color:yellow;width:20px;height:20px;'></div>&nbsp;Vergeben",o+="</div>",o+="</div>",o+="</div>",o+="<button class='btn btn-success btn-lg' style='margin:5px;' id='applySelection'>übernehmen</button>",a.html(o),t("#applySelection").click(function(){t("#applySelection").attr("disabled","disabled"),t("#applySelection").removeClass("btn-success"),console.log("- preparing Transaction");let a=t('div[selected="selected"]'),n=[];for(let e=0;e<a.length;e++)n.push(t(a[e]).attr("id").substr(5));let s=c-i;s<0&&(s=0);let l="";l+="&account="+r,l+="&asset="+e,l+="&amount="+s,l+="&allocations="+n.join(","),t.getJSON("https://api.corrently.io/core/transaction?"+l,function(e){o="",o="<h3>Bitte Email Posteingang prüfen</h3>",t("#board_card").html(o)})});const d=function(){t("#selected_fields").html(c),t("#selectable_fields").html(s),t("#remain_fields").html(s-c)};t(".field").click(function(e){t(e.currentTarget).attr("owned")||(t(e.currentTarget).attr("selected")?(t(e.currentTarget).css("background-color","#c0c0c0"),t(e.currentTarget).removeAttr("selected"),c--):c<s&&(t(e.currentTarget).css("background-color","black"),t(e.currentTarget).attr("selected","selected"),c++)),d()}),d()})})})},t.fn.correntlyCommisioning=function(e){const a=this;let r=e;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account")),null==r&&(r=t.getUrlVar("a")),null==r&&(r="0x4D530cc530bCE8c84E2271528eA10D6480cbDACE"),t.getJSON("https://api.corrently.io/core/commissioning?account="+r,function(e){let r="<table class='table table-condensed'>";r+="<tr>",r+="<th>Produkt</th>",r+="<th>Backoffice Vertrag</th>",r+="<th>Eingang</th>",r+="<th>Lieferung</th>",r+="</tr>";for(let t=0;t<e.length;t++)r+="<tr>",r+="<td title='"+e[t].product+"'><a href='./contracts.html?a="+e[t].product+"' class='pLabel_"+e[t].product+"'>"+e[t].product+"</a></td>",r+="<td><a href='./contracts.html?a="+e[t].quitance+"'>"+e[t].quitance+"</a></td>",r+="<td>"+new Date(1*e[t].commissioning).toLocaleString()+"</td>",r+="<td title='"+e[t].delivery+"'>"+new Date(1*e[t].delivered).toLocaleString()+"</td>","0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22"==e[t].product?(window.ce_meter=e[t].quitance,r+="<td><a href='./reading.html?a="+e[t].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"):"0x8dd8eddF4f8133f468867c551C17ad7324B411C6"==e[t].product?(window.ce_sko=e[t].quitance,r+="<td><a href='./stromkonto.html?a="+e[t].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"):r+="<td></td>",r+="</tr>";a.html(r);for(let a=0;a<e.length;a++)t.getJSON("https://api.corrently.io/core/contract?account="+e[a].product,function(e){t(".pLabel_"+e.account).html(e.name)})})},t.fn.correntlyContract=function(e){const a=this;let r=e;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account")),null==r&&(r=t.getUrlVar("a")),null==r&&(r="0xcf74487007Ed9eD579b2eb5498cb719d46bb9Ab4"),t.getJSON("https://api.corrently.io/core/contract?account="+r,function(t){"dealitem"==t.type&&(t.type="Digitales Asset"),"product"==t.type&&(t.type="Produkt/Vertrag");let e="";e+="<h2>"+t.name+"</h2> <span class='text-muted'>("+t.type+")</span>",e+="<p>"+t.description+"</p>",a.html(e)})}}(jQuery),function(t){t.fn.correntlyReadingTable=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=function(t){return(t/1e3).toFixed(3).replace(".",",")},n=this;n.html("<span class='text-muted'>wird geladen...</span>");const s=function(){t.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+a,function(e){let s="<div class='table-responsive'><table class='table table-sm'>";s+="<tr><th>&nbsp;</th><th>Obis Code</th><th title='"+a+"'>Übernahme<br/>Zählerstand</th><th>Belieferung<br/>Zählerstand</th><th>Diffferenz</th><th>Letzte Ablesung</th></tr>",s+="<tr>",s+="<td colspan=3><span class='text-muted'>"+a+"</span></td>",void 0!==e.firstReading?s+="<td>"+new Date(e.firstReading.timeStamp).toLocaleString()+"</td>":s+="<td></td>",void 0!==e.firstReading?s+="<td>"+((e.timeStamp-e.firstReading.timeStamp)/864e5).toFixed(1).replace(".",",")+" Tage</td>":s+="<td></td>",s+="<td>"+new Date(e.timeStamp).toLocaleString()+"</td>",s+="</tr>",s+="<tr>",s+="<td>Gesamt</td>",s+="<td>1.8.0</td>",s+="<td>"+r(e["1.8.0"]-(e["1.8.1"]+e["1.8.2"]))+"</td>",void 0!==e.firstReading?(s+="<td>"+r(e.firstReading["1.8.0"])+"</td>",s+="<td>"+r(e["1.8.0"]-e.firstReading["1.8.0"])+"</td>"):(s+="<td></td>",s+="<td></td>"),s+="<td>"+r(e["1.8.0"])+"</td>",s+="</tr>",s+="<tr>",s+="<td>Grünstrom</td>",s+="<td>1.8.1</td>",s+="<td>&nbsp;</td>",void 0!==e.firstReading?(s+="<td>"+r(e.firstReading["1.8.1"])+"</td>",s+="<td>"+r(e["1.8.1"]-e.firstReading["1.8.1"])+"</td>"):(s+="<td></td>",s+="<td></td>"),s+="<td>"+r(e["1.8.1"])+"</td>",s+="</tr>",s+="<tr>",s+="<td>Graustrom</td>",s+="<td>1.8.2</td>",s+="<td>&nbsp;</td>",void 0!==e.firstReading?(s+="<td>"+r(e.firstReading["1.8.2"])+"</td>",s+="<td>"+r(e["1.8.2"]-e.firstReading["1.8.2"])+"</td>"):(s+="<td></td>",s+="<td></td>"),s+="<td>"+r(e["1.8.2"])+"</td>",s+="</tr>",s+="</table></div>",n.html(s),null==n&&t("#gsi_card").html(s)})};s(),setInterval(s,6e4)},t.fn.correntlyClearing=function(e){let a=e,r="10117",n=0;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null!=this.attr("data-zip")&&(r=this.attr("data-zip")),null!=this.attr("zip")&&(r=this.attr("zip")),null!=this.attr("data-plz")&&(r=this.attr("data-plz")),null!=this.attr("plz")&&(r=this.attr("plz")),null!=this.attr("data-idx")&&(n=this.attr("data-idx")),null!=this.attr("idx")&&(n=this.attr("idx")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const s=function(t){return(t/1e3).toFixed(3).replace(".",",")},i=this;i.html("<span class='text-muted'>wird geladen...</span>"),t.getJSON("https://api.corrently.io/core/tarif?&zip="+r,function(e){let r=e[1*n];const l=function(){t.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+a,function(e){let a="<div class='table-responsive'><table class='table table-sm'>";a+="<tr class='bg-dark text-light'><td colspan='4'><h4>Energie</h4></td></tr>",a+="<tr class='bg-secondary text-light'><th>Belieferungsbeginn</th><td style='text-align:right'>"+new Date(1*e.firstReading.timeStamp).toLocaleString()+"</td><td>("+((e.timeStamp-e.firstReading.timeStamp)/864e5).toFixed(1).replace(".",",")+" Tage)</td><td>&nbsp;</td></tr>",a+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+s(e.firstReading["1.8.0"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+s(e.firstReading["1.8.1"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+s(e.firstReading["1.8.2"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr class='bg-secondary text-light'><th>Aktuell</th><td style='text-align:right'>"+new Date(e.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>",a+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+s(e["1.8.0"])+"</td><td>("+s(e["1.8.0"]-e.firstReading["1.8.0"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+s(e["1.8.1"])+"</td><td>("+s(e["1.8.1"]-e.firstReading["1.8.1"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+s(e["1.8.2"])+"</td><td>("+s(e["1.8.2"]-e.firstReading["1.8.2"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td colspan='3'>&nbsp;</td></tr>",a+="<tr class='bg-dark text-light'><td colspan='4'><h4>Geld</h4></td></tr>",a+="<tr class='bg-secondary text-light'><th>Belieferung</th><td style='text-align:right'>"+new Date(e.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";let n=12*r.gp/365*((e.timeStamp-e.firstReading.timeStamp)/864e5),l=r.ap/1e5*(e["1.8.0"]-e.firstReading["1.8.0"]),o=2e-5*(e["1.8.1"]-e.firstReading["1.8.1"]);a+="<tr><td>&nbsp;+ Grundgebühr</td><td style='text-align:right'>"+n.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>&nbsp;+ Energiekosten</td><td style='text-align:right'>"+l.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>= Bezugskosten</td><td style='text-align:right'>"+(n+l).toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>&nbsp;- Corrently Grünstrom Bonus</td><td style='text-align:right'>"+o.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><th>Brutto Kosten</th><td style='text-align:right'>"+(n+l-o).toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="</table></div>",i.html(a),null==i&&t("#gsi_card").html(a)})};l(),setInterval(l,6e4)})},t.fn.correntlyMSCONS=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)},t.fn.correntlyUpdateReading=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlySKOBalance=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x9d28463d51aC40662865D2462e80825D4DBB41d5");const r=function(){t.getJSON("https://api.corrently.io/core/stromkonto?account="+a,function(a){t("#soll_eur").html(a.result.soll_eur.toFixed(2).replace(".",",")),t("#soll_eur").attr("title",a.result.soll_eur),t("#haben_eur").html(a.result.haben_eur.toFixed(2).replace(".",",")),t("#haben_eur").attr("title",a.result.haben_eur),t("#balance_eur").html(a.result.balance_eur.toFixed(2).replace(".",",")),t("#balance_eur").attr("title",a.result.balance_eur),void 0!==a.result.link&&t.getJSON("https://api.corrently.io/core/dispatcher?account="+a.result.link,function(t){}),t.getJSON("https://api.corrently.io/core/exd?account="+e,function(e){void 0!==e["2.8.0"]&&(console.log("2.8.0",e["2.8.0"]),t("#p_2_8_0").html((e["2.8.0"]/1e3).toFixed(3).replace(".",","))),console.log(e)})})};r(),setInterval(r,6e4)},t.fn.correntlySKODepot=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x504ec8497EBD02369550f6586EB32b26f088F25B");const r=this,n=function(){t.getJSON("https://api.corrently.io/core/depot?account="+a,function(t){let e="<table class='table'>";if(e+="<tr><th>Anlage</th><th>Anteile (kWh/Jahr)</th></tr>",void 0!==t.assets&&null!=t.assets)for(let a=0;a<t.assets.length;a++)e+="<tr>",e+="<td>"+t.assets[a].asset_title+"</td>",e+="<td>"+t.assets[a].shares+"</td>",e+="</tr>";e+="</table>",r.html(e)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlyTarif=function(e){let a=this,r=e;null==r&&(r=t.getUrlVar("p")),null!=this.attr("data-zip")&&(r=this.attr("data-zip")),null!=this.attr("zip")&&(r=this.attr("zip")),null!=this.attr("data-plz")&&(r=this.attr("data-plz")),null!=this.attr("plz")&&(r=this.attr("plz")),t.getJSON("https://api.corrently.io/core/tarif?&zip="+r,function(t){let e="<table class='table table-condensed'>";e+="<tr><th>Ortsteil</th><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";for(let a=0;a<t.length;a++)t[a].subcity.length>0?e+="<tr><td>"+t[a].subcity+"</td>":e+="<tr><td>"+r+"</td>",e+="<td>"+(t[a].ap/100).toFixed(4).replace(".",",")+"</td>",e+="<td>"+t[a].gp.replace(".",",")+"</td>",e+="<td><a href='https://corrently.energy/stromprodukte/"+r+"/' class='btn btn-sm btn-warning'>Details</td>",e+="</tr>";e+="</table>",a.html(e)})}}(jQuery),$.extend({getUrlVars:function(){for(var t,e=[],a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),r=0;r<a.length;r++)t=a[r].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(t){return $.getUrlVars()[t]}});
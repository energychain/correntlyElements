!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,a){return void 0===a&&(a="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(a),a}:t(jQuery)}(function(t){"use strict";function e(e){var a=e.data;e.isDefaultPrevented()||(e.preventDefault(),t(e.target).closest("form").ajaxSubmit(a))}function a(e){var a=e.target,r=t(a);if(!r.is("[type=submit],[type=image]")){var n=r.closest("[type=submit]");if(0===n.length)return;a=n[0]}var i=a.form;if(i.clk=a,"image"===a.type)if(void 0!==e.offsetX)i.clk_x=e.offsetX,i.clk_y=e.offsetY;else if("function"==typeof t.fn.offset){var s=r.offset();i.clk_x=e.pageX-s.left,i.clk_y=e.pageY-s.top}else i.clk_x=e.pageX-a.offsetLeft,i.clk_y=e.pageY-a.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function r(){if(t.fn.ajaxSubmit.debug){var e="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==t('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var s=!!t.fn.prop;t.fn.attr2=function(){if(!s)return this.attr.apply(this,arguments);var t=this.prop.apply(this,arguments);return t&&t.jquery||"string"==typeof t?t:this.attr.apply(this,arguments)},t.fn.ajaxSubmit=function(e,a,n,o){function l(a){function n(t){var e=null;try{t.contentWindow&&(e=t.contentWindow.document)}catch(t){r("cannot get iframe.contentWindow document: "+t)}if(e)return e;try{e=t.contentDocument?t.contentDocument:t.document}catch(a){r("cannot get iframe.contentDocument: "+a),e=t.document}return e}function i(){var e=h.attr2("target"),a=h.attr2("action"),i=h.attr("enctype")||h.attr("encoding")||"multipart/form-data";w.setAttribute("target",p),c&&!/post/i.test(c)||w.setAttribute("method","POST"),a!==u.url&&w.setAttribute("action",u.url),u.skipEncodingOverride||c&&!/post/i.test(c)||h.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),u.timeout&&(D=setTimeout(function(){S=!0,o(j)},u.timeout));var s=[];try{if(u.extraData)for(var l in u.extraData)u.extraData.hasOwnProperty(l)&&(t.isPlainObject(u.extraData[l])&&u.extraData[l].hasOwnProperty("name")&&u.extraData[l].hasOwnProperty("value")?s.push(t('<input type="hidden" name="'+u.extraData[l].name+'">',F).val(u.extraData[l].value).appendTo(w)[0]):s.push(t('<input type="hidden" name="'+l+'">',F).val(u.extraData[l]).appendTo(w)[0]));u.iframeTarget||m.appendTo(T),b.attachEvent?b.attachEvent("onload",o):b.addEventListener("load",o,!1),setTimeout(function t(){try{var e=n(b).readyState;r("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){r("Server abort: ",e," (",e.name,")"),o(E),D&&clearTimeout(D),D=void 0}},15);try{w.submit()}catch(t){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",a),w.setAttribute("enctype",i),e?w.setAttribute("target",e):h.removeAttr("target"),t(s).remove()}}function o(e){if(!y.aborted&&!O){if((L=n(b))||(r("cannot access response document"),e=E),e===j&&y)return y.abort("timeout"),void k.reject(y,"timeout");if(e===E&&y)return y.abort("server abort"),void k.reject(y,"error","server abort");if(L&&L.location.href!==u.iframeSrc||S){b.detachEvent?b.detachEvent("onload",o):b.removeEventListener("load",o,!1);var a,i="success";try{if(S)throw"timeout";var s="xml"===u.dataType||L.XMLDocument||t.isXMLDoc(L);if(r("isXml="+s),!s&&window.opera&&(null===L.body||!L.body.innerHTML)&&--z)return r("requeing onLoad callback, DOM not available"),void setTimeout(o,250);var l=L.body?L.body:L.documentElement;y.responseText=l?l.innerHTML:null,y.responseXML=L.XMLDocument?L.XMLDocument:L,s&&(u.dataType="xml"),y.getResponseHeader=function(t){return{"content-type":u.dataType}[t.toLowerCase()]},l&&(y.status=Number(l.getAttribute("status"))||y.status,y.statusText=l.getAttribute("statusText")||y.statusText);var c=(u.dataType||"").toLowerCase(),d=/(json|script|text)/.test(c);if(d||u.textarea){var h=L.getElementsByTagName("textarea")[0];if(h)y.responseText=h.value,y.status=Number(h.getAttribute("status"))||y.status,y.statusText=h.getAttribute("statusText")||y.statusText;else if(d){var p=L.getElementsByTagName("pre")[0],g=L.getElementsByTagName("body")[0];p?y.responseText=p.textContent?p.textContent:p.innerText:g&&(y.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!y.responseXML&&y.responseText&&(y.responseXML=M(y.responseText));try{R=_(y,c,u)}catch(t){i="parsererror",y.error=a=t||i}}catch(t){r("error caught: ",t),i="error",y.error=a=t||i}y.aborted&&(r("upload aborted"),i=null),y.status&&(i=y.status>=200&&y.status<300||304===y.status?"success":"error"),"success"===i?(u.success&&u.success.call(u.context,R,"success",y),k.resolve(y.responseText,"success",y),f&&t.event.trigger("ajaxSuccess",[y,u])):i&&(void 0===a&&(a=y.statusText),u.error&&u.error.call(u.context,y,i,a),k.reject(y,"error",a),f&&t.event.trigger("ajaxError",[y,u,a])),f&&t.event.trigger("ajaxComplete",[y,u]),f&&!--t.active&&t.event.trigger("ajaxStop"),u.complete&&u.complete.call(u.context,y,i),O=!0,u.timeout&&clearTimeout(D),setTimeout(function(){u.iframeTarget?m.attr("src",u.iframeSrc):m.remove(),y.responseXML=null},100)}}}var l,d,u,f,p,m,b,y,x,v,S,D,w=h[0],k=t.Deferred();if(k.abort=function(t){y.abort(t)},a)for(d=0;d<g.length;d++)l=t(g[d]),s?l.prop("disabled",!1):l.removeAttr("disabled");(u=t.extend(!0,{},t.ajaxSettings,e)).context=u.context||u,p="jqFormIO"+(new Date).getTime();var F=w.ownerDocument,T=h.closest("body");if(u.iframeTarget?(v=(m=t(u.iframeTarget,F)).attr2("name"))?p=v:m.attr2("name",p):(m=t('<iframe name="'+p+'" src="'+u.iframeSrc+'" />',F)).css({position:"absolute",top:"-1000px",left:"-1000px"}),b=m[0],y={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var a="timeout"===e?"timeout":"aborted";r("aborting upload... "+a),this.aborted=1;try{b.contentWindow.document.execCommand&&b.contentWindow.document.execCommand("Stop")}catch(t){}m.attr("src",u.iframeSrc),y.error=a,u.error&&u.error.call(u.context,y,a,e),f&&t.event.trigger("ajaxError",[y,u,a]),u.complete&&u.complete.call(u.context,y,a)}},(f=u.global)&&0==t.active++&&t.event.trigger("ajaxStart"),f&&t.event.trigger("ajaxSend",[y,u]),u.beforeSend&&!1===u.beforeSend.call(u.context,y,u))return u.global&&t.active--,k.reject(),k;if(y.aborted)return k.reject(),k;(x=w.clk)&&(v=x.name)&&!x.disabled&&(u.extraData=u.extraData||{},u.extraData[v]=x.value,"image"===x.type&&(u.extraData[v+".x"]=w.clk_x,u.extraData[v+".y"]=w.clk_y));var j=1,E=2,C=t("meta[name=csrf-token]").attr("content"),A=t("meta[name=csrf-param]").attr("content");A&&C&&(u.extraData=u.extraData||{},u.extraData[A]=C),u.forceSync?i():setTimeout(i,10);var R,L,O,z=50,M=t.parseXML||function(t,e){return window.ActiveXObject?((e=new ActiveXObject("Microsoft.XMLDOM")).async="false",e.loadXML(t)):e=(new DOMParser).parseFromString(t,"text/xml"),e&&e.documentElement&&"parsererror"!==e.documentElement.nodeName?e:null},N=t.parseJSON||function(t){return window.eval("("+t+")")},_=function(e,a,r){var n=e.getResponseHeader("content-type")||"",i=("xml"===a||!a)&&n.indexOf("xml")>=0,s=i?e.responseXML:e.responseText;return i&&"parsererror"===s.documentElement.nodeName&&t.error&&t.error("parsererror"),r&&r.dataFilter&&(s=r.dataFilter(s,a)),"string"==typeof s&&(("json"===a||!a)&&n.indexOf("json")>=0?s=N(s):("script"===a||!a)&&n.indexOf("javascript")>=0&&t.globalEval(s)),s};return k}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var c,d,u,h=this;"function"==typeof e?e={success:e}:"string"==typeof e||!1===e&&arguments.length>0?(e={url:e,data:a,dataType:n},"function"==typeof o&&(e.success=o)):void 0===e&&(e={}),c=e.method||e.type||this.attr2("method"),(u=(u="string"==typeof(d=e.url||this.attr2("action"))?t.trim(d):"")||window.location.href||"")&&(u=(u.match(/^([^#]+)/)||[])[1]),e=t.extend(!0,{url:u,success:t.ajaxSettings.success,type:c||t.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},e);var f={};if(this.trigger("form-pre-serialize",[this,e,f]),f.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(e.beforeSerialize&&!1===e.beforeSerialize(this,e))return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=e.traditional;void 0===p&&(p=t.ajaxSettings.traditional);var m,g=[],b=this.formToArray(e.semantic,g,e.filtering);if(e.data){var y=t.isFunction(e.data)?e.data(b):e.data;e.extraData=y,m=t.param(y,p)}if(e.beforeSubmit&&!1===e.beforeSubmit(b,this,e))return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[b,this,e,f]),f.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var x=t.param(b,p);m&&(x=x?x+"&"+m:m),"GET"===e.type.toUpperCase()?(e.url+=(e.url.indexOf("?")>=0?"&":"?")+x,e.data=null):e.data=x;var v=[];if(e.resetForm&&v.push(function(){h.resetForm()}),e.clearForm&&v.push(function(){h.clearForm(e.includeHidden)}),!e.dataType&&e.target){var S=e.success||function(){};v.push(function(a,r,n){var i=arguments,s=e.replaceTarget?"replaceWith":"html";t(e.target)[s](a).each(function(){S.apply(this,i)})})}else e.success&&(t.isArray(e.success)?t.merge(v,e.success):v.push(e.success));if(e.success=function(t,a,r){for(var n=e.context||this,i=0,s=v.length;i<s;i++)v[i].apply(n,[t,a,r||h,h])},e.error){var D=e.error;e.error=function(t,a,r){var n=e.context||this;D.apply(n,[t,a,r,h])}}if(e.complete){var w=e.complete;e.complete=function(t,a){var r=e.context||this;w.apply(r,[t,a,h])}}var k=t("input[type=file]:enabled",this).filter(function(){return""!==t(this).val()}).length>0,F="multipart/form-data",T=h.attr("enctype")===F||h.attr("encoding")===F,j=i.fileapi&&i.formdata;r("fileAPI :"+j);var E,C=(k||T)&&!j;!1!==e.iframe&&(e.iframe||C)?e.closeKeepAlive?t.get(e.closeKeepAlive,function(){E=l(b)}):E=l(b):E=(k||T)&&j?function(a){for(var r=new FormData,n=0;n<a.length;n++)r.append(a[n].name,a[n].value);if(e.extraData){var i=function(a){var r,n,i=t.param(a,e.traditional).split("&"),s=i.length,o=[];for(r=0;r<s;r++)i[r]=i[r].replace(/\+/g," "),n=i[r].split("="),o.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return o}(e.extraData);for(n=0;n<i.length;n++)i[n]&&r.append(i[n][0],i[n][1])}e.data=null;var s=t.extend(!0,{},t.ajaxSettings,e,{contentType:!1,processData:!1,cache:!1,type:c||"POST"});e.uploadProgress&&(s.xhr=function(){var a=t.ajaxSettings.xhr();return a.upload&&a.upload.addEventListener("progress",function(t){var a=0,r=t.loaded||t.position,n=t.total;t.lengthComputable&&(a=Math.ceil(r/n*100)),e.uploadProgress(t,r,n,a)},!1),a}),s.data=null;var o=s.beforeSend;return s.beforeSend=function(t,a){e.formData?a.data=e.formData:a.data=r,o&&o.call(this,t,a)},t.ajax(s)}(b):t.ajax(e),h.removeData("jqxhr").data("jqxhr",E);for(var A=0;A<g.length;A++)g[A]=null;return this.trigger("form-submit-notify",[this,e]),this},t.fn.ajaxForm=function(n,i,s,o){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:s},"function"==typeof o&&(n.success=o)),(n=n||{}).delegation=n.delegation&&t.isFunction(t.fn.on),!n.delegation&&0===this.length){var l={s:this.selector,c:this.context};return!t.isReady&&l.s?(r("DOM not ready, queuing ajaxForm"),t(function(){t(l.s,l.c).ajaxForm(n)}),this):(r("terminating; zero elements found by selector"+(t.isReady?"":" (DOM not ready)")),this)}return n.delegation?(t(document).off("submit.form-plugin",this.selector,e).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,n,e).on("click.form-plugin",this.selector,n,a),this):this.ajaxFormUnbind().on("submit.form-plugin",n,e).on("click.form-plugin",n,a)},t.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},t.fn.formToArray=function(e,a,r){var n=[];if(0===this.length)return n;var s,o,l,c,d,u,h,f,p=this[0],m=this.attr("id"),g=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements;if(g&&(g=t.makeArray(g)),m&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(s=t(':input[form="'+m+'"]').get()).length&&(g=(g||[]).concat(s)),!g||!g.length)return n;for(t.isFunction(r)&&(g=t.map(g,r)),o=0,h=g.length;o<h;o++)if((c=(u=g[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(n.push({name:c,value:t(u).val(),type:u.type}),n.push({name:c+".x",value:p.clk_x},{name:c+".y",value:p.clk_y}));else if((d=t.fieldValue(u,!0))&&d.constructor===Array)for(a&&a.push(u),l=0,f=d.length;l<f;l++)n.push({name:c,value:d[l]});else if(i.fileapi&&"file"===u.type){a&&a.push(u);var b=u.files;if(b.length)for(l=0;l<b.length;l++)n.push({name:c,value:b[l],type:u.type});else n.push({name:c,value:"",type:u.type})}else null!=d&&(a&&a.push(u),n.push({name:c,value:d,type:u.type,required:u.required}));if(!e&&p.clk){var y=t(p.clk),x=y[0];(c=x.name)&&!x.disabled&&"image"===x.type&&(n.push({name:c,value:y.val()}),n.push({name:c+".x",value:p.clk_x},{name:c+".y",value:p.clk_y}))}return n},t.fn.formSerialize=function(e){return t.param(this.formToArray(e))},t.fn.fieldSerialize=function(e){var a=[];return this.each(function(){var r=this.name;if(r){var n=t.fieldValue(this,e);if(n&&n.constructor===Array)for(var i=0,s=n.length;i<s;i++)a.push({name:r,value:n[i]});else null!=n&&a.push({name:this.name,value:n})}}),t.param(a)},t.fn.fieldValue=function(e){for(var a=[],r=0,n=this.length;r<n;r++){var i=this[r],s=t.fieldValue(i,e);null==s||s.constructor===Array&&!s.length||(s.constructor===Array?t.merge(a,s):a.push(s))}return a},t.fieldValue=function(e,a){var r=e.name,i=e.type,s=e.tagName.toLowerCase();if(void 0===a&&(a=!0),a&&(!r||e.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!e.checked||("submit"===i||"image"===i)&&e.form&&e.form.clk!==e||"select"===s&&-1===e.selectedIndex))return null;if("select"===s){var o=e.selectedIndex;if(o<0)return null;for(var l=[],c=e.options,d="select-one"===i,u=d?o+1:c.length,h=d?o:0;h<u;h++){var f=c[h];if(f.selected&&!f.disabled){var p=f.value;if(p||(p=f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value),d)return p;l.push(p)}}return l}return t(e).val().replace(n,"\r\n")},t.fn.clearForm=function(e){return this.each(function(){t("input,select,textarea",this).clearFields(e)})},t.fn.clearFields=t.fn.clearInputs=function(e){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,n=this.tagName.toLowerCase();a.test(r)||"textarea"===n?this.value="":"checkbox"===r||"radio"===r?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===r?/MSIE/.test(navigator.userAgent)?t(this).replaceWith(t(this).clone(!0)):t(this).val(""):e&&(!0===e&&/hidden/.test(r)||"string"==typeof e&&t(this).is(e))&&(this.value="")})},t.fn.resetForm=function(){return this.each(function(){var e=t(this),a=this.tagName.toLowerCase();switch(a){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=e.parents("select");return r.length&&r[0].multiple?"option"===a?this.selected=this.defaultSelected:e.find("option").resetForm():r.resetForm(),!0;case"select":return e.find("option").each(function(t){if(this.selected=this.defaultSelected,this.defaultSelected&&!e[0].multiple)return e[0].selectedIndex=t,!1}),!0;case"label":var n=t(e.attr("for")),i=e.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return e.find("form,input,label,select,textarea").resetForm(),!0}})},t.fn.enable=function(t){return void 0===t&&(t=!0),this.each(function(){this.disabled=!t})},t.fn.selected=function(e){return void 0===e&&(e=!0),this.each(function(){var a=this.type;if("checkbox"===a||"radio"===a)this.checked=e;else if("option"===this.tagName.toLowerCase()){var r=t(this).parent("select");e&&r[0]&&"select-one"===r[0].type&&r.find("option").selected(!1),this.selected=e}})},t.fn.ajaxSubmit.debug=!1}),function(t){t.fn.correntlyReadingChart=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");let r=this;null==r.attr("data-resolution")&&r.attr("data-resolution","3600000"),null==r.attr("data-from")&&r.attr("data-from","-86400000"),null==r.attr("data-chart")&&r.attr("data-chart","line");let n="";null!=r.attr("data-from")&&(1*r.attr("data-from")>(new Date).getTime()&&r.attr("data-from","-86400000"),1*r.attr("data-from")<0?n+="&from="+((new Date).getTime()+(1*r.attr("data-from")-1*r.attr("data-resolution"))):n+="&from="+r.attr("data-from")),null!=r.attr("data-to")&&(n+="&to="+r.attr("data-to"));const i=function(){t.getJSON("https://api.corrently.io/core/reading?account="+a+"&history="+r.attr("data-resolution")+n,function(e){let a=[],n=[],i=0;for(var s=1;s<e.history.length;s++)i<e.history[s].timeStamp?(null!=e.history[s]["1.8.0"]&&e.history[s]["1.8.0"]-e.history[s-1]["1.8.0"]>0&&a.push({y:Math.round((e.history[s]["1.8.0"]-e.history[s-1]["1.8.0"])/((e.history[s].timeStamp-e.history[s-1].timeStamp)/36e5)),x:1*e.history[s].timeStamp}),null!=e.history[s]["9.99.0"]&&n.push({y:1*e.history[s]["9.99.0"],x:1*e.history[s].timeStamp})):console.log("Timesort error"),i=e.history[s].timeStamp;if(void 0===a[a.length-1])return;r.attr("data-to",a[a.length-1].x),r.attr("data-from",a[0].x);let o=new Date(1*r.attr("data-to")),l="bis "+o.getDate()+"."+(o.getMonth()+1)+"."+(o.getYear()+1900),c="von "+(o=new Date(1*r.attr("data-from"))).getDate()+"."+(o.getMonth()+1)+"."+(o.getYear()+1900)+" "+l,d=r.attr("data-chart"),u=Math.round(Math.abs(e.history[e.history.length-1]["1.8.1"]-e.history[0]["1.8.1"])/1),h=Math.round(Math.abs(e.history[e.history.length-1]["1.8.0"]-e.history[0]["1.8.0"])/1),f=Math.round(Math.abs(e.history[e.history.length-1]["1.8.2"]-e.history[0]["1.8.2"])/1),p=Math.round(u/(u+f)*100),m=[p,100-p];if(t(".usageKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((h/1e3).toFixed(3).replace(".",",")),t(".greenKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((u/1e3).toFixed(3).replace(".",",")),t(".greyKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((f/1e3).toFixed(3).replace(".",",")),t(".totalReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.0"]/1e3).toFixed(3).replace(".",",")),t(".greenReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.1"]/1e3).toFixed(3).replace(".",",")),t(".greyReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.2"]/1e3).toFixed(3).replace(".",",")),t(".timeReading").filter('[data-account="'+r.attr("data-account")+'"]').html(new Date(e.timeStamp).toLocaleString()),"line"==d||"bar"==d){new Chart(r,{type:d,data:{datasets:[{type:d,label:"Verbrauch",data:a,borderColor:"#ff0000",backgroundColor:"#ff0000",fill:!1,yAxisID:"y-axis-1"},{type:d,label:"GrünstromIndex",data:n,borderColor:"#5cb85c",backgroundColor:"#5cb85c",fill:!1,yAxisID:"y-axis-2"}]},options:{title:{display:!0,text:l},tooltips:{callbacks:{label:function(t,e){return 0===t.datasetIndex?t.yLabel+" W":1===t.datasetIndex?t.yLabel+" Punkte":void 0}}},legend:{position:"bottom"},scales:{xAxes:[{type:"time",distribution:"linear"}],yAxes:[{ticks:{beginAtZero:!1},display:!0,position:"left",id:"y-axis-1",scaleLabel:{display:!0,labelString:"Wh"}},{ticks:{beginAtZero:!1},display:!0,position:"right",id:"y-axis-2",scaleLabel:{display:!0,labelString:"Punkte"}}]}}})}if("donut"==d){new Chart(r,{type:"doughnut",data:{datasets:[{label:"Verbrauch",data:m,backgroundColor:["#5cb85c","#a0a0a0"]}],labels:["Grünstrom","Graustrom"]},options:{responsive:!0,legend:{position:"bottom"},title:{display:!0,text:c},animation:{animateScale:!0,animateRotate:!0}}})}})};i(),setInterval(i,6e4)}}(jQuery),function(t){t.fn.correntlyGSI=function(e){let a="https://api.corrently.io/core/gsi";null!=e?a+="?plz="+e:null!=this.attr("data-plz")?this.attr("data-plz"):null!=this.attr("data-zip")&&this.attr("data-zip");const r=this;r.html("<span class='text-muted'>wird geladen...</span>");const n=function(){null!=r.attr("data-refresh")&&r.attr("data-refresh")>(new Date).getTime()||t.getJSON(a,function(e){t("#fortext").html("für "+e.location.city);let a="<tr><td class='small'>Datum</td>",n="<tr><td class='small'>Zeit</td>",i="<tr><td class='small'>Preisniveau</td>",s="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>örtlicher&nbsp;Energiepreis</td>";for(var o=0;o<e.forecast.length;o++){let t=new Date(e.forecast[o].timeStamp);0==o||0==t.getHours()?a+="<td class='small'>"+t.getDate()+"."+(t.getMonth()+1)+"</td>":a+="<td>&nbsp;</td>";let r="bg-warning";e.forecast[o].gsi<48&&(r="bg-secondary"),e.forecast[o].gsi>52&&(r="bg-success"),n+="<td  class='"+r+" small' style='text-align:right'>"+t.getHours()+":00</td>",i+="<td style='vertical-align:bottom'><div class='"+r+"' style=';height:"+Math.round(2*(100-e.forecast[o].gsi))+"px'></div></td>",s+="<td style='text-align:right' class='"+r+" small' >"+(5-e.forecast[o].gsi/100*2).toFixed(2).replace(".",",")+"</td>"}a+="</tr>",n+="</tr>",i+="</tr>",s+="</tr>",r.html("<table class='table table-sm table-responsive'>"+i+a+n+s+"</table>"),r.attr("data-refresh",e.forecast[0].timeStamp)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlyMarket=function(){const e=this;t.getJSON("https://api.corrently.io/core/market",function(t){let a="<table class='table table-condensed'>";a+="<tr>",a+="<th>Bezeichnung</th>",a+="<th>Emitent</th>",a+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>",a+="<th>Benötigter Grünstrom<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th>",a+="</tr>";for(let e=0;e<t.results.length;e++)a+="<tr>",a+="<td>"+t.results[e].title+"</td>",a+="<td>"+t.results[e].emitent+"</td>",a+="<td>"+t.results[e].decom+"</td>",a+="<td>"+t.results[e].cori+" kWh</td>",a+="</tr>";e.html(a)})},t.fn.correntlyCommisioning=function(e){const a=this;let r=e;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account")),null==r&&(r=t.getUrlVar("a")),null==r&&(r="0x4D530cc530bCE8c84E2271528eA10D6480cbDACE"),t.getJSON("https://api.corrently.io/core/commissioning?account="+r,function(e){let r="<table class='table table-condensed'>";r+="<tr>",r+="<th>Produkt</th>",r+="<th>Backoffice Vertrag</th>",r+="<th>Eingang</th>",r+="<th>Lieferung</th>",r+="</tr>";for(let t=0;t<e.length;t++)console.log(e),r+="<tr>",r+="<td title='"+e[t].product+"'><a href='./contracts.html?a="+e[t].product+"' class='pLabel_"+e[t].product+"'>"+e[t].product+"</a></td>",r+="<td><a href='./contracts.html?a="+e[t].quitance+"'>"+e[t].quitance+"</a></td>",r+="<td>"+new Date(1*e[t].commissioning).toLocaleString()+"</td>",r+="<td title='"+e[t].delivery+"'>"+new Date(1*e[t].delivered).toLocaleString()+"</td>","0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22"==e[t].product?r+="<td><a href='./reading.html?a="+e[t].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>":"0x8dd8eddF4f8133f468867c551C17ad7324B411C6"==e[t].product?r+="<td><a href='./stromkonto.html?a="+e[t].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>":r+="<td></td>",r+="</tr>";a.html(r);for(let a=0;a<e.length;a++)t.getJSON("https://api.corrently.io/core/contract?account="+e[a].product,function(e){t(".pLabel_"+e.account).html(e.name)})})},t.fn.correntlyContract=function(e){const a=this;let r=e;null!=this.attr("data-account")&&(r=this.attr("data-account")),null!=this.attr("account")&&(r=this.attr("account")),null==r&&(r=t.getUrlVar("a")),null==r&&(r="0xcf74487007Ed9eD579b2eb5498cb719d46bb9Ab4"),t.getJSON("https://api.corrently.io/core/contract?account="+r,function(t){"dealitem"==t.type&&(t.type="Digitales Asset"),"product"==t.type&&(t.type="Produkt/Vertrag");let e="";e+="<h2>"+t.name+"</h2> <span class='text-muted'>("+t.type+")</span>",e+="<p>"+t.description+"</p>",a.html(e)})}}(jQuery),function(t){t.fn.correntlyReadingTable=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=function(t){return(t/1e3).toFixed(3).replace(".",",")},n=this;n.html("<span class='text-muted'>wird geladen...</span>");const i=function(){t.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+a,function(e){let i="<div class='table-responsive'><table class='table table-sm'>";i+="<tr><th>&nbsp;</th><th>Obis Code</th><th title='"+a+"'>Übernahme<br/>Zählerstand</th><th>Belieferung<br/>Zählerstand</th><th>Diffferenz</th><th>Letzte Ablesung</th></tr>",i+="<tr>",i+="<td colspan=3><span class='text-muted'>"+a+"</span></td>",void 0!==e.firstReading?i+="<td>"+new Date(e.firstReading.timeStamp).toLocaleString()+"</td>":i+="<td></td>",void 0!==e.firstReading?i+="<td>"+((e.timeStamp-e.firstReading.timeStamp)/864e5).toFixed(1).replace(".",",")+" Tage</td>":i+="<td></td>",i+="<td>"+new Date(e.timeStamp).toLocaleString()+"</td>",i+="</tr>",i+="<tr>",i+="<td>Gesamt</td>",i+="<td>1.8.0</td>",i+="<td>"+r(e["1.8.0"]-(e["1.8.1"]+e["1.8.2"]))+"</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.0"])+"</td>",i+="<td>"+r(e["1.8.0"]-e.firstReading["1.8.0"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.0"])+"</td>",i+="</tr>",i+="<tr>",i+="<td>Grünstrom</td>",i+="<td>1.8.1</td>",i+="<td>&nbsp;</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.1"])+"</td>",i+="<td>"+r(e["1.8.1"]-e.firstReading["1.8.1"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.1"])+"</td>",i+="</tr>",i+="<tr>",i+="<td>Graustrom</td>",i+="<td>1.8.2</td>",i+="<td>&nbsp;</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.2"])+"</td>",i+="<td>"+r(e["1.8.2"]-e.firstReading["1.8.2"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.2"])+"</td>",i+="</tr>",i+="</table></div>",n.html(i),null==n&&t("#gsi_card").html(i)})};i(),setInterval(i,6e4)},t.fn.correntlyClearing=function(e){let a=e,r="10117",n=0;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null!=this.attr("data-zip")&&(r=this.attr("data-zip")),null!=this.attr("zip")&&(r=this.attr("zip")),null!=this.attr("data-plz")&&(r=this.attr("data-plz")),null!=this.attr("plz")&&(r=this.attr("plz")),null!=this.attr("data-idx")&&(n=this.attr("data-idx")),null!=this.attr("idx")&&(n=this.attr("idx")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const i=function(t){return(t/1e3).toFixed(3).replace(".",",")},s=this;s.html("<span class='text-muted'>wird geladen...</span>"),t.getJSON("https://api.corrently.io/core/tarif?&zip="+r,function(e){let r=e[1*n];const o=function(){t.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+a,function(e){let a="<div class='table-responsive'><table class='table table-sm'>";a+="<tr class='bg-dark text-light'><td colspan='4'><h4>Energie</h4></td></tr>",a+="<tr class='bg-secondary text-light'><th>Belieferungsbeginn</th><td style='text-align:right'>"+new Date(1*e.firstReading.timeStamp).toLocaleString()+"</td><td>("+((e.timeStamp-e.firstReading.timeStamp)/864e5).toFixed(1).replace(".",",")+" Tage)</td><td>&nbsp;</td></tr>",a+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+i(e.firstReading["1.8.0"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+i(e.firstReading["1.8.1"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+i(e.firstReading["1.8.2"])+"</td><td>&nbsp;</td><td class='text-muted'>kWh</td></tr>",a+="<tr class='bg-secondary text-light'><th>Aktuell</th><td style='text-align:right'>"+new Date(e.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>",a+="<tr><td>&nbsp;Zählerstand</td><td style='text-align:right'>"+i(e["1.8.0"])+"</td><td>("+i(e["1.8.0"]-e.firstReading["1.8.0"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Grünstrom</td><td style='text-align:right'>"+i(e["1.8.1"])+"</td><td>("+i(e["1.8.1"]-e.firstReading["1.8.1"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td>&nbsp;~ Graustrom</td><td style='text-align:right'>"+i(e["1.8.2"])+"</td><td>("+i(e["1.8.2"]-e.firstReading["1.8.2"])+")</td><td class='text-muted'>kWh</td></tr>",a+="<tr><td colspan='3'>&nbsp;</td></tr>",a+="<tr class='bg-dark text-light'><td colspan='4'><h4>Geld</h4></td></tr>",a+="<tr class='bg-secondary text-light'><th>Belieferung</th><td style='text-align:right'>"+new Date(e.timeStamp).toLocaleString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>";let n=12*r.gp/365*((e.timeStamp-e.firstReading.timeStamp)/864e5),o=r.ap/1e5*(e["1.8.0"]-e.firstReading["1.8.0"]),l=2e-5*(e["1.8.1"]-e.firstReading["1.8.1"]);a+="<tr><td>&nbsp;+ Grundgebühr</td><td style='text-align:right'>"+n.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>&nbsp;+ Energiekosten</td><td style='text-align:right'>"+o.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>= Bezugskosten</td><td style='text-align:right'>"+(n+o).toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><td>&nbsp;- Corrently Grünstrom Bonus</td><td style='text-align:right'>"+l.toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="<tr><th>Brutto Kosten</th><td style='text-align:right'>"+(n+o-l).toFixed(4).replace(".",",")+"</td><td>&nbsp;</td><td class='text-muted'>EUR</td></tr>",a+="</table></div>",s.html(a),null==s&&t("#gsi_card").html(a)})};o(),setInterval(o,6e4)})},t.fn.correntlyMSCONS=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)},t.fn.correntlyUpdateReading=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlySKOBalance=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x9d28463d51aC40662865D2462e80825D4DBB41d5");const r=function(){t.getJSON("https://api.corrently.io/core/stromkonto?account="+a,function(a){t("#soll_eur").html(a.result.soll_eur.toFixed(2).replace(".",",")),t("#haben_eur").html(a.result.haben_eur.toFixed(2).replace(".",",")),t("#balance_eur").html(a.result.balance_eur.toFixed(2).replace(".",",")),void 0!==a.result.link&&t.getJSON("https://api.corrently.io/core/dispatcher?account="+a.result.link,function(t){}),t.getJSON("https://api.corrently.io/core/exd?account="+e,function(e){void 0!==e["2.8.0"]&&t("#p_2_8_0").html((e["2.8.0"]/1e3).toFixed(3).replace(".",",")),console.log(e)})})};r(),setInterval(r,6e4)},t.fn.correntlySKODepot=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x504ec8497EBD02369550f6586EB32b26f088F25B");const r=this,n=function(){t.getJSON("https://api.corrently.io/core/depot?account="+a,function(t){let e="<table class='table'>";e+="<tr><th>Anlage</th><th>Anteile (kWh/Jahr)</th></tr>";for(let a=0;a<t.assets.length;a++)e+="<tr>",e+="<td>"+t.assets[a].asset_title+"</td>",e+="<td>"+t.assets[a].shares+"</td>",e+="</tr>";e+="</table>",r.html(e)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlyTarif=function(e){let a=this,r=e;null==r&&(r=t.getUrlVar("p")),null!=this.attr("data-zip")&&(r=this.attr("data-zip")),null!=this.attr("zip")&&(r=this.attr("zip")),null!=this.attr("data-plz")&&(r=this.attr("data-plz")),null!=this.attr("plz")&&(r=this.attr("plz")),t.getJSON("https://api.corrently.io/core/tarif?&zip="+r,function(t){let e="<table class='table table-condensed'>";e+="<tr><th>Ortsteil</th><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";for(let a=0;a<t.length;a++)t[a].subcity.length>0?e+="<tr><td>"+t[a].subcity+"</td>":e+="<tr><td>"+r+"</td>",e+="<td>"+(t[a].ap/100).toFixed(4).replace(".",",")+"</td>",e+="<td>"+t[a].gp.replace(".",",")+"</td>",e+="<td><a href='https://corrently.energy/stromprodukte/"+r+"/' class='btn btn-sm btn-warning'>Details</td>",e+="</tr>";e+="</table>",a.html(e)})}}(jQuery),$.extend({getUrlVars:function(){for(var t,e=[],a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),r=0;r<a.length;r++)t=a[r].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(t){return $.getUrlVars()[t]}});
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,a){return void 0===a&&(a="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(a),a}:t(jQuery)}(function(t){"use strict";function e(e){var a=e.data;e.isDefaultPrevented()||(e.preventDefault(),t(e.target).closest("form").ajaxSubmit(a))}function a(e){var a=e.target,r=t(a);if(!r.is("[type=submit],[type=image]")){var n=r.closest("[type=submit]");if(0===n.length)return;a=n[0]}var i=a.form;if(i.clk=a,"image"===a.type)if(void 0!==e.offsetX)i.clk_x=e.offsetX,i.clk_y=e.offsetY;else if("function"==typeof t.fn.offset){var o=r.offset();i.clk_x=e.pageX-o.left,i.clk_y=e.pageY-o.top}else i.clk_x=e.pageX-a.offsetLeft,i.clk_y=e.pageY-a.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function r(){if(t.fn.ajaxSubmit.debug){var e="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==t('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!t.fn.prop;t.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var t=this.prop.apply(this,arguments);return t&&t.jquery||"string"==typeof t?t:this.attr.apply(this,arguments)},t.fn.ajaxSubmit=function(e,a,n,s){function l(a){function n(t){var e=null;try{t.contentWindow&&(e=t.contentWindow.document)}catch(t){r("cannot get iframe.contentWindow document: "+t)}if(e)return e;try{e=t.contentDocument?t.contentDocument:t.document}catch(a){r("cannot get iframe.contentDocument: "+a),e=t.document}return e}function i(){var e=f.attr2("target"),a=f.attr2("action"),i=f.attr("enctype")||f.attr("encoding")||"multipart/form-data";D.setAttribute("target",p),c&&!/post/i.test(c)||D.setAttribute("method","POST"),a!==d.url&&D.setAttribute("action",d.url),d.skipEncodingOverride||c&&!/post/i.test(c)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),d.timeout&&(w=setTimeout(function(){S=!0,s(F)},d.timeout));var o=[];try{if(d.extraData)for(var l in d.extraData)d.extraData.hasOwnProperty(l)&&(t.isPlainObject(d.extraData[l])&&d.extraData[l].hasOwnProperty("name")&&d.extraData[l].hasOwnProperty("value")?o.push(t('<input type="hidden" name="'+d.extraData[l].name+'">',j).val(d.extraData[l].value).appendTo(D)[0]):o.push(t('<input type="hidden" name="'+l+'">',j).val(d.extraData[l]).appendTo(D)[0]));d.iframeTarget||h.appendTo(k),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(function t(){try{var e=n(v).readyState;r("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){r("Server abort: ",e," (",e.name,")"),s(A),w&&clearTimeout(w),w=void 0}},15);try{D.submit()}catch(t){document.createElement("form").submit.apply(D)}}finally{D.setAttribute("action",a),D.setAttribute("enctype",i),e?D.setAttribute("target",e):f.removeAttr("target"),t(o).remove()}}function s(e){if(!y.aborted&&!R){if((L=n(v))||(r("cannot access response document"),e=A),e===F&&y)return y.abort("timeout"),void T.reject(y,"timeout");if(e===A&&y)return y.abort("server abort"),void T.reject(y,"error","server abort");if(L&&L.location.href!==d.iframeSrc||S){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var a,i="success";try{if(S)throw"timeout";var o="xml"===d.dataType||L.XMLDocument||t.isXMLDoc(L);if(r("isXml="+o),!o&&window.opera&&(null===L.body||!L.body.innerHTML)&&--O)return r("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var l=L.body?L.body:L.documentElement;y.responseText=l?l.innerHTML:null,y.responseXML=L.XMLDocument?L.XMLDocument:L,o&&(d.dataType="xml"),y.getResponseHeader=function(t){return{"content-type":d.dataType}[t.toLowerCase()]},l&&(y.status=Number(l.getAttribute("status"))||y.status,y.statusText=l.getAttribute("statusText")||y.statusText);var c=(d.dataType||"").toLowerCase(),u=/(json|script|text)/.test(c);if(u||d.textarea){var f=L.getElementsByTagName("textarea")[0];if(f)y.responseText=f.value,y.status=Number(f.getAttribute("status"))||y.status,y.statusText=f.getAttribute("statusText")||y.statusText;else if(u){var p=L.getElementsByTagName("pre")[0],g=L.getElementsByTagName("body")[0];p?y.responseText=p.textContent?p.textContent:p.innerText:g&&(y.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!y.responseXML&&y.responseText&&(y.responseXML=I(y.responseText));try{E=N(y,c,d)}catch(t){i="parsererror",y.error=a=t||i}}catch(t){r("error caught: ",t),i="error",y.error=a=t||i}y.aborted&&(r("upload aborted"),i=null),y.status&&(i=y.status>=200&&y.status<300||304===y.status?"success":"error"),"success"===i?(d.success&&d.success.call(d.context,E,"success",y),T.resolve(y.responseText,"success",y),m&&t.event.trigger("ajaxSuccess",[y,d])):i&&(void 0===a&&(a=y.statusText),d.error&&d.error.call(d.context,y,i,a),T.reject(y,"error",a),m&&t.event.trigger("ajaxError",[y,d,a])),m&&t.event.trigger("ajaxComplete",[y,d]),m&&!--t.active&&t.event.trigger("ajaxStop"),d.complete&&d.complete.call(d.context,y,i),R=!0,d.timeout&&clearTimeout(w),setTimeout(function(){d.iframeTarget?h.attr("src",d.iframeSrc):h.remove(),y.responseXML=null},100)}}}var l,u,d,m,p,h,v,y,b,x,S,w,D=f[0],T=t.Deferred();if(T.abort=function(t){y.abort(t)},a)for(u=0;u<g.length;u++)l=t(g[u]),o?l.prop("disabled",!1):l.removeAttr("disabled");(d=t.extend(!0,{},t.ajaxSettings,e)).context=d.context||d,p="jqFormIO"+(new Date).getTime();var j=D.ownerDocument,k=f.closest("body");if(d.iframeTarget?(x=(h=t(d.iframeTarget,j)).attr2("name"))?p=x:h.attr2("name",p):(h=t('<iframe name="'+p+'" src="'+d.iframeSrc+'" />',j)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],y={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var a="timeout"===e?"timeout":"aborted";r("aborting upload... "+a),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(t){}h.attr("src",d.iframeSrc),y.error=a,d.error&&d.error.call(d.context,y,a,e),m&&t.event.trigger("ajaxError",[y,d,a]),d.complete&&d.complete.call(d.context,y,a)}},(m=d.global)&&0==t.active++&&t.event.trigger("ajaxStart"),m&&t.event.trigger("ajaxSend",[y,d]),d.beforeSend&&!1===d.beforeSend.call(d.context,y,d))return d.global&&t.active--,T.reject(),T;if(y.aborted)return T.reject(),T;(b=D.clk)&&(x=b.name)&&!b.disabled&&(d.extraData=d.extraData||{},d.extraData[x]=b.value,"image"===b.type&&(d.extraData[x+".x"]=D.clk_x,d.extraData[x+".y"]=D.clk_y));var F=1,A=2,C=t("meta[name=csrf-token]").attr("content"),M=t("meta[name=csrf-param]").attr("content");M&&C&&(d.extraData=d.extraData||{},d.extraData[M]=C),d.forceSync?i():setTimeout(i,10);var E,L,R,O=50,I=t.parseXML||function(t,e){return window.ActiveXObject?((e=new ActiveXObject("Microsoft.XMLDOM")).async="false",e.loadXML(t)):e=(new DOMParser).parseFromString(t,"text/xml"),e&&e.documentElement&&"parsererror"!==e.documentElement.nodeName?e:null},X=t.parseJSON||function(t){return window.eval("("+t+")")},N=function(e,a,r){var n=e.getResponseHeader("content-type")||"",i=("xml"===a||!a)&&n.indexOf("xml")>=0,o=i?e.responseXML:e.responseText;return i&&"parsererror"===o.documentElement.nodeName&&t.error&&t.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,a)),"string"==typeof o&&(("json"===a||!a)&&n.indexOf("json")>=0?o=X(o):("script"===a||!a)&&n.indexOf("javascript")>=0&&t.globalEval(o)),o};return T}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var c,u,d,f=this;"function"==typeof e?e={success:e}:"string"==typeof e||!1===e&&arguments.length>0?(e={url:e,data:a,dataType:n},"function"==typeof s&&(e.success=s)):void 0===e&&(e={}),c=e.method||e.type||this.attr2("method"),(d=(d="string"==typeof(u=e.url||this.attr2("action"))?t.trim(u):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),e=t.extend(!0,{url:d,success:t.ajaxSettings.success,type:c||t.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},e);var m={};if(this.trigger("form-pre-serialize",[this,e,m]),m.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(e.beforeSerialize&&!1===e.beforeSerialize(this,e))return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=e.traditional;void 0===p&&(p=t.ajaxSettings.traditional);var h,g=[],v=this.formToArray(e.semantic,g,e.filtering);if(e.data){var y=t.isFunction(e.data)?e.data(v):e.data;e.extraData=y,h=t.param(y,p)}if(e.beforeSubmit&&!1===e.beforeSubmit(v,this,e))return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,e,m]),m.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=t.param(v,p);h&&(b=b?b+"&"+h:h),"GET"===e.type.toUpperCase()?(e.url+=(e.url.indexOf("?")>=0?"&":"?")+b,e.data=null):e.data=b;var x=[];if(e.resetForm&&x.push(function(){f.resetForm()}),e.clearForm&&x.push(function(){f.clearForm(e.includeHidden)}),!e.dataType&&e.target){var S=e.success||function(){};x.push(function(a,r,n){var i=arguments,o=e.replaceTarget?"replaceWith":"html";t(e.target)[o](a).each(function(){S.apply(this,i)})})}else e.success&&(t.isArray(e.success)?t.merge(x,e.success):x.push(e.success));if(e.success=function(t,a,r){for(var n=e.context||this,i=0,o=x.length;i<o;i++)x[i].apply(n,[t,a,r||f,f])},e.error){var w=e.error;e.error=function(t,a,r){var n=e.context||this;w.apply(n,[t,a,r,f])}}if(e.complete){var D=e.complete;e.complete=function(t,a){var r=e.context||this;D.apply(r,[t,a,f])}}var T=t("input[type=file]:enabled",this).filter(function(){return""!==t(this).val()}).length>0,j="multipart/form-data",k=f.attr("enctype")===j||f.attr("encoding")===j,F=i.fileapi&&i.formdata;r("fileAPI :"+F);var A,C=(T||k)&&!F;!1!==e.iframe&&(e.iframe||C)?e.closeKeepAlive?t.get(e.closeKeepAlive,function(){A=l(v)}):A=l(v):A=(T||k)&&F?function(a){for(var r=new FormData,n=0;n<a.length;n++)r.append(a[n].name,a[n].value);if(e.extraData){var i=function(a){var r,n,i=t.param(a,e.traditional).split("&"),o=i.length,s=[];for(r=0;r<o;r++)i[r]=i[r].replace(/\+/g," "),n=i[r].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}(e.extraData);for(n=0;n<i.length;n++)i[n]&&r.append(i[n][0],i[n][1])}e.data=null;var o=t.extend(!0,{},t.ajaxSettings,e,{contentType:!1,processData:!1,cache:!1,type:c||"POST"});e.uploadProgress&&(o.xhr=function(){var a=t.ajaxSettings.xhr();return a.upload&&a.upload.addEventListener("progress",function(t){var a=0,r=t.loaded||t.position,n=t.total;t.lengthComputable&&(a=Math.ceil(r/n*100)),e.uploadProgress(t,r,n,a)},!1),a}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(t,a){e.formData?a.data=e.formData:a.data=r,s&&s.call(this,t,a)},t.ajax(o)}(v):t.ajax(e),f.removeData("jqxhr").data("jqxhr",A);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,e]),this},t.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),(n=n||{}).delegation=n.delegation&&t.isFunction(t.fn.on),!n.delegation&&0===this.length){var l={s:this.selector,c:this.context};return!t.isReady&&l.s?(r("DOM not ready, queuing ajaxForm"),t(function(){t(l.s,l.c).ajaxForm(n)}),this):(r("terminating; zero elements found by selector"+(t.isReady?"":" (DOM not ready)")),this)}return n.delegation?(t(document).off("submit.form-plugin",this.selector,e).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,n,e).on("click.form-plugin",this.selector,n,a),this):this.ajaxFormUnbind().on("submit.form-plugin",n,e).on("click.form-plugin",n,a)},t.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},t.fn.formToArray=function(e,a,r){var n=[];if(0===this.length)return n;var o,s,l,c,u,d,f,m,p=this[0],h=this.attr("id"),g=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements;if(g&&(g=t.makeArray(g)),h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=t(':input[form="'+h+'"]').get()).length&&(g=(g||[]).concat(o)),!g||!g.length)return n;for(t.isFunction(r)&&(g=t.map(g,r)),s=0,f=g.length;s<f;s++)if((c=(d=g[s]).name)&&!d.disabled)if(e&&p.clk&&"image"===d.type)p.clk===d&&(n.push({name:c,value:t(d).val(),type:d.type}),n.push({name:c+".x",value:p.clk_x},{name:c+".y",value:p.clk_y}));else if((u=t.fieldValue(d,!0))&&u.constructor===Array)for(a&&a.push(d),l=0,m=u.length;l<m;l++)n.push({name:c,value:u[l]});else if(i.fileapi&&"file"===d.type){a&&a.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)n.push({name:c,value:v[l],type:d.type});else n.push({name:c,value:"",type:d.type})}else null!=u&&(a&&a.push(d),n.push({name:c,value:u,type:d.type,required:d.required}));if(!e&&p.clk){var y=t(p.clk),b=y[0];(c=b.name)&&!b.disabled&&"image"===b.type&&(n.push({name:c,value:y.val()}),n.push({name:c+".x",value:p.clk_x},{name:c+".y",value:p.clk_y}))}return n},t.fn.formSerialize=function(e){return t.param(this.formToArray(e))},t.fn.fieldSerialize=function(e){var a=[];return this.each(function(){var r=this.name;if(r){var n=t.fieldValue(this,e);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)a.push({name:r,value:n[i]});else null!=n&&a.push({name:this.name,value:n})}}),t.param(a)},t.fn.fieldValue=function(e){for(var a=[],r=0,n=this.length;r<n;r++){var i=this[r],o=t.fieldValue(i,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?t.merge(a,o):a.push(o))}return a},t.fieldValue=function(e,a){var r=e.name,i=e.type,o=e.tagName.toLowerCase();if(void 0===a&&(a=!0),a&&(!r||e.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!e.checked||("submit"===i||"image"===i)&&e.form&&e.form.clk!==e||"select"===o&&-1===e.selectedIndex))return null;if("select"===o){var s=e.selectedIndex;if(s<0)return null;for(var l=[],c=e.options,u="select-one"===i,d=u?s+1:c.length,f=u?s:0;f<d;f++){var m=c[f];if(m.selected&&!m.disabled){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),u)return p;l.push(p)}}return l}return t(e).val().replace(n,"\r\n")},t.fn.clearForm=function(e){return this.each(function(){t("input,select,textarea",this).clearFields(e)})},t.fn.clearFields=t.fn.clearInputs=function(e){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,n=this.tagName.toLowerCase();a.test(r)||"textarea"===n?this.value="":"checkbox"===r||"radio"===r?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===r?/MSIE/.test(navigator.userAgent)?t(this).replaceWith(t(this).clone(!0)):t(this).val(""):e&&(!0===e&&/hidden/.test(r)||"string"==typeof e&&t(this).is(e))&&(this.value="")})},t.fn.resetForm=function(){return this.each(function(){var e=t(this),a=this.tagName.toLowerCase();switch(a){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=e.parents("select");return r.length&&r[0].multiple?"option"===a?this.selected=this.defaultSelected:e.find("option").resetForm():r.resetForm(),!0;case"select":return e.find("option").each(function(t){if(this.selected=this.defaultSelected,this.defaultSelected&&!e[0].multiple)return e[0].selectedIndex=t,!1}),!0;case"label":var n=t(e.attr("for")),i=e.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return e.find("form,input,label,select,textarea").resetForm(),!0}})},t.fn.enable=function(t){return void 0===t&&(t=!0),this.each(function(){this.disabled=!t})},t.fn.selected=function(e){return void 0===e&&(e=!0),this.each(function(){var a=this.type;if("checkbox"===a||"radio"===a)this.checked=e;else if("option"===this.tagName.toLowerCase()){var r=t(this).parent("select");e&&r[0]&&"select-one"===r[0].type&&r.find("option").selected(!1),this.selected=e}})},t.fn.ajaxSubmit.debug=!1}),function(t){t.fn.correntlyReadingChart=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");let r=this;null==r.attr("data-resolution")&&r.attr("data-resolution","3600000"),null==r.attr("data-from")&&r.attr("data-from","-86400000"),null==r.attr("data-chart")&&r.attr("data-chart","line");let n="";null!=r.attr("data-from")&&(1*r.attr("data-from")>(new Date).getTime()&&r.attr("data-from","-86400000"),1*r.attr("data-from")<0?n+="&from="+((new Date).getTime()+(1*r.attr("data-from")-1*r.attr("data-resolution"))):n+="&from="+r.attr("data-from")),null!=r.attr("data-to")&&(n+="&to="+r.attr("data-to"));const i=function(){t.getJSON("https://api.corrently.io/core/reading?account="+a+"&history="+r.attr("data-resolution")+n,function(e){let a=[],n=[],i=0;for(var o=1;o<e.history.length;o++)i<e.history[o].timeStamp?(null!=e.history[o]["1.8.0"]&&e.history[o]["1.8.0"]-e.history[o-1]["1.8.0"]>0&&a.push({y:Math.round((e.history[o]["1.8.0"]-e.history[o-1]["1.8.0"])/((e.history[o].timeStamp-e.history[o-1].timeStamp)/36e5)),x:1*e.history[o].timeStamp}),null!=e.history[o]["9.99.0"]&&n.push({y:1*e.history[o]["9.99.0"],x:1*e.history[o].timeStamp})):console.log("Timesort error"),i=e.history[o].timeStamp;if(void 0===a[a.length-1])return;r.attr("data-to",a[a.length-1].x),r.attr("data-from",a[0].x);let s=new Date(1*r.attr("data-to")),l="bis "+s.getDate()+"."+(s.getMonth()+1)+"."+(s.getYear()+1900),c="von "+(s=new Date(1*r.attr("data-from"))).getDate()+"."+(s.getMonth()+1)+"."+(s.getYear()+1900)+" "+l,u=r.attr("data-chart"),d=Math.round(Math.abs(e.history[e.history.length-1]["1.8.1"]-e.history[0]["1.8.1"])/1),f=Math.round(Math.abs(e.history[e.history.length-1]["1.8.0"]-e.history[0]["1.8.0"])/1),m=Math.round(Math.abs(e.history[e.history.length-1]["1.8.2"]-e.history[0]["1.8.2"])/1),p=Math.round(d/(d+m)*100),h=[p,100-p];if(t(".usageKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((f/1e3).toFixed(3).replace(".",",")),t(".greenKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((d/1e3).toFixed(3).replace(".",",")),t(".greyKwh").filter('[data-account="'+r.attr("data-account")+'"]').html((m/1e3).toFixed(3).replace(".",",")),t(".totalReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.0"]/1e3).toFixed(3).replace(".",",")),t(".greenReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.1"]/1e3).toFixed(3).replace(".",",")),t(".greyReading").filter('[data-account="'+r.attr("data-account")+'"]').html((e["1.8.2"]/1e3).toFixed(3).replace(".",",")),t(".timeReading").filter('[data-account="'+r.attr("data-account")+'"]').html(new Date(e.timeStamp).toLocaleString()),"line"==u||"bar"==u){new Chart(r,{type:u,data:{datasets:[{type:u,label:"Verbrauch",data:a,borderColor:"#ff0000",backgroundColor:"#ff0000",fill:!1,yAxisID:"y-axis-1"},{type:u,label:"GrünstromIndex",data:n,borderColor:"#5cb85c",backgroundColor:"#5cb85c",fill:!1,yAxisID:"y-axis-2"}]},options:{title:{display:!0,text:l},tooltips:{callbacks:{label:function(t,e){return 0===t.datasetIndex?t.yLabel+" W":1===t.datasetIndex?t.yLabel+" Punkte":void 0}}},legend:{position:"bottom"},scales:{xAxes:[{type:"time",distribution:"linear"}],yAxes:[{ticks:{beginAtZero:!1},display:!0,position:"left",id:"y-axis-1",scaleLabel:{display:!0,labelString:"Wh"}},{ticks:{beginAtZero:!1},display:!0,position:"right",id:"y-axis-2",scaleLabel:{display:!0,labelString:"Punkte"}}]}}})}if("donut"==u){new Chart(r,{type:"doughnut",data:{datasets:[{label:"Verbrauch",data:h,backgroundColor:["#5cb85c","#a0a0a0"]}],labels:["Grünstrom","Graustrom"]},options:{responsive:!0,legend:{position:"bottom"},title:{display:!0,text:c},animation:{animateScale:!0,animateRotate:!0}}})}})};i(),setInterval(i,6e4)}}(jQuery),function(t){t.fn.correntlyGSI=function(e){let a="https://api.corrently.io/core/gsi";null!=e?a+="?plz="+e:null!=this.attr("data-plz")?this.attr("data-plz"):null!=this.attr("data-zip")&&this.attr("data-zip");const r=this;r.html("<span class='text-muted'>wird geladen...</span>");const n=function(){null!=r.attr("data-refresh")&&r.attr("data-refresh")>(new Date).getTime()||t.getJSON(a,function(e){t("#fortext").html("für "+e.location.city);let a="<tr><td class='small'>Datum</td>",n="<tr><td class='small'>Zeit</td>",i="<tr><td class='small'>Preisniveau</td>",o="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>örtlicher&nbsp;Energiepreis</td>";for(var s=0;s<e.forecast.length;s++){let t=new Date(e.forecast[s].timeStamp);0==s||0==t.getHours()?a+="<td class='small'>"+t.getDate()+"."+(t.getMonth()+1)+"</td>":a+="<td>&nbsp;</td>";let r="bg-warning";e.forecast[s].gsi<48&&(r="bg-secondary"),e.forecast[s].gsi>52&&(r="bg-success"),n+="<td  class='"+r+" small' style='text-align:right'>"+t.getHours()+":00</td>",i+="<td style='vertical-align:bottom'><div class='"+r+"' style=';height:"+Math.round(2*(100-e.forecast[s].gsi))+"px'></div></td>",o+="<td style='text-align:right' class='"+r+" small' >"+(5-e.forecast[s].gsi/100*2).toFixed(2).replace(".",",")+"</td>"}a+="</tr>",n+="</tr>",i+="</tr>",o+="</tr>",r.html("<table class='table table-sm table-responsive'>"+i+a+n+o+"</table>"),r.attr("data-refresh",e.forecast[0].timeStamp)})};n(),setInterval(n,6e4)}}(jQuery),function(t){t.fn.correntlyReadingTable=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=function(t){return(t/1e3).toFixed(3).replace(".",",")},n=this;n.html("<span class='text-muted'>wird geladen...</span>");const i=function(){t.getJSON("https://api.corrently.io/core/reading?&history=3600000&account="+a,function(e){let i="<div class='table-responsive'><table class='table table-sm'>";i+="<tr><th>&nbsp;</th><th>Obis Code</th><th title='"+a+"'>Übernahme<br/>Zählerstand</th><th>Belieferung<br/>Zählerstand</th><th>Diffferenz</th><th>Letzte Ablesung</th></tr>",i+="<tr>",i+="<td colspan=3><span class='text-muted'>"+a+"</span></td>",void 0!==e.firstReading?i+="<td>"+new Date(e.firstReading.timeStamp).toLocaleString()+"</td>":i+="<td></td>",void 0!==e.firstReading?i+="<td>"+((e.timeStamp-e.firstReading.timeStamp)/864e5).toFixed(1).replace(".",",")+" Tage</td>":i+="<td></td>",i+="<td>"+new Date(e.timeStamp).toLocaleString()+"</td>",i+="</tr>",i+="<tr>",i+="<td>Gesamt</td>",i+="<td>1.8.0</td>",i+="<td>"+r(e["1.8.0"]-(e["1.8.1"]+e["1.8.2"]))+"</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.0"])+"</td>",i+="<td>"+r(e["1.8.0"]-e.firstReading["1.8.0"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.0"])+"</td>",i+="</tr>",i+="<tr>",i+="<td>Grünstrom</td>",i+="<td>1.8.1</td>",i+="<td>&nbsp;</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.1"])+"</td>",i+="<td>"+r(e["1.8.1"]-e.firstReading["1.8.1"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.1"])+"</td>",i+="</tr>",i+="<tr>",i+="<td>Graustrom</td>",i+="<td>1.8.2</td>",i+="<td>&nbsp;</td>",void 0!==e.firstReading?(i+="<td>"+r(e.firstReading["1.8.2"])+"</td>",i+="<td>"+r(e["1.8.2"]-e.firstReading["1.8.2"])+"</td>"):(i+="<td></td>",i+="<td></td>"),i+="<td>"+r(e["1.8.2"])+"</td>",i+="</tr>",i+="</table></div>",n.html(i),null==n&&t("#gsi_card").html(i)})};i(),setInterval(i,6e4)},t.fn.correntlyMSCONS=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)},t.fn.correntlyUpdateReading=function(e){let a=e;null!=this.attr("data-account")&&(a=this.attr("data-account")),null!=this.attr("account")&&(a=this.attr("account")),null==a&&(a=t.getUrlVar("a")),null==a&&(a="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9");const r=this,n=function(){t.getJSON("https://api.corrently.io/edifact/mscons_2.2i?account="+a,function(t){let e="";e+="<code>",e+=t.msg,e+="</code>",r.html(e)})};n(),setInterval(n,6e4)}}(jQuery),$.extend({getUrlVars:function(){for(var t,e=[],a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),r=0;r<a.length;r++)t=a[r].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(t){return $.getUrlVars()[t]}});
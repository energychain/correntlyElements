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
!function(p){p.fn.ihavecookies=function(e,o){var i=p(this),t=p.extend({cookieTypes:[{type:"Site Preferences",value:"preferences",description:"These are cookies that are related to your site preferences, e.g. remembering your username, site colours, etc."},{type:"Analytics",value:"analytics",description:"Cookies related to site visits, browser types, etc."},{type:"Marketing",value:"marketing",description:"Cookies related to marketing, e.g. newsletters, social media, etc"}],title:"Cookies & Privacy",message:"Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches, and give us insights into user behavior so we can improve our communications and products.",link:"/privacy-policy",delay:2e3,expires:30,moreInfoLabel:"More information",acceptBtnLabel:"Accept Cookies",advancedBtnLabel:"Customise Cookies",cookieTypesTitle:"Select cookies to accept",fixedCookieTypeLabel:"Necessary",fixedCookieTypeDesc:"These are cookies that are essential for the website to work correctly.",onAccept:function(){},uncheckBoxes:!1},e),n=u("cookieControl"),c=u("cookieControlPrefs");if(n&&c&&"reinit"!=o){var r=!0;"false"==n&&(r=!1),d(r,t.expires)}else{p("#gdpr-cookie-message").remove();var a='<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="'+t.fixedCookieTypeDesc+'">'+t.fixedCookieTypeLabel+"</label></li>";preferences=JSON.parse(c),p.each(t.cookieTypes,function(e,o){if(""!==o.type&&""!==o.value){var i="";!1!==o.description&&(i=' title="'+o.description+'"'),a+='<li><input type="checkbox" id="gdpr-cookietype-'+o.value+'" name="gdpr[]" value="'+o.value+'" data-auto="on"> <label for="gdpr-cookietype-'+o.value+'"'+i+">"+o.type+"</label></li>"}});var s='<div id="gdpr-cookie-message"><h4>'+t.title+"</h4><p>"+t.message+' <a href="'+t.link+'">'+t.moreInfoLabel+'</a><div id="gdpr-cookie-types" style="display:none;"><h5>'+t.cookieTypesTitle+"</h5><ul>"+a+'</ul></div><p><button id="gdpr-cookie-accept" type="button">'+t.acceptBtnLabel+'</button><button id="gdpr-cookie-advanced" type="button">'+t.advancedBtnLabel+"</button></p></div>";setTimeout(function(){p(i).append(s),p("#gdpr-cookie-message").hide().fadeIn("slow",function(){"reinit"==o&&(p("#gdpr-cookie-advanced").trigger("click"),p.each(preferences,function(e,o){p("input#gdpr-cookietype-"+o).prop("checked",!0)}))})},t.delay),p("body").on("click","#gdpr-cookie-accept",function(){d(!0,t.expires),p('input[name="gdpr[]"][data-auto="on"]').prop("checked",!0);var i=[];p.each(p('input[name="gdpr[]"]').serializeArray(),function(e,o){i.push(o.value)}),l("cookieControlPrefs",encodeURIComponent(JSON.stringify(i)),365),t.onAccept.call(this)}),p("body").on("click","#gdpr-cookie-advanced",function(){p('input[name="gdpr[]"]:not(:disabled)').attr("data-auto","off").prop("checked",!1),p("#gdpr-cookie-types").slideDown("fast",function(){p("#gdpr-cookie-advanced").prop("disabled",!0)})})}!0===t.uncheckBoxes&&p('input[type="checkbox"].ihavecookies').prop("checked",!1)},p.fn.ihavecookies.cookie=function(){var e=u("cookieControlPrefs");return JSON.parse(e)},p.fn.ihavecookies.preference=function(e){var o=u("cookieControl"),i=u("cookieControlPrefs");return i=JSON.parse(i),!1!==o&&(!1!==i&&-1!==i.indexOf(e))};var d=function(e,o){l("cookieControl",e,o),p("#gdpr-cookie-message").fadeOut("fast",function(){p(this).remove()})},l=function(e,o,i){var t=new Date;t.setTime(t.getTime()+24*i*60*60*1e3);var n="expires="+t.toUTCString();return document.cookie=e+"="+o+";"+n+";path=/",u(e)},u=function(e){for(var o=e+"=",i=decodeURIComponent(document.cookie).split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1);if(0===n.indexOf(o))return n.substring(o.length,n.length)}return!1}}(jQuery);

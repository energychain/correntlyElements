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
          resolve(data.account);
          } else {
          reject("");  
          }
        })
      });
   }
});
$(document).ready(function() {
  if(typeof $.getUrlVar("a") != "undefined") {
    window.localStorage.setItem("ce_account",$.getUrlVar("a"));
  }
});

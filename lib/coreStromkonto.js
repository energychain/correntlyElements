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
           for(let i=0;i<data.assets.length;i++) {
              html+="<tr>";
              html+="<td>"+data.assets[i].asset_title+"</td>";
              html+="<td>"+data.assets[i].shares+"</td>";
              html+="</tr>";
           }
           html+="</table>";
           parent.html(html);
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    }

}( jQuery ));

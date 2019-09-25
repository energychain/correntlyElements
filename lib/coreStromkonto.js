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

           $('#soll_kwh').html((data.result.soll_eur/0.02).toFixed(3).replace('.',','));
           $('#soll_kwh').attr('title',data.result.soll_eur);
           $('#haben_kwh').html((data.result.haben_eur/0.02).toFixed(3).replace('.',','));
           $('#haben_kwh').attr('title',data.result.haben_eur);
           $('#balance_kwh').html((data.result.balance_eur/0.02).toFixed(3).replace('.',','));
           $('#balance_kwh').attr('title',data.result.balance_eur);

           if(typeof data.result.link != "undefined") {
             $.getJSON("https://api.corrently.io/core/dispatcher?account="+data.result.link,function(data) {

             });
           }
           $.getJSON("https://api.corrently.io/core/exd?account="+window.sko_link,function(data) {
             if(typeof data["2.8.0"] != "undefined") {
               console.log("2.8.0",data["2.8.0"]);
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
      if(typeof window.sko_link != "undefined") {
        q= window.sko_link;
      }
      const parent = this;
      const refreshReading = function() {
         $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
           let html = "<table class='table depottable'>";
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

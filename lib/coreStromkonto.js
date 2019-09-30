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
           } else {
             $.getJSON("https://api.corrently.io/core/dispatcher?account="+window.sko_link,function(data) {

             });
           }
           $.getJSON("https://api.corrently.io/core/exd?account="+window.sko_link,function(data) {
             if(typeof data["2.8.0"] != "undefined") {
               console.log("2.8.0",data["2.8.0"]);
               $('#p_2_8_0').html((data["2.8.0"]/1000).toFixed(3).replace('.',','));
             }
           })
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    },
    $.fn.correntlySKOTxs=function(account,errCB) {
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
        $.getJSON("https://api.corrently.io/core/stromkonto-txs?a="+q+"&range=100000",function(data) {
          let html = "<table class='table txtable'>";
          html+="<tr><th>Buchungslauf</th><th>von/an</th><th style='text-align:right'>Betrag</th></tr>";
          for(let i=0;i<data.items.length;i++) {
            html+="<tr>";
            html+="<td>"+data.items[i].blockNumber+"</td>";

            if(data.items[i].from == q) {
              html+="<td>"+data.items[i].to+"</td>";
              html+="<td style='text-align:right'>"+((data.items[i].value*(-1))/100000).toFixed(6).replace('.',',')+"</td>";
            } else {
              html+="<td>"+data.items[i].from+"</td>";
              html+="<td style='text-align:right'>"+(data.items[i].value/100000).toFixed(6).replace('.',',')+"</td>";
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
                  html+="<td>"+data.assets[i].asset_title+"</td>";
                  html+="<td style='text-align:right'>"+data.assets[i].shares+"&nbsp;kWh</td>";
                  html+="</tr>";
               }
           }
           html+="</table>";
           parent.html(html);
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
      if(this.attr("max") != null ) max=this.attr("max");

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
           html+="<tr><th>Anlage</th><th style='text-align:right'>jährliche Eigenerzeugung</th></tr>";
           let total_shares =0;
           for(let j=0;(j<market.results.length)&&(j<max));j++) {
             let shares=0;

             if((typeof data.assets != "undefined") && (data.assets!=null)) {
                 for(let i=0;i<data.assets.length;i++) {
                    if(data.assets[i].asset_contract == market.results[j].contract) {
                      shares=data.assets[i].shares;
                    }
                 }
             }
             html+="<tr>";
             html+="<td>"+market.results[j].title+"</td>";
             html+="<td style='text-align:right'>"+shares+"&nbsp;kWh</td>";
             html+="</tr>";
             total_shares+=1*shares;
           }
           html+="<tr><th>Gesamt</th><th style='text-align:right'>"+total_shares+"&nbsp;kWh</th>";
           html+="</table>";
           parent.html(html);
         });
        });
      }
      refreshReading();
      setInterval(refreshReading,60000);
    }

}( jQuery ));

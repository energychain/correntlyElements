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

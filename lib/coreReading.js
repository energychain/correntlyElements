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

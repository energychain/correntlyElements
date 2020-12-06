(function ( $ ) {
  $.fn.correntlyGSIDispatch=function(zipcode) {
    let url="https://api.corrently.io/core/srcgraph";
    let maxrows = 100;
    let nolink = false;
    if(zipcode!=null) {
      if(zipcode.length>5) {
      url+="?account="+zipcode;
      } else {
      url+="?zip="+zipcode;
      }
    } else
    if(this.attr("data-plz")!=null) url+"?zip="+this.attr("data-plz"); else
    if(this.attr("data-zip")!=null) url+"?zip="+this.attr("data-zip");
    if(this.attr("maxrows")!=null) maxrows=this.attr("maxrows")*1;
    if(this.attr("nolink")!=null) nolink=true;
    const parent = this;
    if(($('.gsiDataGiven').length==0)&&(  parent.html().length < 100)) {
      parent.html("<span class='text-muted'>wird geladen... (Berechnung kann bis zu einer Minute dauern)</span>");
    }
    $.getJSON(url,function(data) {
      function compare( a, b ) {
          if ( a.energy < b.energy ){
            return -1;
          }
          if ( a.energy > b.energy ){
            return 1;
          }
          return 0;
        }
        data.sources.values = data.sources.values.sort(compare).reverse();
        data.targets.values = data.targets.values.sort(compare).reverse();
        let sum_from = 0;
        let sum_to = 0;
        for(let i=0;i<data.sources.values.length;i++) {
          sum_from+=data.sources.values[i].energy;
        }
        for(let i=0;i<data.targets.values.length;i++) {
          sum_to+=data.targets.values[i].energy;
        }
        let html="<table class='table table-striped gsiDataGiven'>";
        //html+="<thead><tr class='bg-dark text-light'><th colspan='4'><h3>Energiebilanz (nur Grünstrom): <strong>"+(sum_to-sum_from)+"</strong></h3></th></tr>";
        html+="<thead><tr><th colspan='2'>Grünstrom Import</th><th colspan='2'>Grünstrom Export</th></tr></thead><tbody>";
        for(let i=0;(((i<data.sources.values.length)||(i<data.targets.values.length))&&(i<maxrows));i++) {
          html+="<tr>";
          html+="<td>";
          if(i<data.sources.values.length) html+=((data.sources.values[i].energy/sum_from)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.sources.values.length) {
            if(nolink) {
              html+=data.sources.values[i].city;
            } else {
              html+="<a href='?q="+data.sources.values[i].zip+"'>"+data.sources.values[i].city+"</a>";
            }
          }
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) html+=((data.targets.values[i].energy/sum_to)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) {
            if(nolink) {
              html+=data.targets.values[i].city;
            } else {
              html+="<a href='?q="+data.targets.values[i].zip+"'>"+data.targets.values[i].city+"</a>";
            }
          }
          html+="</td>";
          html+="</tr>";
        }
        html+="</tbody></table>";
        html+="<p class='text-muted' style='align:center'>";
        console.log(sum_from,sum_to);
        if(sum_from>sum_to) {
          if(sum_to>0) {
          if((sum_to+sum_from)>0) {
            html+="Es wird "+(((sum_to/(sum_from+sum_to))*100)).toFixed(1).replace('.',',')+"% mehr Strom aus anderen Orten bezogen, als in andere Orte geliefert.";
            }
          } else {
            html+="Es wurde kein grüner Strom in andere Orte geliefert.";
          }
        } else {
          if(sum_from>0) {
          if((sum_to+sum_from)>0) {
            html+="Es wird "+(((sum_from/(sum_from+sum_to))*100)).toFixed(1).replace('.',',')+"% mehr Strom an anderen Orten geliefert, als aus anderen Orte bezogen.";
          }
        } else {
          html+="Es wurde kein grüner Strom aus anderen Orten bezogen.";
        }
        }
        html+="</p>";
        parent.html(html);
    });
  },
  $.fn.correntlyGSI=function(zipcode) {
      let url="https://api.corrently.io/core/gsi"
      if(zipcode!=null) {
        if(zipcode.length>5) {
        url+="?account="+zipcode;
        } else {
        url+="?zip="+zipcode;
        }
      } else
      if(this.attr("data-plz")!=null) url+"?plz="+this.attr("data-plz"); else
      if(this.attr("data-zip")!=null) url+"?plz="+this.attr("data-zip"); else
      if(window.localStorage.getItem("zipcode")!=null) url+"?plz="+window.localStorage.getItem("zipcode");
      let lblco2goeko="g CO2/kWh (Ökostrom)";
      if(this.attr("lblco2goeko")!=null) {lblco2goeko = this.attr("lblco2goeko");  }
      const parent = this;
      if(((typeof $('.gsiDataGiven') == "undefined")||($('.gsiDataGiven').length==0))&&(  parent.html().length < 100)) {
        parent.html("<span class='text-muted'>wird geladen...- Einen Augenblick</span>");
      }
      if(url.indexOf("?")>0) {
        url+="&";
      } else {
        url+="?";
      }
      if(typeof Matomo !== 'undefined') {
          url+="key="+Matomo.getTracker().getVisitorId();
      } else {
        if(window.localStorage.getItem("uuid")==null) {
          let uuid = "cel_"+Math.round(Math.random()*1000)+"_"+new Date().getTime();
          window.localStorage.setItem("uuid",uuid);
        }
        url+='key='+window.localStorage.getItem("uuid");
      }
      const refreshGSI = function() {
        if(parent.attr('data-refresh')!=null) {
          if(parent.attr('data-refresh')>new Date().getTime()) {
            return;
          }
        }
        $.ajax({
        url: url,
        dataType: 'json',
        timeout: 29000,
        error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout"
           setTimeout(function() {
             refreshGSI();
           },500);
        },
        success: function(data) {
          if(typeof data.result != "undefined") {
            data = data.result;
          }
          document.gsi_info = data;
          if(typeof data.location != "undefined") {
            $('#fortext').html("für "+data.location.city);
          }
          let maxcols=99;
          if(typeof parent.attr('maxcols') != "undefined") maxcols=1*parent.attr('maxcols');
          let daterow="<tr><td class='small'>&#128197;</td>";
          let timerow="<tr><td class='small'>&#128336;</td>";
          let barrow="<tr><td class='small'>&nbsp;</td>";
          let inforow="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>Örtlicher Energiepreis</td>";
          let co2row="<tr><td title='CO2 Fussabdruck der Erzeugung und des Transportes über Stromnetz'  class='small lblco2oeko'>"+lblco2goeko+"</td>"
          let co2standardrow="<tr><td title='CO2 Fussabdruck der Erzeugung und des Transportes über Stromnetz'  class='small lblco2standard'>g CO2/kWh (Standard)</td>"
          let idxrow="<tr><td class='small'>&#9989;</td>";
          for(var i=0;(i<data.forecast.length)&&(i<maxcols);i++) {
              let date = new Date(data.forecast[i].timeStamp);
              if((i==0)||(date.getHours()==0)) {
                daterow+="<td class='small tsclass' colspan='3'>"+date.getDate()+"."+(date.getMonth()+1)+"</td>";
              } else daterow+="<td>&nbsp;</td>";
              let bgclass="bg-warning";
              if(data.forecast[i].gsi<48) bgclass="bg-secondary";
              if(data.forecast[i].gsi>52) bgclass="bg-success";
              timerow+="<td  class='"+bgclass+" tsclass small' style='text-align:right'>"+date.getHours()+":00</td>";
              idxrow+="<td  class='"+bgclass+" tsclass small' style='text-align:right'>"+data.forecast[i].gsi+"%</td>";
              barrow+="<td style='vertical-align:bottom' class='tsclass'><div class='"+bgclass+"' title='Indexwert: "+data.forecast[i].gsi+" Punkte' style=';height:"+Math.round((data.forecast[i].gsi)*2)+"px'></div></td>";
              inforow+="<td style='text-align:right' class='"+bgclass+" tsclass small' >"+((2.231)-(4.921*(data.forecast[i].gsi/100))).toFixed(2).replace('.',',')+"</td>";
              co2row+="<td style='text-align:right' class='"+bgclass+" tsclass small' title='Standard Stromtarif "+(data.forecast[i].co2_g_standard)+"g/kWh'>"+(data.forecast[i].co2_g_oekostrom)+"</td>";
              co2standardrow+="<td style='text-align:right' class='"+bgclass+" tsclass small' title='Standard Stromtarif "+(data.forecast[i].co2_g_standard)+"g/kWh'>"+(data.forecast[i].co2_g_standard)+"</td>";
          }
          daterow+="</tr>";
          timerow+="</tr>";
          barrow+="</tr>";
          inforow+="</tr>";
          idxrow+="</tr>";
          co2row+="</tr>";
          co2standardrow+="</tr>";
          if(typeof parent.attr('noinfo') != "undefined") inforow="";
          if(typeof parent.attr('doidx') == "undefined") idxrow="";
          if(typeof parent.attr('noco2') != "undefined")  { co2row=""; co2standardrow="";}
          if(typeof parent.attr('noco2standard') != "undefined")  {co2standardrow="";}

          if(typeof cb_gsi != "undefined") {
            cb_gsi(document.gsi_info);
          }
          parent.html("<table class='table table-sm table-responsive gsiDataGiven'>"+barrow+daterow+timerow+inforow+idxrow+co2row+co2standardrow+"</table>");
          parent.attr('data-refresh',data.forecast[0].timeStamp);
          window.ce_zip=data.location.zip;
          window.ce_city = data.location.city;
          window.ce_gsi=data.forecast;
          window.localStorage.setItem("zipcode",data.location.zip);
          window.localStorage.setItem("city",data.location.city);

          if(typeof cb_location != "undefined") {
            cb_location(data.location);
          }
      }
    });

      }
      refreshGSI();
      setInterval(refreshGSI,60000);
    }
}( jQuery ));

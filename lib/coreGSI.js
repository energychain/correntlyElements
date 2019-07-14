(function ( $ ) {
  $.fn.correntlyGSIDispatch=function(zipcode) {
    let url="https://api.corrently.io/core/srcgraph";
    if(zipcode!=null) url+="?zip="+zipcode; else
    if(this.attr("data-plz")!=null) url+"?zip="+this.attr("data-plz"); else
    if(this.attr("data-zip")!=null) url+"?zip="+this.attr("data-zip");
    const parent = this;
    parent.html("<span class='text-muted'>wird geladen...</span>");
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
        let html="<table class='table table-striped'>";
        //html+="<thead><tr class='bg-dark text-light'><th colspan='4'><h3>Energiebilanz (nur Grünstrom): <strong>"+(sum_to-sum_from)+"</strong></h3></th></tr>";
        html+="<thead><tr><th colspan='2'>Grünstrom Import</th><th colspan='2'>Grünstrom Export</th></tr></thead><tbody>";
        for(let i=0;((i<data.sources.values.length)||(i<data.targets.values.length));i++) {
          html+="<tr>";
          html+="<td>";
          if(i<data.sources.values.length) html+=((data.sources.values[i].energy/sum_from)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.sources.values.length) html+="<a href='?q="+data.sources.values[i].zip+"'>"+data.sources.values[i].city+"</a>";
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) html+=((data.targets.values[i].energy/sum_to)*100).toFixed(1).replace('.',',')+"%";
          html+="</td>";
          html+="<td>";
          if(i<data.targets.values.length) html+="<a href='?q="+data.targets.values[i].zip+"'>"+data.targets.values[i].city+"</a>";
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
            html+="Es wird "+(((sum_from/(sum_from+sum_to))*100)).toFixed(1).replace('.',',')+"% mehr Strom an anderen Orten geliefert, als aus anderen Orte bezogent.";
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
      if(zipcode!=null) url+="?plz="+zipcode; else
      if(this.attr("data-plz")!=null) url+"?plz="+this.attr("data-plz"); else
      if(this.attr("data-zip")!=null) url+"?plz="+this.attr("data-zip");
      const parent = this;
      parent.html("<span class='text-muted'>wird geladen...</span>");
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
          document.gsi_info = data;
          $('#fortext').html("für "+data.location.city);
          let daterow="<tr><td class='small'>Datum</td>";
          let timerow="<tr><td class='small'>Zeit</td>";
          let barrow="<tr><td class='small'>Regionaler Grünstrom</td>";
          let inforow="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>Örtlicher Energiepreis</td>";

          for(var i=0;i<data.forecast.length;i++) {
              let date = new Date(data.forecast[i].timeStamp);
              if((i==0)||(date.getHours()==0)) {
                daterow+="<td class='small'>"+date.getDate()+"."+(date.getMonth()+1)+"</td>";
              } else daterow+="<td>&nbsp;</td>";
              let bgclass="bg-warning";
              if(data.forecast[i].gsi<48) bgclass="bg-secondary";
              if(data.forecast[i].gsi>52) bgclass="bg-success";
              timerow+="<td  class='"+bgclass+" small' style='text-align:right'>"+date.getHours()+":00</td>";
              barrow+="<td style='vertical-align:bottom'><div class='"+bgclass+"' title='Indexwert: "+data.forecast[i].gsi+" Punkte' style=';height:"+Math.round((data.forecast[i].gsi)*2)+"px'></div></td>";
              inforow+="<td style='text-align:right' class='"+bgclass+" small' >"+(5-(2*(data.forecast[i].gsi/100))).toFixed(2).replace('.',',')+"</td>";
          }
          daterow+="</tr>";
          timerow+="</tr>";
          barrow+="</tr>";
          inforow+="</tr>";
          if(typeof parent.attr('noinfo') != "undefined") inforow="";
          
          parent.html("<table class='table table-sm table-responsive'>"+barrow+daterow+timerow+inforow+"</table>");
          parent.attr('data-refresh',data.forecast[0].timeStamp);
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

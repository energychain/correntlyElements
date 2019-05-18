(function ( $ ) {
    $.fn.correntlyMarket=function() {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Bezeichnung</th>";
          html+="<th>Emitent</th>";
          html+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>";
          html+="<th>Benötigter Grünstrom<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th>";
          html+="</tr>";
          for(let i=0;i<data.results.length;i++) {
            html+="<tr>";
            html+="<td>"+data.results[i].title+"</td>";
            html+="<td>"+data.results[i].emitent+"</td>";
            html+="<td>"+data.results[i].decom+"</td>";
            html+="<td>"+data.results[i].cori+" kWh</td>";
            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
      });

    }
}( jQuery ));

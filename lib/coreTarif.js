(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyTarif=function(zip) {
      let parent = this;
      let q = zip;
      if(q == null) q = $.getUrlVar('p');
      if(this.attr("data-zip") != null ) q=this.attr("data-zip");
      if(this.attr("zip") != null ) q=this.attr("zip");
      if(this.attr("data-plz") != null ) q=this.attr("data-plz");
      if(this.attr("plz") != null ) q=this.attr("plz");

      $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
            let html = "<table class='table table-condensed'>";
            html+="<tr><th>Ortsteil</th><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
            for(let i=0;i<data.length;i++) {
              if(data[i].subcity.length > 0) {
              html+="<tr><td>"+data[i].subcity+"</td>";
            } else {
              html+="<tr><td>"+q+"</td>";
            }
              html+="<td>"+(data[i].ap/100).toFixed(4).replace('.',',')+"</td>";
              html+="<td>"+(data[i].gp).replace('.',',')+"</td>";
              html+="<td><a href='https://corrently.energy/stromprodukte/"+q+"/' class='btn btn-sm btn-warning'>Details</td>";
              html+="</tr>";
            }
            html+="</table>";
            parent.html(html);
      });
    }

}( jQuery ));

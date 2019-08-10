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
      if((""+q).length!=5) {
        $.getJSON("https://api.corrently.io/core/location",function(data) {
          $.getJSON("https://api.corrently.io/core/tarif?&zip="+data.zip,function(data) {
                let html = "<table class='table table-condensed'>";
                html+="<tr><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
                let i=0;
                html+="<td>"+(data[i].ap/100).toFixed(4).replace('.',',')+"</td>";
                html+="<td>"+(data[i].gp).replace('.',',')+"</td>";
                html+="<td><a href='https://corrently.energy/stromprodukte/"+q+"/index.html' class='btn btn-sm btn-warning'>Details</td>";
                html+="</tr>";
                html+="</table>";
                parent.html(html);
          });
        });
      } else {
        $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
              let html = "<table class='table table-condensed'>";
              html+="<tr><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
              let i=0;
              html+="<td>"+(data[i].ap/100).toFixed(4).replace('.',',')+"</td>";
              html+="<td>"+(data[i].gp).replace('.',',')+"</td>";
              html+="<td><a href='https://corrently.energy/stromprodukte/"+q+"/index.html' class='btn btn-sm btn-warning'>Details</td>";
              html+="</tr>";

              html+="</table>";
              parent.html(html);
        });
      }
    },
    $.fn.correntlyOriginInfo=function(origin_id) {
        $.getJSON("https://api.corrently.io/core/origin-info?origin="+origin_id,function(data) {
          $.each(data,function( index, value ) {
            if(value!=null) {
              if(index=="DATE_MODIFY") {
                let time = new Date(value).getTime();
                date = new Date(time);
                value = date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900);
                time+=(86400000*7);
                date = new Date(time);
                $('.f_DATE_VALID').val(date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900));
                time+=(86400000*600);
                date = new Date(time);
                $('.f_DATE_END').val(date.getDate()+"."+(date.getMonth()+1)+"."+(date.getYear()+1900));
              }
              if(index=="UF_CRM_1551660944277") {
                $('.f_GSI_kwh').val(Math.round(value*0.45));
              }
              if(index=="ADDRESS_POSTAL_CODE") {
                $.getJSON("https://api.corrently.io/core/tarif?plz="+value,function(data2) {
                  $('.f_ADDRESS_CITY').val(data2[0].city);
                  $('.f_UF_CRM_1551661008532').val((data2[0].ap*1).toFixed(2).replace('.',','));
                  $('.f_UF_CRM_1551661016710').val((data2[0].gp*1).toFixed(2).replace('.',','));
                });
              }
              $('.f_'+index).val(value);
            }
          });
        });
    }

}( jQuery ));

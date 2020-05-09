(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyTarif=function(zip, template) {
      let parent = this;
      let q = zip;
      if(q == null) q = $.getUrlVar('p');
      if(this.attr("data-zip") != null ) q=this.attr("data-zip");
      if(this.attr("zip") != null ) q=this.attr("zip");
      if(this.attr("data-plz") != null ) q=this.attr("data-plz");
      if(this.attr("plz") != null ) q=this.attr("plz");
      const render = function() {
        $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
              if(typeof data[0] != 'undefiend') data = data[0];
              data.eurAP = (data.ap/100).toFixed(4).replace('.',',');
              data.eurGP = (data.gp).toFixed(2).replace('.',',');
              data.q = q;

              if(template == null) {
                template = "<table class='table table-condensed'>";
                template+="<tr><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
                template+="<td>{{=it.eurAP}}</td>";
                template+="<td>{{=it.eurGP}}</td>";
                template+="<td><a href='https://www.corrently.de/?zip={{=it.q}}' class='btn btn-sm btn-warning'>Angebot</td>";
                template+="</tr>";
                template+="</table>";
              }
              const doT = $.doT();
              var tempFn = doT.template(template);
              parent.html(tempFn(data));
        });
      }
      if((""+q).length!=5) {
        $.getJSON("https://api.corrently.io/core/location",function(data) {
          q=data.zip;
          render();
        });
      } else {
          render();
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
                let kwh = value*0.45;
                let cap = kwh/30;
                let erz = cap/2;

                $('.f_GSI_kwh').val(Math.round(kwh));
                $('.f_GSI_cap').val(Math.round(cap));
                $('.f_GSI_erz').val(Math.round(erz));
                $('.f_GSI_eff').val(Math.round(value-erz));

                for(var i=0;i<3;i++) {
                    kwh=value*0.45;
                    let cap_alt = cap;
                    cap+=kwh/30;
                    erz=cap_alt+((cap-cap_alt)/2);
                    $('.s_gsi_'+i+'_kwh').html(Math.round(kwh));
                    $('.s_gsi_'+i+'_cap').html(Math.round(cap));
                    $('.s_gsi_'+i+'_erz').html(Math.round(erz));
                    $('.s_gsi_'+i+'_eff').html(Math.round(value-erz));
                }
              }
              if(index=="ADDRESS_POSTAL_CODE") {
                $.getJSON("https://api.corrently.io/core/tarif?plz="+value,function(data2) {
                  $('.f_ADDRESS_CITY').val(data2[0].city);
                  $('.f_UF_CRM_1551661008532').val((data2[0].ap*1).toFixed(2).replace('.',','));
                  $('.f_UF_CRM_1551661016710').val((data2[0].gp*1).toFixed(2).replace('.',','));
                  let abschlag = (data2[0].gp*12);
                  abschlag+=(data["UF_CRM_1551660944277"]*(data2[0].ap*0.01));
                  abschlag/=12;
                  $('.abschlag_netto').html(abschlag.toFixed(2).replace('.',','));
                });
              }
              $('.f_'+index).val(value);
              $('.t_'+index).html(value);
            }
          });
          if(typeof Tawk_API != "undefined") {
              Tawk_API.setAttributes({
                          'name'  : data.NAME+" "+data.LAST_NAME,
                          'email' : data.UF_CRM_1551661060001,
                          'hash'  : origin_id
                      }, function(error){});
          }
        });
    }

}( jQuery ));

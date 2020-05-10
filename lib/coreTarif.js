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
      if(template ==null) {
        template = '';
        template += '<div class="form-group zipAsk"><form id="frmZIP">';
        template += '<div class="input-group rounded">';
        template += '<div class="input-group-prepend"><span class="input-group-text">Postleitzahl</span></div>';
        template += '<input type="text" class="form-control" id="zipAnswer" name="zip" value="{{=it.q}}" placeholder="">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" type="button" id="btnZip">weiter</button>';
        template += '</div></div>';
        template += '</form></div>'
        template += "<table class='table table-condensed tarifInfo'>";
        template += "<tr><th>Arbeitspreis (je kWh)</th><th>Grundpreis (je Monat)</th><th>&nbsp;</th></tr>";
        template += "<td>{{=it.eurAP}} €</td>";
        template += "<td>{{=it.eurGP}} €</td>";
        template += "<td><button id='btnAngebot' class='btn btn-sm btn-warning'>Berechnung anfordern</button></td>";
        template += "</tr>";
        template += "</table>";
        template += "<div class='inputData'><form id='frmData'>";
        template += '<div class="input-group rounded">';
        template += '<div class="input-group-prepend"><span class="input-group-text">Email</span></div>';
        template += '<input class="form-control" type="email" name="fldEmail" id="fldEmail">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" type="button" id="conBtn1">weiter</button>';
        template += '</div></div>';

        template += '<div id="contJA" style="display:none">';
        template += '<div class="input-group rounded">';
        template += '<div class="input-group-prepend"><span class="input-group-text">Personen im Haushalt</span></div>';
        template += '<input class="form-control" type="number" name="pe" id="pe">';
        template += '<div class="input-group-append">';
        template += '<button class="btn btn-warning text-center" type="button" id="conBtn2">Analyse zeigen</button>';
        template += '</div></div> oder Jahresverbrauch in (Kilo-Watt-Stunden)';
        template += '</div>';
        template += "</form></div>";

        template += "<div id='chartBlock' style='display:none'>"
        template += "<h1>Arbeitspreis (in Euro Cent)</h1>";
        template += '<canvas id="myChart" width="400" height="400"></canvas>';
        template += "</div>";
      }
      const renderChart = function(data) {
        Chart.pluginService.register({
            beforeDraw: function (chart) {
              if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
              }
            }
        });

        $('#chartBlock').show();
        let innerDdata = {
            ap: data.ap*100
        }
        innerDdata.erzeugung = 5.5;
        innerDdata.transport = 2.3;
        innerDdata.verteilung = 1.53;
        innerDdata.co2 = 0.92;
        innerDdata.steuern = data.ap - innerDdata.erzeugung - innerDdata.transport - innerDdata.verteilung - innerDdata.co2;

        let innerD = {
          label: 'Kategorieen',
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)'
          ],
          data: [
            innerDdata.erzeugung,
            innerDdata.transport,
            innerDdata.verteilung,
            innerDdata.co2,
            innerDdata.steuern
          ]
        };
        let ust =  data.ap - (data.ap / 1.19);
        let ast = data.ap - (ust +  19.06);

        let outerD = {
          label: 'Bestandteile',
          data: [
            0,
            0,
            0,
            0,
            0,
            4.95, // Abschreibung
            0.55, // Betrieb
            1.7, // HS
            0.6, // MS
            1.53, // Verteilung NS
            innerDdata.co2,
            2.05, // Stromsteuer
            6.756, // EEG Umgage
            ust,
            ast
          ],
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 99, 132,0.2)',
              'rgba(255, 99, 132,0.8)',
              'rgba(54, 162, 235,0.2)',
              'rgba(54, 162, 235,0.8)',
              'rgba(255, 206, 86,0.5)',
              'rgba(75, 192, 192,0.5)',
              'rgba(153, 102, 255,0.2)',
              'rgba(153, 102, 255,0.4)',
              'rgba(153, 102, 255,0.6)',
              'rgba(153, 102, 255,0.8)'
          ]
        };

        let myChart = new Chart($('#myChart'), {
              type: 'doughnut',
              data: {
                  datasets: [
                    innerD,
                    outerD
                  ],
                  labels: ['Erzeugung', 'Transport','Verteilung','CO2 Kompensation','Steuern','Abschreibung Anlage','Fortlaufender Betrieb','Hochspannug','Mittelspannung','Niederspannung','CO2 Kompensation','Stromsteuer','EEG Umlage','Umsatzsteuer','Andere Steuern/Umlagen']
              },
              options: {
                elements: {
            				center: {
            					text: (data.ap).toFixed(2).replace('.',',') + ' Cent ',
                      color: '#006C32', // Default is #000000
                      fontStyle: 'Arial', // Default is Arial
                      sidePadding: 20 // Defualt is 20 (as a percentage)
            				}
            			}
              }
          });

      };

      const renderTarif = function() {
        $.getJSON("https://api.corrently.io/core/tarif?&zip="+q,function(data) {
              if(typeof data[0] != 'undefiend') data = data[0];
              data.eurAP = (data.ap/100).toFixed(4).replace('.',',');
              data.eurGP = (data.gp).toFixed(2).replace('.',',');
              data.q = q;
              const doT = $.doT();
              var tempFn = doT.template(template);
              parent.html(tempFn(data));

              $('#zipAnswer').val(q + " "+data.city);
              $('#zipAnswer').attr('disabled','disabled');
              $('#btnZip').hide();
              $('#frmData').hide();
              $('#contJA').hide();
              $('.tarifInfo').show();
              $('#btnAngebot').click(function() {
                    $('#btnAngebot').attr('disabled','disabled');
                    $('#frmData').show();
                    renderChart(data);
                    const cont1 = function() {
                      if(($('#fldEmail').val().length < 5) || ($('#fldEmail').val().indexOf('@')<0) || ($('#fldEmail').val().indexOf('.')<2)) {
                        $('#fldEmail').addClass('bg-danger');
                      } else {
                        $('#fldEmail').removeClass('bg-danger');
                        $('#conBtn1').attr('disabled','disabled');
                        $('#fldEmail').attr('disabled','disabled');
                        $('#contJA').show();
                        $('#conBtn1').hide();
                        const cont2 = function() {
                            if($('#pe').val()<0) {
                              $('#pe').addClass('bg-danger');
                            } else {
                              $('#pe').removeClass('bg-danger');
                              $('#conBtn2').attr('disabled','disabled');
                              $('#pe').attr('disabled','disabled');
                              $('#conBtn2').hide();
                            }
                            return false;
                        }
                        $('#conBtn2').click( cont2 );
                        $('#pe').keypress(function(event){
                            var keycode = (event.keyCode ? event.keyCode : event.which);
                            if(keycode == '13'){
                                cont2();
                            }
                        });
                      }
                      return false;
                    };
                    $('#conBtn1').click( cont1 );
                    $('#fldEmail').keypress(function(event){
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if(keycode == '13'){
                            cont1();
                        }
                    });
                    $('#frmData').submit( cont1 );
                    $('#btnAngebot').hide();

              });
        });
      }
      if((""+q).length!=5) {
        $.getJSON("https://api.corrently.io/core/location",function(data) {
          data.q=data.zip;

          const doT = $.doT();
          var tempFn = doT.template(template);
          parent.html(tempFn(data));

          $('.tarifInfo').hide();
          $('#frmData').hide();
          $('.zipAsk').show();
          const submit = function() {
            $('#btnZip').attr('disabled','disabled');
            q = $('#zipAnswer').val();
            renderTarif();
            return false;
          }
          $('#btnZip').click(submit);
          $('#frmZIP').submit(submit);
        });
      } else {
          renderTarif();
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
if(typeof Chart == 'undefined') {
  document.write('<script src="https://elements.corrently.io/assets/js/Chart.bundle.min.js"></script>');
}

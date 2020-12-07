(function ( $ ) {
    $.fn.correntlyMarket=function() {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Bezeichnung</th>";
          html+="<th>Emittent</th>";
          html+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>";
          html+="<th colspan='2'>GrünstromBonus<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th><th>&nbsp;</th>";
          html+="</tr>";
          for(let i=0;i<data.results.length;i++) {
            html+="<tr>";
            html+="<td>"+data.results[i].title+"</td>";
            html+="<td>"+data.results[i].emitent+"</td>";
            html+="<td>"+data.results[i].decom+"</td>";
            html+="<td>"+data.results[i].cori+" kWh</td>";
            // html+="<td>"+(data.results[i].cori*0.02).toFixed(2).replace('.',',')+" €</td>";
            html+="<td><a href='./board.html?asset="+data.results[i].asset+"&update=true' class='btn btn-sm btn-success'>Auswahl</a></td>";
            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
      });
    },
    $.fn.correntlyBoard=function(a) {
      const parent = this;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");
      let q=null;
      if($.getUrlVar('c')!=null) q = $.getUrlVar('c');
      if($.getUrlVar('asset')!=null) a = $.getUrlVar('asset');

      if(q==null) {
        q=window.localStorage.getItem("account");
        if(q!=null) {
          $.getJSON("https://api.corrently.io/core/commissioning?account="+q, function(data) {
            for(let i=0;i<data.length;i++) {
              if(data[i].product=="0x8dd8eddF4f8133f468867c551C17ad7324B411C6") {
                location.href="./board.html?c="+data[i].quitance+"&asset="+a+"&o="+data[i].order;
              }
            }
          });
        }
        else {
          console.log("Q is null");
          //a="0x41b7931ea8f072DcC77f1F682CD5A1273FF7DBE6";
        };
      }



      $.getJSON("https://api.corrently.io/core/depot?account="+q,function(data) {
          let selectable_fields=0;
          let existing_ownership=0;
          if(typeof data.assets != "undefined") {
            for(let i=0;i<data.assets.length;i++) {
              if(data.assets[i].account==a) {
                selectable_fields=data.assets[i].shares*1;
                existing_ownership=selectable_fields;
              }
            }
          }

          $.getJSON("https://api.corrently.io/core/stromkonto?account="+q,function(data) {
            let balance_eur = data.result.balance_eur;
              $.getJSON("https://api.corrently.io/core/market",function(data) {
                  let html="";
                  let cnt_sel=0;
                  for(let i=0;i<data.results.length;i++) {
                    if(data.results[i].asset==a) {
                      $('#asset_title').html(data.results[i].title);
                      let fields = data.results[i].totalSupply;
                      let l=0;
                      html+="<div class='row'><div class='col-md-9'><div style='width:750px;float:none'>";
                      for(let j=0;j<data.results[i].allocations.length;j++) {
                        if(data.results[i].allocations[j]=="0x0000000000000000000000000000000000000000") {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"'></div>";
                        } else if(data.results[i].allocations[j]==q) {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"' selected='selected' style='background-color:black'></div>";
                          cnt_sel++;
                        } else {
                          html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+" von "+data.results[i].allocations[j]+"' owned='true' style='background-color:yellow'></div>";
                        }
                      }
                      html+="</div>";
                      html+="</div>";
                      if(balance_kwh>data.results[i].cori) {
                        selectable_fields+=Math.floor(balance_kwh/(data.results[i].cori));
                      }
                    }
                  }

                  html+="<div class='col-md-3'>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:black;width:20px;height:20px;'></div>&nbsp;Ausgewählt"
                  html+="</div>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:#c6c6c6;width:20px;height:20px;'></div>&nbsp;Verfügbar"
                  html+="</div>";
                  html+="<div class='row'>";
                  html+="<div class='field' style='background-color:yellow;width:20px;height:20px;'></div>&nbsp;Vergeben"
                  html+="</div>";
                  html+="</div>";
                  html+="</div>";
                  html+="<button class='btn btn-success btn-lg' style='margin:5px;' id='applySelection'>übernehmen</button>";
                  parent.html(html);
                  $('#applySelection').click(function() {
                    $('#applySelection').attr('disabled','disabled');
                    $('#applySelection').removeClass('btn-success');

                    console.log("- preparing Transaction");
                    let selected = $('div[selected="selected"]');
                    let allocation=[];
                    for(let i=0;i<selected.length;i++) {
                        allocation.push($(selected[i]).attr('id').substr(5));
                    }
                    let nmb=cnt_sel-existing_ownership;
                    if(nmb<0) nmb=0;

                    let query="";

                    query+="&account="+q;
                    query+="&asset="+a;
                    query+="&amount="+nmb;
                    query+="&allocations="+allocation.join(',');
                    if($.getUrlVar('o')!=null) query += "&o="+$.getUrlVar('o');

                    $.getJSON("https://api.corrently.io/core/transaction?"+query,function(data) {
                          html="";
                          html="<h3>Bitte Email Posteingang prüfen</h3>";
                          $('#board_card').html(html);
                    });
                  });

                  const updateSelStats = function() {
                    $('#selected_fields').html(cnt_sel);
                    $('#selectable_fields').html(selectable_fields);
                    $('#remain_fields').html(selectable_fields-cnt_sel);
                  }

                  $('.field').click(function(el) {
                      if(!$(el.currentTarget).attr('owned')) {
                        if($(el.currentTarget).attr('selected')) {
                          $(el.currentTarget).css("background-color", "#c0c0c0");
                          $(el.currentTarget).removeAttr('selected');
                          cnt_sel--;
                        } else {
                          if(cnt_sel<selectable_fields) {
                            $(el.currentTarget).css("background-color", "black");
                            $(el.currentTarget).attr('selected','selected');
                            cnt_sel++;
                          }
                        }
                      }
                      updateSelStats();
                  });
                  updateSelStats();
              });// Asset
            }); // Balance SKO
        }); // Existing Depot
    },
    $.fn.correntlyCommisioning=function(account) {
      const parent = this;
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x4D530cc530bCE8c84E2271528eA10D6480cbDACE";

      $.getJSON("https://api.corrently.io/core/commissioning?account="+q,function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Produkt</th>";
          html+="<th>Backoffice Vertrag</th>";
          html+="<th>Eingang</th>";
          html+="<th>Lieferung</th>";
          html+="</tr>";

          for(let i=0;i<data.length;i++) {
            html+="<tr>";
            html+="<td title='"+data[i].product+"'><a href='./contracts.html?a="+data[i].product+"' class='pLabel_"+data[i].product+"'>"+data[i].product+"</a></td>";
            html+="<td><a href='./contracts.html?a="+data[i].quitance+"'>"+data[i].quitance+"</a></td>";
            html+="<td>"+new Date(data[i].commissioning*1).toLocaleString()+"</td>";
            html+="<td title='"+data[i].delivery+"'>"+new Date(data[i].delivered*1).toLocaleString()+"</td>";
            if(data[i].product=="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22") {
                window.ce_meter = data[i].quitance;
                html+="<td><a href='./reading.html?a="+data[i].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"
            } else if(data[i].product=="0x8dd8eddF4f8133f468867c551C17ad7324B411C6") {
                window.ce_sko = data[i].quitance;
                html+="<td><a href='./stromkonto.html?a="+data[i].quitance+"' class='btn btn-sm btn-secondary'>#</a></td>"
            } else {
              html+="<td></td>";
            }

            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
          for(let i=0;i<data.length;i++) {
              $.getJSON("https://api.corrently.io/core/contract?account="+data[i].product,function(data2) {
                $(".pLabel_"+data2.account).html(data2.name);
              });
          }
      });
    }
    $.fn.correntlyContract=function(account) {
      const parent = this;
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0xcf74487007Ed9eD579b2eb5498cb719d46bb9Ab4";

      $.getJSON("https://api.corrently.io/core/contract?account="+q,function(data) {
          if(data.type == "dealitem") data.type="Digitales Asset";
          if(data.type == "product") data.type="Produkt/Vertrag";
          let html="";
          html+= "<h2>"+data.name+"</h2> <span class='text-muted'>("+data.type+")</span>";
          html+= "<p>"+data.description+"</p>";
          parent.html(html);
      });
    }
}( jQuery ));

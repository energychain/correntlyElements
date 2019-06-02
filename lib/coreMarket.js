(function ( $ ) {
    $.fn.correntlyMarket=function() {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="<table class='table table-condensed'>";
          html+="<tr>";
          html+="<th>Bezeichnung</th>";
          html+="<th>Emitent</th>";
          html+="<th>Erzeugung bis<br/><span class='text-muted'>Vertrag gültig bis mindestens</span></th>";
          html+="<th colspan='2'>GrünstromBonus<br/><span class='text-muted'>für die Erzeugung von 1 kWh/Jahr</span></th>";
          html+="</tr>";
          for(let i=0;i<data.results.length;i++) {
            html+="<tr>";
            html+="<td>"+data.results[i].title+"</td>";
            html+="<td>"+data.results[i].emitent+"</td>";
            html+="<td>"+data.results[i].decom+"</td>";
            html+="<td>"+data.results[i].cori+" kWh</td>";
            html+="<td>"+(data.results[i].cori*0.02).toFixed(2).replace('.',',')+" €</td>";
            html+="</tr>";
          }
          html+"</table>";
          parent.html(html);
      });
    },
    $.fn.correntlyBoard=function(a) {
      const parent = this;

      $.getJSON("https://api.corrently.io/core/market",function(data) {
          let html="";
          for(let i=0;i<data.results.length;i++) {
            if(data.results[i].asset==a) {
              $('#asset_title').html(data.results[i].title);
              let fields = data.results[i].totalSupply;
              let l=0;
              html+="<div style='width:750px'>";
              for(let j=0;j<fields;j++) {
                html+="<div class='field' id='cell_"+j+"' title='Zelle "+j+"'></div>";
              }
              html+="</div>";
            }
          }
          parent.html(html);
          let cnt_sel=0;
          $('.field').click(function(el) {
              if($(el.currentTarget).attr('selected')) {
                $(el.currentTarget).css("background-color", "#c0c0c0");
                $(el.currentTarget).removeAttr('selected');
                cnt_sel--;
              } else {
                $(el.currentTarget).css("background-color", "red");
                $(el.currentTarget).attr('selected','selected');
                cnt_sel++;
              }
              $('#selected_fields').html(cnt_sel);
          });
      });
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

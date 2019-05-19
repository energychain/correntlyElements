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
          html+="<th>Digitales Asset</th>";
          html+="<th>Eingang</th>";
          html+="<th>Lieferung</th>";
          html+="</tr>";

          for(let i=0;i<data.length;i++) {
            html+="<tr>";
            html+="<td><a href='./contracts.html?a="+data[i].product+"' class='pLabel_"+data[i].product+"'>"+data[i].product+"</a></td>";
            html+="<td><a href='./contracts.html?a="+data[i].quitance+"'>"+data[i].quitance+"</a></td>";
            html+="<td>"+new Date(data[i].commissioning*1).toLocaleString()+"</td>";
            html+="<td>"+new Date(data[i].delivered*1).toLocaleString()+"</td>";
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

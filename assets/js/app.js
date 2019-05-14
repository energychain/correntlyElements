$(document).ready(function() {
    var q = $.getUrlVar('q');
    let url="https://api.corrently.io/core/gsi"
    if((q!=null)&&(q.length==5)) {
        url += "?plz="+q;
    } else {
      if($('#gsi_card').attr('data-plz')!=null) {
        url += "?plz="+$('#gsi_card').attr('data-plz');
      }
    }
    const refreshGSI = function() {
      if($('#gsi_card').attr('data-refresh')!=null) {
        if($('#gsi_card').attr('data-refresh')>new Date().getTime()) {
          return;
        }
      }
      $.getJSON(url,function(data) {
        $('#fortext').html("für "+data.location.city);
        let daterow="<tr><td class='small'>Datum</td>";
        let timerow="<tr><td class='small'>Zeit</td>";
        let barrow="<tr><td class='small'>Preisniveau</td>";
        let inforow="<tr><td title='Anteil der Erzeugungskosten am Arbeitspreis' class='small'>örtlicher&nbsp;Energiepreis</td>";

        for(var i=0;i<data.forecast.length;i++) {
            let date = new Date(data.forecast[i].timeStamp);
            if((i==0)||(date.getHours()==0)) {
              daterow+="<td class='small'>"+date.getDate()+"."+(date.getMonth()+1)+"</td>";
            } else daterow+="<td>&nbsp;</td>";
            let bgclass="bg-warning";
            if(data.forecast[i].gsi<48) bgclass="bg-secondary";
            if(data.forecast[i].gsi>52) bgclass="bg-success";
            timerow+="<td  class='"+bgclass+" small' style='text-align:right'>"+date.getHours()+":00</td>";
            barrow+="<td style='vertical-align:bottom'><div class='"+bgclass+"' style=';height:"+Math.round((100-data.forecast[i].gsi)*2)+"px'></div></td>";
            inforow+="<td style='text-align:right' class='"+bgclass+" small' >"+(5-(2*(data.forecast[i].gsi/100))).toFixed(2).replace('.',',')+"</td>";
        }
        daterow+="</tr>";
        timerow+="</tr>";
        barrow+="</tr>";
        inforow+="</tr>";
        let btnrow="<p class='text-center'><a class='btn btn-lg btn-success' href='https://corrently.energy/stromprodukte/"+data.location.zip+"/'>Stromprodukt</a>";
        btnrow+="</p>";
        $('#gsi_card').html("<table class='table table-sm table-responsive'>"+barrow+daterow+timerow+inforow+"</table>"+btnrow);
        $('#gsi_card').attr('data-refresh',data.forecast[0].timeStamp);
      });
    }
    refreshGSI();
    setInterval(refreshGSI,60000);
});

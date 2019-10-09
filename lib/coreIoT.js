(function ( $ ) {
  $.fn.correntlyIoT=function(account) {
    let q = account;
    if(this.attr("data-account") != null ) q=this.attr("data-account");
    if(this.attr("account") != null ) q=this.attr("account");

    if(q == null) {
      if((typeof  $.getUrlVar('a') != "undefined ")&&(q == null)) q = $.getUrlVar('a');
      if(q == null) q="0x036b01A93E6a920aeE77f577C60Dec8E7D22Bf5d";
    }
    const parent = this;
    let html  = "-";
    parent.html(html);

    const refreshReading = function() {
        $.getJSON("https://api.corrently.io/core/iot?account="+q,function(data) {
            parent.html(data.result.value);
            parent.attr('title',"Aktualisierung:"+new Date(data.result.timeStamp).toLocaleString());
        });
    }

    refreshReading();
    setInterval(refreshReading,60000);
  }
}( jQuery ));

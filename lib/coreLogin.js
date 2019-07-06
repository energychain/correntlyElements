(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyLogin=function() {
      let html="";
      html+='<form id="loginfrm" method="get" action="https://api.corrently.io/token/login">';
      html+='<input type="hidden" name="deliverable" value="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22">';
      html+='<input type="hidden" name="target" value="'+location.href+'">';
      html+='<div class="alert alert-success" role="alert" id="login_ok" style="display:none"><span><strong>Mail versendet.</strong> Bitte das Email Postfach prüfen, dort sollte bereits Mail mit dem Anmeldelink eingegangen sein.</span></div>';
      html+='<div class="alert alert-danger" role="alert" id="login_fail" style="display:none"><span><strong>Fehler!</strong>&nbsp;Der Versand hat leider nicht geklappt. Bitte noch einmal probieren und unseren Service kontaktieren.</span></div><label>Ihre Email:</label><input class="form-control" type="email" placeholder="name@domain.de" name="mail">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton" type="submit">Zugang per Mail anfordern&nbsp;</button></p>';
      html+='</form>';
      let parent = this;
      parent.html(html);
      $('#loginfrm').ajaxForm(function(dl) {
          $('#submitbutton').removeAttr('disabled');
           console.log(dl);
          if(dl.err==null) {
              $('#login_ok').show();
              $('#login_fail').hide();
          } else {
              $('#login_ok').hide();
              $('#login_fail').show();
          }
      });
    },
    $.fn.correntlyMsb=function(account) {
      let q = account;
      if(this.attr("data-account") != null ) q=this.attr("data-account");
      if(this.attr("account") != null ) q=this.attr("account");

      if(q == null) q = $.getUrlVar('a');
      if(q == null) q="0x26D53FC47581E8F9f94Eadf71eFd7F57C931b9D9";

      const parent = this;
      $.getJSON("https://api.corrently.io/core/msb?account="+q,function(data) {
        console.log(data);
        let html ="<iframe src='"+data.token+"' class='embed-responsive' height='800'></iframe>";
        parent.html(html);
      });
    }

}( jQuery ));

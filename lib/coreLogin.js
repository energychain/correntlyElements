$.extend({
  correntlyQLogout:function() {
    window.localStorage.removeItem("ce_qcode");
    location.href=location.pathname;
  }
});

(function ( $ ) {
  /**
   * Ausgabe der Zählerstände eines Corrently Account als  HTML Tabelle
   */
    $.fn.correntlyLogin=function(failcb) {
      let html="";
      html+='<form id="loginfrm" method="get" action="https://api.corrently.io/token/login">';
      html+='<input type="hidden" name="deliverable" value="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22">';
      html+='<input type="hidden" name="target" value="'+location.href+'">';
      html+='<div class="alert alert-success" role="alert" id="login_ok" style="display:none"><span><strong>Mail versendet.</strong> Bitte das Email Postfach prüfen, dort sollte bereits eine Mail mit dem Anmeldelink eingegangen sein.</span></div>';
      html+='<div class="alert alert-danger" role="alert" id="login_fail" style="display:none"><span><strong>Fehler!</strong>&nbsp;Der Versand hat leider nicht geklappt. Bitte noch einmal probieren und unseren Service kontaktieren.</span></div><label>Anmeldung per Email</label><input class="form-control" type="email" placeholder="name@domain.de" name="mail">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton" type="submit">Zugang per Mail anfordern&nbsp;</button></p>';
      html+='</form>';
      let parent = this;
      parent.html(html);
      $('#loginfrm').ajaxForm(function(dl) {
            $('#submitbutton').removeAttr('disabled');
          if(dl.err==null) {
            if(typeof cb_login_ok != "undefined") {
              cb_login_ok();
            } else {
              $('#login_ok').show();
              $('#login_fail').hide();
            }
          } else {
            if(typeof cb_login_fail != "undefined") {
              cb_login_fail();
            } else {
              $('#login_ok').hide();
              $('#login_fail').show();
              if(typeof failcb == 'function') {
                failcb();
              }
            }
          }
      });
    },
    $.fn.correntlyQLogin=function() {
      const trylogin = function(q) {
        $.getJSON("https://api.corrently.io/core/qcode?qcode="+q,function(data) {
          if(typeof data.account != "undefined") {
            window.localStorage.setItem("ce_qcode",q);
            location.href="?a="+data.account;
          } else {
            window.localStorage.removeItem("ce_qcode");
          }
      });
      }

      let html="";
      let qcodevalue = "";
      if(typeof $.getUrlVar("qcode") != "undefined") {
          qcodevalue=$.getUrlVar("qcode");
      }
      if(window.localStorage.getItem("ce_qcode")!=null)  {
          trylogin(window.localStorage.getItem("ce_qcode"));
      }
      html+='<form id="loginfrm" method="get" action="https://api.corrently.io/token/login">';
      html+='<input type="hidden" name="deliverable" value="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22">';
      html+='<input type="hidden" name="target" value="'+location.href+'">';
      html+='<div class="alert alert-success" role="alert" id="login_ok" style="display:none"><span><strong>Mail versendet.</strong> Bitte das Email Postfach prüfen, dort sollte bereits eine Mail mit dem Anmeldelink eingegangen sein.</span></div>';
      html+='<div class="alert alert-danger" role="alert" id="login_fail" style="display:none"><span><strong>Fehler!</strong>&nbsp;Der Versand hat leider nicht geklappt. Bitte noch einmal probieren und unseren Service kontaktieren.</span></div>';
      html+='<label>Anmeldung per Email</label><input class="form-control" type="email" placeholder="name@domain.de" name="mail">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton" type="submit">Zugang per Mail anfordern&nbsp;</button></p>';
      html+='<label>oder Verknüpfungscode verwenden</label><input class="form-control" type="text" placeholder="(123ABC)" value="'+qcodevalue+'" name="qcode" id="qcode">';
      html+='<p class="text-center" style="margin-top: 15px;"><button class="btn btn-warning" id="submitbutton2" type="button">verknüpfen</button></p>';
      html+='</form>';
      let parent = this;
      parent.html(html);
      $('#submitbutton2').click(function() {
          trylogin($('#qcode').val());
      });
      $('#loginfrm').ajaxForm(function(dl) {
          $('#submitbutton').removeAttr('disabled');
          if(dl.err==null) {
            if(typeof cb_login_ok != "undefined") {
              cb_login_ok();
            } else {
              $('#login_ok').show();
              $('#login_fail').hide();
            }
          } else {
            if(typeof cb_login_fail != "undefined") {
              cb_login_fail();
            } else {
              $('#login_ok').hide();
              $('#login_fail').show();
            }
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

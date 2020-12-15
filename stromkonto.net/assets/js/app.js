$(document).ready( function() {   
console.log("-------------------------------------");
console.log("* Schön, Dich hier zu sehen!        *");
console.log("* Schau doch mal auf GitHub vorbei: *");
console.log("* https://github.com/energychain    *");
console.log("-------------------------------------");
  if($.getUrlVar("logout")!=null) {
   window.localStorage.clear();   
   location.href="?c=reset";
  }
  if($.getUrlVar("t")!=null) {
   $.getJSON("https://api.corrently.io/core/post-transaction?t="+$.getUrlVar("t"),function(data) {
       console.log(data);
       location.href="/";
   })
  }
  if($('#board_card').length==1) {
    $('#board_card').correntlyBoard();
    return;
  }
  if($.getUrlVar("c")!=null) { 
      window.localStorage.setItem("charge",$.getUrlVar("c"));
  }
  if($.getUrlVar("a") != null) {
      $('#app_container').show();
      $('#login_container').hide();
     let a=$.getUrlVar("a");
     window.localStorage.setItem("account",a);
     $.getJSON("https://api.corrently.io/core/commissioning?account="+a, function(data) {
        for(let i=0;i<data.length;i++) {
          if(data[i].product=="0x59E45255CC3F33e912A0f2D7Cc36Faf4B09e7e22") {
            window.ce_meter = data[i].delivery;
          };
          if(data[i].product=="0x8dd8eddF4f8133f468867c551C17ad7324B411C6") {
            window.ce_sko = data[i].quitance;
          };
          if((typeof data[i].location != "undefined")&&(data[i].location.length == 5)) {
              window.ce_zip = data[i].location;
          }
        }
        if((typeof data.status != "undefined")&&(data.status=="trial")) {
            $('#no_tarif').show();
        }
        if(typeof window.ce_sko != "undefined") {
            $('#stromkonto_overview').correntlySKOBalance(window.ce_sko,function() {
                $('#app_container').hide();
                $('#login_container').show();      
            });
            $('#baumkonto_overview').correntlyTreeBalance(window.ce_sko,function(){});
            $('#deport_overview').correntlySKODepot(window.ce_sko);
            $('#txs').correntlySKOTxs(window.ce_sko);
        }
        if(typeof window.ce_meter != "undefined") {
            $('.usageKwh').attr("data-account",window.ce_meter);
            $('.greenKwh').attr("data-account",window.ce_meter);
            $('.greyKwh').attr("data-account",window.ce_meter);
            $('.totalReading').attr("data-account",window.ce_meter);
            $('.greenReading').attr("data-account",window.ce_meter);
            $('.greyReading').attr("data-account",window.ce_meter);
            $('.timeReading').attr("data-account",window.ce_meter);
            
            $('#usageChart').correntlyReadingChart(window.ce_meter);
            $('#donutChart').correntlyReadingChart(window.ce_meter);
            $('#lastReadingTable').correntlyReadingTable(window.ce_meter);
        } else {
            $('#has_meter').hide();
            $('#no_meter').show();
        }
        if(typeof window.ce_zip != "undefined") {
            $('#gsi_vorhersage').correntlyGSI(window.ce_zip);
            $('#woher').html("<a href='https://gruenstromindex.de/map.html?q="+window.ce_zip+"' target='_blank'>Woher kommt physikalisch mein Grünstrom?</a>");
        } else {
            $('#gsi_vorhersage').correntlyGSI();
            console.log("Requires Location Info!");
        }
        $('#market').correntlyMarket();
         $('#checkout').click(function() {
             var stripe = Stripe('pk_live_rWnhwGfKnwm2aMYyQ50SbZrl');
             // sku_FQZybsDwBe9S8C // Test
             // sku_FPdNXJvUGdZ1hi //Prod
            // var stripe = Stripe('pk_test_d8Bn8YKm7Hgyj4mV7DwhMRmr');
             stripe.redirectToCheckout({
              items: [
                // Replace with the ID of your SKU
                {sku: 'sku_FPdNXJvUGdZ1hi', quantity: 1}
              ],
              successUrl: 'https://www.stromkonto.net/?res=success&a='+window.ce_sko,
              cancelUrl: 'https://www.stromkonto.net/?res=cancled',
              clientReferenceId: window.ce_sko
            }).then(function (result) {
            });
         })
         if(window.localStorage.getItem("charge") != null) {
             let c = window.localStorage.getItem("charge");
             $.getJSON("https://api.corrently.io/core/charge?token="+c+"&account="+window.ce_sko,function(t) {
                location.reload();
             });
             window.localStorage.removeItem("charge");
         }
     });        
  } else {
     // Handling of the Login Form
      $('#app_container').hide();
      $('#login_container').show();      
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
      let account = window.localStorage.getItem("account");
      if(account != null) {
           if((window.location.pathname == '/')||(window.location.pathname == '/index.html')) {
                location.href="?a="+account;
           }          
      }
      $('#submitbutton').click(function() {
          $('#submitbutton').attr('disabled','disabled');
          $('#loginfrm').submit();
      });
  }
});
const scrollTarget = function(target_id) {
     var target = $("#"+target_id);
     $('.fscreen').hide();
     target.show();
     $('html').animate({ scrollTop: target.offset().top }, 50,'',function() {
         location.href="#"+target_id;
     });
     return false;
}

setTimeout(function() {
    $('footer').show();
    //$('#row3').hide();
},1500);
document.ce_psel = 0;
$(document).ready(function() {
    scrollTarget("hpsel");
    $('#row1').show();
    $('.isel').click(function(nl) {
        let p=$(nl.currentTarget).attr('data');
        if(p == 1) $('#ja_sel').val(1200);
        if(p == 2) $('#ja_sel').val(2100);
        if(p == 3) $('#ja_sel').val(3000);
        if(p == 4) $('#ja_sel').val(3600);
        showTarif();
    })
    $('.psel').click(function(nl) {
        scrollTarget("row2");
        $('#footer1').hide();
        $('#footer2').show();
        let p=$(nl.currentTarget).attr('data');
        if(p == 1) $('#ja_sel').val(1200);
        if(p == 2) $('#ja_sel').val(2100);
        if(p == 3) $('#ja_sel').val(3000);
        if(p == 4) $('#ja_sel').val(3600);
        document.ce_psel=p;
        gtag('event', 'personen',{ 'event_category' : 'interact','event_label':document.ce_psel});
        $('.rsel').hide();
    })

     $.getJSON("https://api.corrently.io/core/location",function(data) {
         $('#zipcode').val(data.zip);
         $('#dPLZ').val(data.zip);
         let html="<a href='https://gruenstromindex.de/?q="+data.zip+"' target='_blank' class='btn btn-secondary btn-sm'>von "+data.city+"</a>";
         $('#cityname').html(html);
         $('#LAST_NAME').val(data.city);
         gtag('event', 'tarif',{ 'event_category' : 'auto','event_label':data.zip});
         $('#row3').show();
         showTarif();
     });
})
$('#iForm').ajaxForm(function(nl) {
  gtag('event', 'purchase', {
     "transaction_id": ""+new Date().getTime(),
     "affiliation": "stromtarif.shop",
     "value": ((document.ce_gp*12)+($('#ja_sel').val()*(document.ce_ap/100))).toFixed(2),
     "currency": "EUR",
     "tax": 0,
     "shipping": 0,
     "items": [
       {
         "id": "CFCH0_AP",
         "name": "Corrently Arbeitspreis",
         "list_name": "Corrently",
         "brand": "STROMDAO",
         "category": "Strom/Privat",
         "variant": "Personen Haus",
         "list_position": 1,
         "quantity": $('#ja_sel').val(),
         "price": ($('#ja_sel').val()*(document.ce_ap)/100).toFixed(2)
       },
       {
         "id": "CFCH0_GP",
         "name": "Corrently Grundpreis",
        "list_name": "Corrently",
         "brand": "STROMDAO",
         "category": "Strom/Privat",
         "variant": "Personen Haus",
         "list_position": 2,
         "quantity": 1,
         "price": (document.ce_gp*12)
       }
     ]
   }); 
   console.log("=> Thanks");
});
 const showTarif = function() {
        $('#dPLZ').val($('#zipcode').val());
         $.getJSON("https://api.corrently.io/core/tarif?plz="+$('#zipcode').val(),function(data) {            $('#dCity').html(data[0].city);
          $('#row3').show();
            document.ce_ap = data[0].ap*1;
            document.ce_gp = data[0].gp*1;
            $('#ap').val(document.ce_ap);
            $('#gp').val(document.ce_gp);
            $('#mdetail_ap').html((data[0].ap*(1)).toFixed(2).replace('.',',')+" Cent/kWh");
            $('#mdetail_gp').html((data[0].gp*(1)).toFixed(2).replace('.',',')+" €/Monat");
            $('.mprice').html( "monatlich "+(((($('#ja_sel').val()*document.ce_ap)/12)/100)+document.ce_gp).toFixed(2).replace('.',',')+" €");
            // ja_sel based Grey Out
            if($('#ja_sel').val()<1800) {
                $('#i1').css('filter','grayscale(0%)');
                $('#i2').css('filter','grayscale(100%)');
                $('#i3').css('filter','grayscale(100%)');
                $('#i4').css('filter','grayscale(100%)');
            }
            if($('#ja_sel').val()>1800) {
                $('#i1').css('filter','grayscale(100%)');
                $('#i2').css('filter','grayscale(0%)');
                $('#i3').css('filter','grayscale(100%)');
                $('#i4').css('filter','grayscale(100%)');
            }
            if($('#ja_sel').val()>2600) {
                $('#i1').css('filter','grayscale(100%)');
                $('#i2').css('filter','grayscale(100%)');
                $('#i3').css('filter','grayscale(0%)');
                $('#i4').css('filter','grayscale(100%)');
            }
            if($('#ja_sel').val()>3300) {
                $('#i1').css('filter','grayscale(100%)');
                $('#i2').css('filter','grayscale(100%)');
                $('#i3').css('filter','grayscale(100%)');
                $('#i4').css('filter','grayscale(0%)');
            }

            $('#umlagen_steuern').html((data[0].ap*(1)-5.5).toFixed(2).replace('.',',')+" ");
             $('#frm3').on('submit',function(x) {
                 $('#UF_CRM_1551660944277').val($('#ja_sel').val());
                 $('#UF_CRM_1551661060001').val($('#email').val());
                 $('#memail').val($('#email').val());
                 $('#ADDRESS_POSTAL_CODE').val($('#zipcode').val());
                  if($('#memail').val().length>3) {
                    $('#iForm').submit();
                    setTimeout(function() {
                         location.href="https://stromtarif.shop/thanks.html";
                    },5000);
                } else {
                    $('#email2').focus();
                    $('#email2').css('background-color','yellow');
                }
                 return false;
              });
         });
        gtag('event', 'select_content', {
      "content_type": "product",
      "items": [
        {
          "id": "CFCH0",
          "name": "Corrently Stromtarif",
          "list_name": "Corrently",
          "brand": "STROMDAO",
          "category": "Strom/Privat",
          "variant": "Personen Haus",
          "list_position": 1,
          "quantity": document.ce_psel,
          "price": Math.round(document.ce_gp*12)
        }
      ]
    });
      }

$('#sndbtn').click(function(x) {
    $('#sndbtn').attr('disabled','disabled');
    $('#UF_CRM_1551661060001').val($('#email2').val());
    $('#ADDRESS_POSTAL_CODE').val($('#zipcode').val());
    $('#memail').val($('#email2').val());
    if($('#memail').val().length>3) {
        $('#iForm').submit();
        setTimeout(function() {
             location.href="https://stromtarif.shop/thanks.html";
        },5000);
    } else {
        $('#sndbtn').removeAttr('disabled');
        $('#email2').focus();
        $('#email2').css('background-color','yellow');
    }
})
$('#dPLZ').keyup(function(x) {

    if((""+$('#dPLZ').val()).length==5) {
      $('#zipcode').val($('#dPLZ').val());
      $('#frm2').submit();
        showTarif();
    }
});
$('#frm2').on('submit',function(x) {

    showTarif();
    $('#footer2').hide();
    $('#footer3').show();
    $('#row33').show();
    $('#ja_sel').change(showTarif);
    scrollTarget("row33");
    return false;
});
$('#btn_eigen1').click(function() {
    $('#eigen1').modal("hide");
    $('#eigen2').modal("show");
})
$('#btn_eigen2').click(function() {
    $('#eigen2').modal("hide");
    $('#eigen3').modal("show");
})
$('.m1').click(function() {
    $('#eigen1').modal("show");
});
$('.m2').click(function() {
    $('#bonus1').modal("show");
});
$('.m3').click(function() {
    $('#kuendigung1').modal("show");
});
$('.m4').click(function() {
    $('#ap1').modal("show");
});
$('.m5').click(function() {
    $('#zertifikat1').modal("show");
});

// GLOBAL VARIABLES
var ptsG = 0;
var PenalitesG = 0;
var PenalitesD = 0;
var ptsD = 0;
var matchTimeMin = 45;
var matchTimeSec = 0;
var compteurMatch;
var compteurImpro;
var pausing = false;
var improTimeMin = 5;
var improTimeSec = 0;
var timerImproPlaying = false;
var timerMatchPlaying = false;
var caucus;
var caucusTime = 20;

var theme = [];
var currentTheme=0;

//DOM READY
$(function() {

// si trois pénalités +1 points pour l'autre
// btn huez l'arbitre

  // GESTION DES THEMES PRE-CHARGES
  $('.theme_load').click(function(){
    if( !$(this).hasClass('active') ){
      var currentLoadTheme = $(this).prev().attr('dataNumber');
      //console.log(currentLoadTheme+ " loaded");
      //console.log( $(this).prev().val() );
      $(this).addClass('active');
      theme[currentLoadTheme]= $(this).prev().val();
      console.log(theme);
      //stockage
      localStorage.setItem("Themes", theme );
      console.log(localStorage);
    }
    else{
      console.log('already loaded');
    }
  });
  $('.theme_send').click(function(){
    if( !$(this).hasClass('active') ){
      $(this).addClass('active');
      currentTheme = $(this).prev().prev().attr('dataNumber');
      console.log("current theme : "+currentTheme);
      $('#theme').val( theme[currentTheme] );
      $('#buttons_holder').children().removeClass('active');
      //stockage
      localStorage.setItem("currentTheme", currentTheme );
      localStorage.setItem("PourAfficher", theme[currentTheme] );
      console.log(localStorage);
    }
    else{
      console.log('already sended');
    }
  });

  // LOCAL STORAGE
  console.log(localStorage);

  // NAME TEAM G
  $("#team_name_g").on("keyup", function() {
    // local storage garde en mémoire des infos
    localStorage.setItem("nameTeamG", $(this).val());
    //console.log(localStorage);
  });
  // NAME TEAM D
  $("#team_name_d").on("keyup", function() {
    // local storage garde en mémoire des infos
    localStorage.setItem("nameTeamD", $(this).val());
    //console.log(localStorage);
  });

  // btn messages
  $('.admin_action_btn').click(function() {
    if ($(this).hasClass('active')) {
      //console.log("this HAS class 'active' so removing it");
      $('.admin_action_btn').removeClass('active');
      localStorage.setItem("storageTheme", "");
    } else {
      //console.log("this HAS NOT class 'active' so adding it ");
      $('.admin_action_btn').removeClass('active');
      $(this).addClass('active');
      localStorage.setItem("storageTheme", $(this).text());
    }
    //console.log(localStorage);
  });

  // CAUCUS
  $('#btn_caucus').click(function() {
    //console.log('caucus starting');
    // on enregistre le thème en cours s'il y en a un	
    if($("#theme").val().length !== 0) {
	theme[currentTheme] = $("#theme").val();
    }
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    caucus = window.setInterval(Caucus, 1000);
  });
  // VOTE
  $('#btn_vote').click(function() {
    //console.log('voting');
    if ( !$(this).hasClass('active')) {
      $('#theme').val('Votez !');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      localStorage.setItem("PourAfficher", 'Votez !');
    } else {
      $('#theme').val(theme[currentTheme]);
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", theme[currentTheme]);
    }
  });
  // ENTRACTE
  $('#btn_entracte').click(function() {
    //console.log('entracte');
    if ( !$(this).hasClass('active')) {
      $('#theme').val('Entracte');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      localStorage.setItem("PourAfficher", 'Entracte');
    } else {
      $("#theme").val(theme[currentTheme]);
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", theme[currentTheme]);
    }
  });
  // MERCI
  $('#btn_merci').click(function() {
    //console.log('merci');
    if ( !$(this).hasClass('active')) {
      $('#theme').val('Merci !');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      localStorage.setItem("PourAfficher", 'Merci !');
    } else {
      $('#theme').val(theme[currentTheme]);
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", theme[currentTheme]);
    }
    //localStorage.clear();
    console.log(localStorage);
  });
  // MINI MODE
  $('#btn_mini').click(function() {
    //console.log('mini');
    if ( !$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      localStorage.setItem("IsMini", 'visible');
    } else {
      $(this).removeClass('active');
      localStorage.setItem("IsMini", 'hidden');
    }
    //localStorage.clear();
    console.log(localStorage);
  });

  // COLOR D
  $('#color_holder_d .color').click(function() {
    var CurentColorD = $(this).css('background-color');
    //console.log('picking right color :' + CurentColorD);
    $('#color_holder_d .color').removeClass('selected');
    $(this).addClass('selected');
    localStorage.setItem("colorTeamD", CurentColorD);
  });

  // COLOR G
  $('#color_holder_g .color').click(function() {
    var CurentColorG = $(this).css('background-color');
    //console.log('picking left color :' + CurentColorG);
    $('#color_holder_g .color').removeClass('selected');
    $(this).addClass('selected');
    localStorage.setItem("colorTeamG", CurentColorG);
    // console.log(localStorage);
  });

  // PENALITES G
  $('#penalites_holder_g > .penalites').click(function() {
    $(this).toggleClass('active');
    var PenalitesG = $('#penalites_holder_g > .active').length;
    console.log(localStorage);
    localStorage.setItem("penalitesG", PenalitesG);
  });
  // PENALITES D
  $('#penalites_holder_d > .penalites').click(function() {
    $(this).toggleClass('active');
    var PenalitesD = $('#penalites_holder_d > .active').length;
    console.log(localStorage);
    localStorage.setItem("penalitesD", PenalitesD);
  });


  // IMPRO PLAY
  $('#btn_impro_time_play').click(function() {
    console.log(timerImproPlaying);
    $(this).addClass('active');
    $('#btn_impro_time_stop').removeClass('active');
    if (timerImproPlaying == false) {
      //console.log("launching timer impro bro !");
      compteurImpro = window.setInterval(compteImpro, 1000);
      timerImproPlaying = true;
      //console.log("was false so starting");
    } else {
      // do nothing
    }
  });

  // IMPRO STOP
  $('#btn_impro_time_stop').click(function() {
    clearInterval(compteurImpro);
    //console.log('stoping impro');
    $(this).addClass('active');
    $('#btn_impro_time_play').removeClass('active');
    improTimeMin = 3;
    improTimeSec = 30;
    $('#impro_time_minutes').text(improTimeMin);
    $('#impro_time_seconds').text(improTimeSec);
    localStorage.setItem("dureeImproMin", improTimeMin);
    localStorage.setItem("dureeImproSec", improTimeSec);
    timerImproPlaying = false;
  });

  // IMPRO MINUTES UP
  $('#btn_impro_minutes_up').click(function() {
    console.log('minutes up');
    improTimeMin++;
    if (improTimeMin > 9) {
      $('#impro_time_minutes').text(improTimeMin);
    } else {
      $('#impro_time_minutes').text('0' + improTimeMin);
    }
    localStorage.setItem("dureeImproMin", improTimeMin);
  });
  // IMPRO MINUTES DOWN
  $('#btn_impro_minutes_down').click(function() {
    console.log('minutes down');
    if (improTimeMin == 11) {
      improTimeMin--;
      $('#impro_time_minutes').text(improTimeMin);
    } else if (improTimeMin > 10) {
      improTimeMin--;
      $('#impro_time_minutes').text(improTimeMin);
    } else if (improTimeMin > 0) {
      improTimeMin--;
      $('#impro_time_minutes').text('0' + improTimeMin);
    }
    localStorage.setItem("dureeImproMin", improTimeMin);
  });
  // IMPRO SECONDS UP
  $('#btn_impro_seconds_up').click(function() {
    switch (improTimeSec) {
      case 0:
        improTimeSec += 15;
        break;
      case 15:
        improTimeSec += 15;
        break;
      case 30:
        improTimeSec += 15;
        break;
      case 45:
        improTimeSec = 0;
        improTimeMin++;
        $('#impro_time_minutes').text(improTimeMin);
        localStorage.setItem("dureeImproMin", improTimeMin);
        break;
    }
    $('#impro_time_seconds').text(improTimeSec);
    localStorage.setItem("dureeImproMin", improTimeMin);
    localStorage.setItem("dureeImproSec", improTimeSec);
  });
  // IMPRO SECONDS DOWN
  $('#btn_impro_seconds_down').click(function() {
    switch (improTimeSec) {
      case 0:
        if (improTimeMin > 0) {
          improTimeSec = 45;
          improTimeMin--;
          $('#impro_time_minutes').text(improTimeMin);
          localStorage.setItem("dureeImproMin", improTimeMin);
        } else {
          improTimeSec = 0;
        }
        break;
      case 15:
        improTimeSec = 0;
        break;
      case 30:
        improTimeSec -= 15;
        break;
      case 45:
        improTimeSec -= 15;
        break;
    }
    $('#impro_time_seconds').text(improTimeSec);
    localStorage.setItem("dureeImproSec", improTimeSec);
  });

  // MATCH PLAY
  $('#btn_match_time_play').click(function() {
    pausing = false;
    $(this).addClass('active');
    $('#btn_match_time_stop').removeClass('active');
    if (timerMatchPlaying == false) {
      compteurMatch = window.setInterval(compteMatch, 1000);
      timerMatchPlaying = true;
    } else {
      //do nothing
    }
  });
  // timer match pause
  $('#admin_timer_pause').click(function() {
    if (pausing == false) {
      pausing = true;
    } else {
      pausing = false;
    }
    //console.log(pausing);
  });
  // MATCH STOP
  $('#btn_match_time_stop').click(function() {
    clearInterval(compteurMatch);
    matchTimeMin = 45;
    matchTimeSec = 00;
    $(this).addClass('active');
    $('#btn_match_time_play').removeClass('active');
    $('#match_time_minutes').text(matchTimeMin);
    $('#match_time_seconds').text('0' + matchTimeSec);
    localStorage.setItem("dureeMatchMin", '45');
    localStorage.setItem("dureeMatchSec", '00');
    timerMatchPlaying = false;
  });

  // THEME
  $("#theme").on("keyup", function() {
    // local storage garde en mémoire des infos tant que le navigateur est ouvert
    var letexte = $(this).val();
    var letexte_typo = letexte.replace("'","’");
    $("#theme").val(letexte_typo);
    console.log(letexte_typo);

    localStorage.setItem("PourAfficher", letexte_typo);
    // console.log(localStorage);
  });

  // POINTS G
  $("#points_up_g").click(function() {
    ptsG++;
    //console.log('click on button admin_button_up_g - points are now = '+ptsG);
    $('#points_g').text(ptsG);
    localStorage.setItem("pointsG", $('#points_g').text());
  });
  $("#points_down_g").click(function() {
    if (ptsG <= 0) {
      ptsG = 0;
    } else {
      ptsG--;
    }
    //console.log('click on button admin_button_up_g - points are now = '+ptsG);
    $('#points_g').text(ptsG);
    localStorage.setItem("pointsG", $('#points_g').text());
  });

  // POINTS D
  $("#points_up_d").click(function() {
    ptsD++;
    //console.log('click on button admin_button_up_d - points are now = '+ptsD);
    $('#points_d').text(ptsD);
    localStorage.setItem("pointsD", $('#points_d').text());
  });
  $("#points_down_d").click(function() {
    if (ptsD <= 0) {
      ptsD = 0;
    } else {
      ptsD--;
    }
    //console.log('click on button admin_button_up_d - points are now = '+ptsD);
    $('#points_d').text(ptsD);
    localStorage.setItem("pointsD", $('#points_d').text());
  });

});

// FUNCTIONS

// CAUCUS
function Caucus() {
  caucusTime--;
  $('#theme').val(caucusTime);
  localStorage.setItem("PourAfficher", caucusTime);
  if (caucusTime < 10) {
    $('#theme').css('color', 'orange');
  }
  if (caucusTime < 0) {
    clearInterval(caucus);
    $("#theme").val(theme[currentTheme]);
    $('#btn_caucus').removeClass('active');
    $('#admin_theme').css('color', 'white');
    console.log('caucus is finished');
    localStorage.setItem("PourAfficher", theme[currentTheme]);
    $('#theme').css('color', 'white');
    caucusTime=20;
  }
  console.log(localStorage);
}

// COMPTEUR IMPRO
function compteImpro() {
  improTimeSec--;
  $("#impro_time_seconds").text(improTimeSec);
  // localStorage.setItem("dureeImproSec",improTimeSec);
  if (improTimeSec <60) {
    $("#impro_time_seconds").text(improTimeSec);
    localStorage.setItem("dureeImproSec",improTimeSec);
  }
  if (improTimeSec < 10) {
    $("#impro_time_seconds").text('0' + improTimeSec);
    localStorage.setItem("dureeImproSec",'0' + improTimeSec);
  }
  if (improTimeSec < 0) {
    improTimeSec = 59;
    improTimeMin--;
    $("#impro_time_minutes").text(improTimeMin);
    $("#impro_time_seconds").text(improTimeSec);
    localStorage.setItem("dureeImproSec", improTimeSec);
  }
  if (improTimeMin == 0 && improTimeSec == 0) {
    clearInterval(compteurImpro);
    localStorage.setItem("dureeImproSec",'00');
  }
  localStorage.setItem("dureeImproMin", improTimeMin);
  // localStorage.setItem("dureeImproSec", improTimeSec);
}

// COMPTEUR MATCH
function compteMatch() {
  matchTimeSec--;
  $("#match_time_seconds").text(matchTimeSec);
  localStorage.setItem("dureeMatchSec",matchTimeSec);

  if (matchTimeSec < 10) {
    $("#match_time_seconds").text('0'+matchTimeSec);
    localStorage.setItem("dureeMatchSec",'0'+ matchTimeSec);
  }
  if (matchTimeSec < 0) {
    matchTimeSec = 59;
    matchTimeMin--;
    $("#match_time_minutes").text(matchTimeMin);
    $("#match_time_seconds").text(matchTimeSec);
    localStorage.setItem("dureeMatchSec",matchTimeSec);
  }
  if (matchTimeMin == 0 && matchTimeSec == 0) {
    clearInterval(compteurMatch);
    localStorage.setItem("dureeMatchSec","00");
  }
  localStorage.setItem("dureeMatchMin", matchTimeMin);
}

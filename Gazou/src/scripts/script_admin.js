// GLOBAL VARIABLES
var pointsG = 0;
var pointsD = 0;

var PenalitesG = 0;
var PenalitesD = 0;

var matchTimeMin = 45;
var matchTimeSec = 0;

var compteurMatch;
var compteurImpro;

var improTimeMin = 5;
var improTimeSec = 0;
var timerImproPlaying = false;
var timerMatchPlaying = false;

var caucus;
var caucusTime = 20;

var theme = [];
var currentTheme=0;
var themelaunched="";

var basculePoints=false;
var colormode="light";

var zMax=1;

var skins = ["defaut", "idp"];
var currentSkin = 0;

var videointro=0;
var videofin=0;

//DOM READY
$(function() {
  // init
  localStorage.setItem('VideoIntro', '0');
  localStorage.setItem("EcranVote",'false');
  localStorage.setItem("EcranEntracte",'false');
  localStorage.setItem("EcranCaucus",'false');
  localStorage.setItem("EcranMerci",'false');

  //GESTION VIDEOS
  $('#btn_video_intro').click(function(){
    $(this).addClass('active');
    if(videointro==0){
      videointro=1;
      localStorage.setItem('VideoIntro', '1');
      console.log('video intro play');
    }
    else{
      //do nothing
    }
    console.log(localStorage);
  });
  $('#btn_video_fin').click(function(){
    $(this).addClass('active');
    if(videofin==0){
      videofin=1;
      localStorage.setItem('VideoFin', '1');
      console.log('video fin play');
    }
    else{
      //do nothing
    }
    console.log(localStorage);
  });

 // GESTION DES SKINS ==OK==
 $('.skin-btn').click(function(){
   var skinsAvailable = skins.length;
   var skinActif = skins[currentSkin];
   if ( $(this).attr('id')=="skin-next" ){
     if(currentSkin<skinsAvailable-1){
       currentSkin++;
       $('#skin-text').text(skins[currentSkin]);
     }
     else{
       currentSkin=0;
       $('#skin-text').text(skins[currentSkin]);
     }
   }
   else{
     if(currentSkin==0){
       currentSkin=skinsAvailable-1;
       $('#skin-text').text(skins[currentSkin]);
     }
     else{
       currentSkin--;
       $('#skin-text').text(skins[currentSkin]);
     }
   }
   localStorage.setItem('Skins', skins[currentSkin]);
   localStorage.setItem('currentSkin', currentSkin);
 });

  // === GESTION DES ÉQUIPES ====

  // GESTION TEAM COLOR ==OK==
  $('.color').click(function(){
    var color= $(this).css('background-color');
    var team= $(this).parent().attr('id');
    console.log("click on color :"+color+" for : "+team);
    //met la couleur sur le color viewer
    $(this).parent().siblings('.team-color').css('background-color',color);
    //hide le tiroir
    $(this).parent().addClass('hidden');
    //met le contour sur cible + enlève contour sur les autres
    $(this).addClass('selected').siblings().removeClass('selected');
    //local storage de la valeur
    switch (team) {
      case "team_color-g":
        localStorage.setItem("colorTeamG",color);
        break;
      case "team_color-d":
      localStorage.setItem("colorTeamD",color);
        break;
    }

    console.log(localStorage);
  });

  // NOM ÉQUIPE GAUCHE ==OK==
  $('#nom-equipe-g').on('keyup', function() {
    // console.log('nom g');
    localStorage.setItem('nameTeamG', $(this).val());
  });
  // NOM ÉQUIPE DROITE ==OK==
  $('#nom-equipe-d').on('keyup', function() {
    // console.log('nom d');
    localStorage.setItem('nameTeamD', $(this).val());
  });

  //  GESTION DRAGGABLE WINDOWS ==OK==
  $('.movable').draggable({
        cursor:'grabbing',
        // containment: 'document',
        handle: '.grabber'
  }).css('z-index','1');

  // GESTION DRAGGABLE Z-INDEX ==OK==
  $('.movable').on('click mousedown',function(){
    zMax++;
    $(this).css('z-index',zMax);
  });

  //  AFFICHAGE/MASQUAGE TIROIRS ==OK==
  $('.showmore').click(function(){
    $(this).siblings('.hidable').toggleClass('hidden');
    switch ( $(this).text() ) {
      case "▾":
      $(this).text("▴")
        break;
      case "▴":
      $(this).text("▾")
        break;
    }
  });

  // THEME LOADING ==0K==
  $('.theme-input-status').click(function(){
    if( $(this).hasClass('loaded') ){
      // console.log('already loaded');
    }
    else{
      $(this).css('background-color','green').addClass('loaded');
      var currentLoadTheme = $(this).siblings('textarea').attr('datanumber');
      theme[currentLoadTheme]= $(this).siblings('textarea').val();
      // auto load first theme to theme selector :
      if( currentLoadTheme=='0' ){
        $('#theme-selector').text(theme[currentLoadTheme]);
        $('#theme-selector').attr('datanumber','0');
      }
      localStorage.setItem("Themes", theme );
    }
  });

  // THEME SELECTOR ==OK==
  $('#theme-selector-previous').click(function(){
    // console.log('theme previous');
    var max = theme.length;
    var current = $('#theme-selector').attr('datanumber');
    if( current=='0'){
      // console.log('at minim so going back to maximum');
      $('#theme-selector').attr('datanumber',max-1);
      $('#theme-selector').text(theme[max-1]);
    }
    else{
      current--;
      // console.log( 'going to theme '+current);
      $('#theme-selector').attr('datanumber',current);
      $('#theme-selector').text(theme[current]);
    }
    $('#theme-launcher').removeClass('active');
  });
  $('#theme-selector-next').click(function(){
    // console.log('theme next');
    var max = theme.length;
    console.log('theme length :'+max);
    var current = $('#theme-selector').attr('datanumber');
    if( current==max-1){
      // console.log('at maximum so going back to zero');
      $('#theme-selector').attr('datanumber','0');
      $('#theme-selector').text(theme[0]);
    }
    else{
      current++;
      // console.log( 'going to theme '+current);
      $('#theme-selector').attr('datanumber',current);
      $('#theme-selector').text(theme[current]);
    }
    $('#theme-launcher').removeClass('active');
  });

  // THEME LAUNCHER ==OK==
  $('#theme-launcher').click(function(){
    if( !$(this).hasClass('active') ){
    console.log('click on theme launcher');
    $(this).addClass('active');
    themelaunched=$('#theme-selector').text();
    $('#theme-impro').val(themelaunched);
    localStorage.setItem("PourAfficher", themelaunched );
    localStorage.setItem("currentTheme", themelaunched );
    console.log(localStorage);
    }
    else{
      console.log('already launched');
    }
  });

  // GESTION COLOR MODE ==OK==
  $('#switch-color-mode .slider').click(function(){
    console.log("changecolor mode");
    switch (colormode) {
      case "light":
      console.log('going to dark mode');
      colormode="dark";
      $('#switch-color-mode-txt').html("sombre");
      $('body, .movable, .grabber, .showmore, .screen, .btn, #reset-button, .skin-btn, .btn-long, .penalites, .color, #switch-color-mode-txt, #skin-text, #notes, .slider').addClass('darkmode');
        break;
      case "dark":
      console.log('going to light mode');
      colormode="light";
      $('#switch-color-mode-txt').html("clair");
      $('body, .movable, .grabber, .showmore, .screen, .btn, #reset-button, .skin-btn, .btn-long, .penalites, .color, #switch-color-mode-txt, #skin-text, #notes, .slider').removeClass('darkmode');
        break;
    }
  });

  // CAUCUS ==OK==
  $('#btn_caucus').click(function() {
    //console.log('caucus starting');
    // on enregistre le thème en cours s'il y en a un
    if($("#theme-impro").val().length !== 0) {
	     theme[currentTheme] = $("#theme").val();
    }
    $(this).addClass('active');
    $(this).siblings('.btn-long').removeClass('active');
    caucus = window.setInterval(Caucus, 1000);
  });

  // VOTE ==OK==
  $('#btn_vote').click(function() {
    if ( !$(this).hasClass('active')) {
      $('#theme-impro').val('Votez !');
      $(this).addClass('active');
      $(this).siblings('.btn-long').removeClass('active');
      localStorage.setItem("PourAfficher", 'Votez !');
      localStorage.setItem("EcranVote",'true');
    } else {
      $('#theme-impro').val(themelaunched);
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", themelaunched);
      localStorage.setItem("EcranVote",'false');
    }
  });
  // ENTRACTE ==OK==
  $('#btn_entracte').click(function() {
    if ( !$(this).hasClass('active')) {
      $('#theme-impro').val('Entracte');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      localStorage.setItem("PourAfficher", 'Entracte');
      localStorage.setItem("EcranEntracte",'true');
    } else {
      $('#theme-impro').val(" ");
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", " ");
      localStorage.setItem("EcranEntracte",'false');
    }
  });
  // MERCI ==OK==
  $('#btn_remerciements').click(function() {
    //console.log('merci');
    if ( !$(this).hasClass('active')) {
      $('#theme-impro').val('Merci !');
      $(this).addClass('active');
      $(this).siblings('.btn-long').removeClass('active');
      localStorage.setItem("PourAfficher", 'Merci !');
      localStorage.setItem("EcranMerci", 'true');
    } else {
      $('#theme-impro').val(" ");
      $(this).removeClass('active');
      localStorage.setItem("PourAfficher", " ");
      localStorage.setItem("EcranMerci", 'false');
    }
    //localStorage.clear();
    console.log(localStorage);
  });

  // MINI MODE ==OK==
  $('#btn_reduit').click(function() {
    if ( !$(this).hasClass('active') ) {
      $(this).addClass('active');
      $(this).siblings('.btn-long').removeClass('active');
      localStorage.setItem("IsMini", 'visible');
    } else {
      $(this).removeClass('active');
      localStorage.setItem("IsMini", 'hidden');
    }
  });

  // PENALITES ÉQUIPE GAUCHE ==OK==
  $('#penalites_holder_g > .penalites').click(function() {
    $(this).toggleClass('active');
    var PenalitesG = $('#penalites_holder_g > .active').length;
    localStorage.setItem("penalitesG", PenalitesG);
  });
  // PENALITES ÉQUIPE DROITE ==OK==
  $('#penalites_holder_d > .penalites').click(function() {
    $(this).toggleClass('active');
    var PenalitesD = $('#penalites_holder_d > .active').length;
    localStorage.setItem("penalitesD", PenalitesD);
  });


  // IMPRO PLAY ==OK==
  $('#btn_impro_time_play').click(function() {
    console.log(timerImproPlaying);
    $(this).addClass('active');
    $('#btn_impro_time_stop').removeClass('active');
    if (timerImproPlaying == false) {
      compteurImpro = window.setInterval(compteImpro, 1000);
      timerImproPlaying = true;
    } else {
      // do nothing
    }
  });
  // IMPRO STOP ==OK==
  $('#btn_impro_time_stop').click(function() {
    clearInterval(compteurImpro);
    //console.log('stoping impro');
    $(this).addClass('active');
    $('#btn_impro_time_play').removeClass('active');
    improTimeMin = 5;
    improTimeSec = 0;
    $('#impro_time_minutes').text("0"+improTimeMin);
    $('#impro_time_seconds').text("0"+improTimeSec);
    localStorage.setItem("dureeImproMin", improTimeMin);
    localStorage.setItem("dureeImproSec", improTimeSec);
    timerImproPlaying = false;
  });

  // IMPRO MINUTES UP ==OK==
  $('#btn_timer_impro_min_plus').click(function() {
    console.log('minutes up');
    improTimeMin++;
    if (improTimeMin > 9) {
      $('#impro_time_minutes').text(improTimeMin);
    } else {
      $('#impro_time_minutes').text('0' + improTimeMin);
    }
    localStorage.setItem("dureeImproMin", improTimeMin);
  });
  // IMPRO MINUTES DOWN ==OK==
  $('#btn_timer_impro_min_moins').click(function() {
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
  // IMPRO SECONDS UP ==OK==
  $('#btn_timer_impro_sec_plus').click(function() {
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
  // IMPRO SECONDS DOWN ==OK==
  $('#btn_timer_impro_sec_moins').click(function() {
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

  // MATCH PLAY ==ok==
  $('#btn_match_time_play').click(function() {
    $(this).addClass('active');
    $('#btn_match_time_stop').removeClass('active');
    if (timerMatchPlaying == false) {
      compteurMatch = window.setInterval(compteMatch, 1000);
      timerMatchPlaying = true;
    } else {
      //do nothing
    }
  });
  // MATCH STOP ==ok==
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

  // THEME ==OK==
  $("#theme-impro").on("keyup", function() {
    var letexte = $(this).val();
    // console.log('theme-impro content= '+letexte);
    var letexte_typo = letexte.replace("'","’");
    $("#theme-impro").val(letexte_typo);
    // console.log(letexte_typo);
    localStorage.setItem("PourAfficher", letexte_typo);
    // console.log(localStorage);
  });


  // POINTS ÉQUIPE GAUCHE ==OK==
  //ajout de points
  $('#btn_points_g_plus').click(function(){
    pointsG++;
    $('#points-g').text(pointsG);
    localStorage.setItem('pointsG', pointsG);
    console.log('points g + : now at '+pointsG);
  });
  //suppression de points
  $('#btn_points_g_moins').click(function(){
    if(pointsG <=0){
      pointsG=0;
    }
    else{
      pointsG--;
    }
    $('#points-g').text(pointsG);
    localStorage.setItem('pointsG', pointsG);
    console.log('points g - : now at '+pointsG);
  });

  // POINTS ÉQUIPE DROITE ==OK==
  //ajout de points
  $('#btn_points_d_plus').click(function(){
    pointsD++;
    $('#points-d').text(pointsD);
    localStorage.setItem('pointsD', pointsD);
    console.log('points d + : now at '+pointsD);
  });
  //suppression de points
  $('#btn_points_d_moins').click(function(){
    if(pointsD <=0){
      pointsD=0;
    }
    else{
      pointsD--;
    }
    $('#points-d').text(pointsD);
    localStorage.setItem('pointsD', pointsD);
    console.log('points d - : now at '+pointsD);
  });

});

// FUNCTIONS

// CAUCUS ==OK==
function Caucus() {
  caucusTime--;
  $('#theme-impro').val(caucusTime);
  localStorage.setItem("PourAfficher", caucusTime);
  localStorage.setItem("EcranCaucus", 'true');
  if (caucusTime < 10) {
    $('#theme-impro').css('color', 'orange');
  }
  if (caucusTime < 0) {
    clearInterval(caucus);
    $("#theme-impro").val(themelaunched);
    $('#btn_caucus').removeClass('active');
    // console.log('caucus is finished');
    localStorage.setItem("PourAfficher", themelaunched);
    localStorage.setItem("EcranCaucus", 'false');
    $('#theme-impro').css('color', 'white');
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

// COMPTEUR MATCH ==OK==
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

// GLOBAL VARIABLES

//DOM READY
$(function() {

  // récupère la valeur dans le local storage
  console.log(localStorage);

  setInterval(function() {
    // nom équipe G
    var nomG = localStorage.getItem("nameTeamG");
    $("#proj_team_g").text(nomG);
    // nom équipe G
    var nomD = localStorage.getItem("nameTeamD");
    $("#proj_team_d").text(nomD);
    // couleur équipe G
    var couleurD = localStorage.getItem("colorTeamD");
    $("#proj_fond_bloc_d").css("fill", couleurD);
    // couleur équipe G
    var couleurG = localStorage.getItem("colorTeamG");
    $("#proj_fond_bloc_g").css("fill", couleurG);
    // thème
    var affichage = localStorage.getItem("PourAfficher");
    $("#proj_theme, #proj_theme_mini").text( affichage );
    CaucusColor(affichage);
    // points g
    var lesPointsG = localStorage.getItem("pointsG");
    $("#proj_point_compteur_g").text(lesPointsG);
    // penalites g parseInt converti la string en int
    var lesPenalitesG = localStorage.getItem("penalitesG");
    SetPenalitesG(lesPenalitesG);
    // points d
    var lesPointsD = parseInt(localStorage.getItem("pointsD"));
    $("#proj_point_compteur_d").text(lesPointsD);
    // penalites d
    var lesPenalitesD = localStorage.getItem("penalitesD");
    SetPenalitesD(lesPenalitesD);
    // durée match
    var matchMin = localStorage.getItem("dureeMatchMin");
    var matchSec = localStorage.getItem("dureeMatchSec");
    $("#proj_duree_match, #proj_duree_match_mini").text(matchMin + ' : ' + matchSec);
    // durée impro
    var dureeImproSec = localStorage.getItem("dureeImproSec");
    var dureeImproMin = localStorage.getItem("dureeImproMin");
    $("#proj_duree_impro, #proj_duree_impro_mini").text(dureeImproMin + ' : ' + dureeImproSec);
    HideImproTime(dureeImproMin,dureeImproSec); //if null (0:0) : don't show it
    // mode mini
    var beMini = localStorage.getItem("IsMini");
    $("#container_mini").css("visibility",beMini);

  }, 100);

});

// FUNCTIONS

// penalites G
function SetPenalitesG(lesPenalitesG) {
    switch (lesPenalitesG) {
    case "0":
      $('#pg1').hide();
      $('#pg2').hide();
      $('#pg3').hide();
      break;
    case "1":
      $('#pg1').show();
      $('#pg2').hide();
      $('#pg3').hide();
      break;
    case "2":
      $('#pg1').show();
      $('#pg2').show();
      $('#pg3').hide();
      break;
    case "3":
      $('#pg1').show();
      $('#pg2').show();
      $('#pg3').show();
      break;
  }
}

// penalites D
function SetPenalitesD(lesPenalitesD) {
  switch (lesPenalitesD) {
    case "0":
      $('#pd1').hide();
      $('#pd2').hide();
      $('#pd3').hide();
      break;
    case "1":
      $('#pd1').show();
      $('#pd2').hide();
      $('#pd3').hide();
      break;
    case "2":
      $('#pd1').show();
      $('#pd2').show();
      $('#pd3').hide();
      break;
    case "3":
      $('#pd1').show();
      $('#pd2').show();
      $('#pd3').show();
      break;
  }
}

//hide impro time if necessary
function HideImproTime(dureeImproMin,dureeImproSec){
  if(dureeImproMin == 0 && dureeImproSec ==0){
    $("#proj_duree_impro, #proj_duree_impro_mini").hide();
  }
  else{
    $("#proj_duree_impro, #proj_duree_impro_mini").show();
  }
}

// change text color only during caucus
function CaucusColor(affichage){
  if(affichage<=10 && affichage>5 ){
    $("#proj_theme").css('color','orange');
  }
  else if(affichage<=5 && affichage>=0 ){
    $("#proj_theme").css('color','red');
  }
  else{
    $("#proj_theme").css('color','rgb(55,55,55)');
  }
}

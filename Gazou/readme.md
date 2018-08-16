# new Gazou 2

Nouvelle version améliorée de l'interface de gestion de match d'improvisation théâtrale Gazou, adaptée sur navigateur dans un soucis d'accessibilité et de compatibilité (la version originale était développé avec Flash : http://www.dramaction.qc.ca/fr/improvisation/tableau-daffichage-gratuit/ ).
Le but est de proposer une interface facilement customisable et utilisable partout et sur toutes les machines et navigateurs possibles

### Principe :

Le New Gazou fonctionne sur deux fenêtres de navigateur. La première correspond à la partie administration/gestion du match. La seconde est destinée à être projetée sur un écran visible du public en affichant les informations nécessaires au suivi de la représentation (points, thème, temps d'improviser, etc.). 
La transmission des données entre les deux fenêtres se fait par le localStorage du navigateur. Ainsi, et contrairement à la version Flash, les spectateurs ne voient plus les opérations de gestion de l'interface et les déplacements de souris de la personne en régie, ce qui est tout de même bien plus agréable.

### Fonctionnalités :

New Gazou est conçu pour des match classiques entre deux équipes. Il s'utilise en régie avec connexion à un projecteur vidéo.

#### concernant les équipes :

- Noms des équipes
- Contrôle des points
- Gestion des pénalités
- Affectation d'un couleur d'équipe

#### concernant le match et les impros :

- Timer de mi-temps de match (45min)
- Timer d'improvisation (programmable)
- Gestion des thèmes d'impro (14 thèmes)
- Possibilité d'écriture à la volée
- Boutons de contrôle: caucus, vote, entracte, remerciement (affiche un carton en plein écran)

#### concernant le show :

- Mode écran réduit : écran noir avec juste les infos basiques pour les moments d'immersions
- Bouton d'envoi d'une vidéo d'intro (plein écran)
- Bouton d'envoi d'une vidéo de fin (plein écran)

#### concernant l'interface :

- Mode clair ou mode sombre (côté admin)
- Zone de "post-it" pour noter des consignes/infos sur le show (côté admin)
- Gestion de templates de styles visuels des blocs et cartons en format svg (pour la projection)
- Les fenêtres de l'interface peuvent être déplacées et arrangées (côté admin)

### Problèmes connus/possibilités d'améliorations :

- Les thèmes sont inscrits en dur dans le js, un peu de php permettrait de rendre la détection des templates et leur chargement dynamique. Mais il faudrait avoir un localhost, ce qui me parait compliqué à mettre en place dans un soucis de facilité d'usage pour des personnes qui ne font pas de code ou n'ont pas les connaissances techniques nécessaires. À la limite un petit exécutable qui lance le localhost et les deux pages html serait idéal, mais je n'ai pas les connaissances techniques pour mettre cela en place.
- Script permettant les corrections ortho-typographiques et typographiques courantes, comme les guillemets, les apostrophes, espaces-fines, etc ?
- optimisation du code
- Sélecteur de couleur de fond projection ?
- Skins avancés : gestion de typo, règles css particulières...
- Il doit y avoir des petits défauts qui doivent pouvoir être réglés
- Bouton de remise à zero du localStorage


---
outline: deep
---
  
<iframe width="100%" height="600" src="test_leaflet.html" style="border: none" />

## Les couches

- Cropped classification lvl3 : 

- Complete classification lvl3 : Créée par le groupe de PINNA Anne-Sophie, je l'utilise ici à titre de comparaison. En effet, ils ont effectué le même travail de classification, avec des hyperparamètres légèrement différents mais surtout, une zone de calcul bien plus vaste.

### Interprétation de la qualité de classification
Sur notre zone de travail, nous pouvons visuellement noter quelques différences de classification. Au niveau de la forêt d'Eaunes, la classification complète a produit plus de pixels résiduels que dans le cas de notre classification réduite, mais une meilleure détection des zones boisées ou non. 

Même constat sur les zones plus à l'Ouest : notre classification réduite présente des résultats bien plus uniformes, mais vraissemblablement plus réalistes.

Ces approximations ne permettent pas, dans notre cas d'étude, d'affirmer l'impact positif de la taille de la zone d'étude sur la qualité des résultats. Le problème est ailleurs, et certainement dans l'inéquilibre représentation des classes. Dans notre classification réduite comme dans celle du groupe de PINNA Anne-Sophie, nous remarquons aisément l'omniprésence de la classe "Chêne pur^," dont la sur-représentation dans la zone d'étude dégrade la qualité de prédiction.

La superposition des couches de classifications avec les images satellites met en exergue  l'inadéquation entre la problématique étudiée et la résolution spatiale utilisée. A vue d'oeil, le modèle n'est adapté qu'à l'analyse de groupes d'arbres, composés d'au moins 2 ou 3 individus, où alors d'individus aux caractèristiques dendrométriques très développés. Dans des forêts homogènes, jeunes, à faible diversité spécifique et avec quelques espèces sur-dominantes, une telle résolution ne permet pas d'appréhender efficacement la diversité des populations du milieu.

## Les fonds de carte
- [IGN SCAN TOPO25](https://geoservices.ign.fr/documentation/donnees/cartes/scan25) : collection d'images cartographiques numériques en couleurs, issue du fonds cartographique au 1 : 25 000 Type 2010.

- [Utagawa VTT](https://www.utagawavtt.com/) : carte mondiale focalisée sur la pratique du VTT. Elle affiche en particulier :
    - Les reliefs ombragés et les lignes de niveaux,
    - Les artefacts utiles pour le VTT ou l'itinérance (parkings, gares, sommets, cols, gués, magasins de vélo, points d'eau),
    - Les chemins et sentiers sont mis en avant versus les routes importantes et autoroutes,
    - Les remontées mécaniques 🚠,
    - Les sentiers interdits ou non praticables à VTT (en rouge) ❌,
    - Les zones de biodiversité 🐝 où le VTT est interdit totalement (en rouge) ou partiellement (en violet).

- [OpenTopoMaps](https://wiki.openstreetmap.org/wiki/FR:OpenTopoMap) :  cartes topographiques à partir de données OSM et SRTM.

- [Cylce OpenStreetMaps](https://github.com/cyclosm/cyclosm-cartocss-style) : carte internationale des voies cyclables fondée sur les données OSM.

- [OpenStreetMaps](https://www.openstreetmap.fr/) : carte ouverte et collaborative du monde.


::: warning Attention
Toute coïncidence entre la nature des données affichées et un certain attrait de l'auteur pour les sports de montagne serait fortuite.
:::

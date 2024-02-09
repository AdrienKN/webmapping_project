---
outline: deep
---
  
<iframe width="100%" height="600" src="test_leaflet.html" style="border: none" />

## Les fonds de carte
- [IGN SCAN TOPO25](https://geoservices.ign.fr/documentation/donnees/cartes/scan25) : collection d'images cartographiques numériques en couleurs, issue du fonds cartographique au 1 : 25 000 Type 2010;

- [Utagawa VTT](https://www.utagawavtt.com/) : carte mondiale focalisée sur la pratique du VTT;

- [OpenTopoMaps](https://wiki.openstreetmap.org/wiki/FR:OpenTopoMap) :  cartes topographiques à partir de données OSM et SRTM;

- [Cylce OpenStreetMaps](https://github.com/cyclosm/cyclosm-cartocss-style) : carte internationale des voies cyclables fondée sur les données OSM;

- [OpenStreetMaps](https://www.openstreetmap.fr/) : carte ouverte et collaborative du monde.

## Les couches
### Les cartes classifiées
Nous avons importés les 2 cartes classifiées suivantes : 

- ***Cropped classification lvl3*** : réalisée par JOURDAIN Vincent, et moi-même. Elle est issue d'un modèle de classification RandomForest appliqué à une zone d'étude réduite, avec donc avec un échantillonnage faible.

- ***Complete classification lvl3*** : réalisée par le groupe de PINNA Anne-Sophie, je l'utilise ici à titre de comparaison. En effet, ils ont effectué le même travail de classification avec des hyperparamètres légèrement différents mais surtout, une zone de calcul bien plus vaste. L'entraînement de leur modèle a donc été bien plus robuste.

### Paramétrage des flux WMS avec GeoCoder
La méthode suivie pour la réalisation de cette carte est celle présentée dans le cours de M. JEGOUD, à savoir la création et la consommation d'un flux WMS à partir d'un fichier raster GeoTiff stocké sur un server *GeoServer*. 

Nous avons ainsi importé notre carte classifié sur *GeoServer*, paramètré le flux WMS correspondant et créé un style approprié. 

Nous avons ensuite importé la carte du groupe d'Anne-Sophie PINNA en y applicant le même style que notre première carte, afin d'en faciliter la comparaison. 

### Interprétation de la qualité de classification
#### Observations qualitatives
Sur notre zone de travail, nous pouvons visuellement noter quelques différences de classification. Au niveau de la forêt d'Eaunes, la classification complète a produit plus de pixels résiduels que dans le cas de notre classification réduite. La classification complète offre aussi une meilleure détection des frontières entre zones boisées et zones urbaines ou agricoles. 

Même constat plus à l'Ouest : notre classification réduite présente des résultats bien plus uniformes, mais vraissemblablement plus réalistes.

#### Taille des échantillons
Ces observations ne permettent pas, dans notre cas d'étude, d'affirmer l'impact positif de la taille de la zone d'étude sur la qualité des résultats. Dans les 2 cas, la qualité de la classification se montre déçevante. Nos travaux complémentaires d'analyse qualitative réalisés dans le cadre de l'UE Télédétection ont d'ailleurs démontré un taux de confusion du modèle très élevé, confirmant nos observations.

#### Réprésentativité des classes
Si la taille de l'échantillon ne justifie pas la qualité moindre des classifications, alors le problème est ailleurs, et certainement dans l'inéquilibre représentation des classes. Dans notre classification réduite comme dans celle du groupe de PINNA Anne-Sophie, nous remarquons aisément l'omniprésence de la classe "Chêne pure," dont la sur-représentation dans la zone d'étude dégrade la qualité de prédiction.

#### Résolution spatitale
Aussi, la superposition des couches de classifications avec les images satellites démontre l'inadéquation entre la problématique étudiée et la résolution spatiale utilisée. A vue d'oeil, le modèle n'est adapté qu'à l'analyse de groupes d'arbres, composés d'au moins 2 ou 3 individus, où alors d'individus aux caractèristiques dendrométriques très développées. 

Dans des forêts homogènes, jeunes, à faible diversité spécifique et avec quelques espèces sur-dominantes, une telle résolution ne permet pas d'appréhender efficacement la diversité des populations du milieu.

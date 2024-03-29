---
outline: deep
---
# Rapport UE Webmapping
Ce rapport retrace le travail de création d'une carte web dynamique à l'aide de la librairie [leaflet](https://github.com/Leaflet/Leaflet) et du framework [Vitepress](https://vitepress.dev/). Le résultat final est visible [ici](https://adrienkn.github.io/webmapping_project/). 

Nous étudierons dans un premier temps les différentes composantes de la carte, puis le script général du projet, disponible dans son intégralité sur [mon dépôt GitHub](https://github.com/AdrienKN/webmapping_project).

# La carte et ses composantes
## Les fonds de carte
- [IGN SCAN TOPO25](https://geoservices.ign.fr/documentation/donnees/cartes/scan25) : collection d'images cartographiques numériques en couleurs, issue du fonds cartographique au 1 : 25 000 Type 2010;

- [Utagawa VTT](https://www.utagawavtt.com/) : carte mondiale focalisée sur la pratique du VTT;

- [OpenTopoMaps](https://wiki.openstreetmap.org/wiki/FR:OpenTopoMap) :  cartes topographiques à partir de données OSM et SRTM;

- [Cylce OpenStreetMaps](https://github.com/cyclosm/cyclosm-cartocss-style) : carte internationale des voies cyclables fondée sur les données OSM;

- [OpenStreetMaps](https://www.openstreetmap.fr/) : carte ouverte et collaborative du monde.

## Les couches
### Les cartes classifiées
Nous avons importés les 2 cartes classifiées suivantes : 

- ***Cropped classification lvl3*** : réalisée par Felipe AGUIAR MARTIN, Léo LE GOURRIEREC, Vincent JOURDAIN et moi-même, elle est issue d'un modèle de classification *RandomForest* appliqué à une zone d'étude réduite.

- ***Complete classification lvl3*** : réalisée par le groupe de PINNA Anne-Sophie, je l'utilise ici à titre de comparaison. En effet, ils ont effectué le même travail de classification avec des hyperparamètres légèrement différents mais surtout, une zone de calcul bien plus vaste. L'entraînement de leur modèle a donc été bien plus robuste.

### Paramétrage des flux WMS avec *GeoCoder*
La méthode suivie pour la réalisation de cette carte est celle présentée dans le cours de M. JEGOU, à savoir la création et la consommation d'un flux WMS à partir d'un fichier raster GeoTiff stocké sur un server *GeoServer*. 

Nous avons ainsi importé notre carte classifié sur *GeoServer*, paramétré le flux WMS correspondant et créé un style approprié. 

Nous avons ensuite importé la carte du groupe d'Anne-Sophie PINNA en y applicant le même style que notre première carte, afin d'en faciliter la comparaison. 

### Interprétation et discussion de la qualité de la classification
#### Observations qualitatives
Sur notre zone de travail, nous pouvons visuellement noter quelques différences de classification entre les 2 cartes. Au niveau de la forêt d'Eaunes, la classification complète a produit plus de pixels résiduels que dans le cas de notre classification réduite. La classification complète offre aussi une meilleure détection des frontières entre zones boisées et zones urbaines ou agricoles. 

Même constat plus à l'Ouest : notre classification réduite présente des résultats bien plus uniformes, mais vraissemblablement plus réalistes.

Ces observations ne permettent donc pas, dans notre cas d'étude, d'affirmer l'impact positif de la taille de la zone d'étude sur la qualité des résultats. Dans les 2 cas, la qualité de la classification se montre déçevante. Nos travaux complémentaires d'analyse qualitative réalisés dans le cadre de l'UE Télédétection ont d'ailleurs démontré un taux de confusion du modèle très élevé, confirmant nos observations.

Si la taille de l'échantillon ne justifie pas la qualité moindre des classifications, alors le problème est ailleurs.

#### Une réprésentativité des classes désiquilibrée
 La première source d'erreur réside certainement dans l'inéquilibre représentation des classes. Dans notre classification réduite comme dans celle du groupe de PINNA Anne-Sophie, nous remarquons aisément l'omniprésence de la classe "Chêne pure," dont la sur-représentation dans la zone d'étude dégrade la qualité de prédiction.

#### Les limites de notre résolution spatiale
La superposition des couches de classifications avec les images satellites démontre l'inadéquation entre la problématique étudiée et la résolution spatiale utilisée. A vue d'oeil, le modèle n'est adapté qu'à l'analyse de groupes d'arbres, composés d'au moins 2 ou 3 individus, où alors d'individus aux caractèristiques dendrométriques très développées. 

Certaines études d’imagerie, même à très haute résolution, souffrent déjà de ces effets : seuls les arbres les plus développés sont détectés ([Jean-Baptiste NDAMIYEHE NCUTIRAKIZA, 2020](https://doi.org/10.19182/bft2020.343.a31848)).

Dans des forêts homogènes, jeunes, à faible diversité spécifique et avec quelques espèces sur-dominantes, une telle résolution ne permet pas d'appréhender efficacement la diversité des populations du milieu.

# Le code
## Les dépendances
Dans cette première partie du code, nous importons les différentes librairies nécessaires à l'affichage de la carte, à savoir :
 
- [leaflet](https://github.com/Leaflet/Leaflet) : bibliothèque JavaScript libre de cartographie en ligne développée par l'ukrainien Vladimir Agafonkin de CloudMade et de nombreux contributeurs.
- [leaflet-providers](https://github.com/leaflet-extras/leaflet-providers.git) : fournisseur de fonds de carte pour Leaflet.
- [leaflet-basemaps](https://github.com/consbio/Leaflet.Basemaps) : contrôle de fonds de carte par tuile pour Leaflet.
- [leaflet-control-opacity](https://github.com/dayjournal/Leaflet.Control.Opacity) : contrôle de l'opacité des couches pour Leaflet.

```html
<head>
  <!-- Add dependencies: Leaflet, leaflet-basemap, leaflet-providers-->
  <link rel="stylesheet" href="leaflet/dist/leaflet.css" />
  <script src="leaflet/dist/leaflet.js"></script>
  <link rel="stylesheet" href="leaflet-basemaps/L.Control.Basemaps.css" />
  <script src="leaflet-basemaps/L.Control.Basemaps-min.js"></script>
  <script src="leaflet-providers/leaflet-providers.js"></script>
  <script src="leaflet-control-opacity/L.Control.Opacity.js"></script>
  <link href="leaflet-control-opacity/L.Control.Opacity.css" rel="stylesheet" />
</head>
```

## La carte
Nous définissons la div contenant la carte ainsi que son emprise par défaut.
```html
<!-- Define the map -->
<div id="map" style="position: absolute; top: 0; left:0; bottom:0; right: 0;"></div>
```
```js
// Here is the map configuration and the controls
var map = L.map('map', {
  center: [43.5988, 1.4391],
  zoom: 9.5,
});
```

## Les fonds de carte
Nous renseignons les différents fonds de carte à utiliser dans la variable *basemaps*, que nous ajoutons ensuite à la carte grâce à la fonction ***map.addControl(L.control.basemaps)*** .

```js      
// Here are the basemaps definition
var basemaps = [
  L.tileLayer('https://data.geopf.fr/private/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&apikey=ign_scan_ws&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    tileSize : 256,
  }),
  L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=HR.ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    tileSize : 256,
  }),
  L.tileLayer('https://maps.utagawavtt.com/styles/utagawavtt/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.utagawavtt.com/">UtagawaVTT</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 22,
    tileSize : 256,
  }),
  L.tileLayer.provider('OpenTopoMap'),
  L.tileLayer.provider('CyclOSM'),
];

map.addControl(L.control.basemaps({
  position: 'bottomright',
  basemaps: basemaps,
  tileX: 66,  // tile X coordinate
  tileY: 46,  // tile Y coordinate
  tileZ: 7   // tile zoom  
}));
```

## Les couches
Nous importons nos 2 couches grâce à la fonction de lecture de flux WMS ***L.tileLayer.wms***. 

Pour la couche *classif_lvl3*, nous ne précisons pas le style à utiliser. Nous utilisons le style par défaut de la carte, soit le style *aknobloc:carte_essences_lvl3*.

Pour la couche *classif_lvl3_P*, nous précisons cette fois le style à utiliser, car différent du style par défaut.

Nous renseignons le paramètre *transparent: true* pour s'assurer de la transparence des valeurs nulles sur la carte importée.


```js 
// Define my reference layer I created with my group in teledetection course
var classif_lvl3 = L.tileLayer.wms('https://www.geotests.net/geoserver/ows?service=WMS', {
  layers: 'aknobloc:carte_essences_lvl3',
  transparent: true,
  format: 'image/png'
  })

// Define my comparison layer, Anne-Sophie PUINNA and her group created in teledetection course, with my stylesheet 
var classif_lvl3_P = L.tileLayer.wms('https://www.geotests.net/geoserver/ows?service=WMS', {
  layers: 'ASPinna:carte_essences_lvl3',
  styles: "aknobloc:classified_map_style",
  transparent: true,
  format: 'image/png',
  })

```

Nous stockons ensuite les variables de couches dans une nouvelle variable *overlays*, que nous affichons à l'aide de la fonction ***map.addControl(L.control.layers())***

```js
var overlays = {
    'Cropped classification lvl3': classif_lvl3,
    'Complete classification lvl3' : classif_lvl3_P}

map.addControl(L.control.layers({}, overlays, {
      collapsed: false,
    }));
```

## Le contrôleur d'opacité

Nous affichons le controleur d'opacité pour les couches stockées dans la variable *overlays* à l'aide de la fonction ***map.addControl(L.control.opacity())***, en renseignant le nom à afficher dans la fenêtre finale. 

```js
map.addControl(L.control.opacity(overlays, {
      label: 'Layers opacity',
      collapsed: false,
    }));
```

## La légende

Pour afficher la légende commune aux 2 couches, nous créons d'abord la variable *legend_simple*, contenant les informations positionnelles du futur encart.

Nous associons ensuite la variable *legend_simple* à une fonction, dont l'objectif est de générer une div contenant l'image utilisée pour la légende.

Pour obtenir la légende de nos cartes, nous lancons une requête *GetLegendGraphic* au server *Geoserver*. Nous récupérons alors le fichier de légende par défaut configuré pour la carte. 

En appelant la variable *legend_simple*, nous générons ainsi une div contenant l'image de la légende et un titre de section, stockés dans la variable *legend_simple* en complément des informations positionnelles. 

Nous pouvons ensuite afficher le contenu de *legend_simple* sur notre carte à l'aide de la fonction ***.addTo(map)*** .

```js
//Add forest Legend
var legend_simple = L.control({position: 'bottomleft'});

legend_simple.onAdd = function (map) {
    let divlegend = L.DomUtil.create('divlegend');
    divlegend.innerHTML = ('<div style = "color : black;">  <strong>Forest legend</strong> <br>'+
    '<img src="https://www.geotests.net/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&transparent=true&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=aknobloc:carte_essences_lvl3" alt="">'+
    '</div>');
    return divlegend;
    };
legend_simple.addTo(map);

```

## Perspectives d'améliorations
Le code présenté ci-dessus est proie à de nombreuses améliorations, la première étant l'ajout d'une légende dynamique. 

Sur la carte actuelle, la légende est figée. Nous affichons simplement l'image reçue de *Geocoder* dans le coin gauche de la fenêtre. 

L'étape suivante serait donc de proposer une légende dynamique, fonction de la couche sélectionnée par l'utilisateur. 

Nous pourrions également travailler sur la donnée source et ainsi améliorer l'interactivité de sa représentation. 

En vectorisant notre image et en lui paramétrant un flux WFS, nous pourrions afficher une carte dynamique, où les attributs de chaque feature seraient visibles au survol.
 
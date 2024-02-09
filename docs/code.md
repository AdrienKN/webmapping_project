---
outline: deep
---

# Le code
## Les dépendances
Dans cette première partie du code, nous importons les différentes librairies nécessaires à l'affichage de la carte, à savoir : 
- [leaflet](https://github.com/Leaflet/Leaflet) : bibliothèque JavaScript libre de cartographie en ligne développée par l'ukrainien Vladimir Agafonkin de CloudMade et de nombreux contributeurs.
- [leaflet-providers](https://github.com/leaflet-extras/leaflet-providers.git) : fournisseur de fonds de carte pour Leaflet.
- [leaflet-basemaps](https://github.com/consbio/Leaflet.Basemaps) : contrôle de fond de carte par tuiles pour Leaflet.
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
Nous renseignons les différents fonds de carte à utiliser dans la variable *basemaps*, que l'on parcours ensuite sur la carte grâce à la fonction ***map.addControl(L.control.basemaps)*** .

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

Nous renseignons le paramètre *transparent: true* pour m'assurer de la transparence des valeurs nulles sur la carte importée.


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

## Le contrôle d'opacité

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


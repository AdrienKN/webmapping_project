---
outline: deep
---

# Le code
## Les dépendances
Dans cette première partie du code, j'importe les différentes librairies nécessaires à l'affichage de la carte, à savoir : 
- [leaflet](https://github.com/Leaflet/Leaflet) : bibliothèque JavaScript libre de cartographie en ligne développée par l'ukrainien Vladimir Agafonkin de CloudMade et de nombreux contributeurs.
- [leaflet-providers](https://github.com/leaflet-extras/leaflet-providers.git) : fournisseur de fonds de carte pour Leaflet.
- [leaflet-basemaps](https://github.com/consbio/Leaflet.Basemaps) : contrôle de fond de carte par tuiles pour Leaflet.

```md
  <head>
    <!-- Add dependencies: Leaflet, leaflet-basemap, leaflet-providers-->
    <link rel="stylesheet" href="leaflet/dist/leaflet.css" />
    <script src="leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="leaflet-basemaps/L.Control.Basemaps.css" />
    <script src="leaflet-basemaps/L.Control.Basemaps-min.js"></script>
    <script src="leaflet-providers/leaflet-providers.js"></script>
  </head>
```

## La carte
Je définis la div contenant la carte ainsi que son emprise par défaut.
```md    
    <!-- Define the map -->
		<div id="map" style="position: absolute; top: 0; left:0; bottom:0; right: 0;"></div>

    // Here is the map configuration and the controls
      var map = L.map('map', {
        center: [46.01055, 6.34217],
        zoom: 13
      });
```

## Les fonds de carte
Je renseigne les différents fonds de carte à utiliser dans la variable **basemaps**, que l'on parcours ensuite sur la carte grâce à la fonction **map.addControl(L.control.basemaps)**

```md    
    <!-- Feed the map layers -->
    <script type="text/javascript">
       
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
        L.tileLayer.provider('OpenStreetMap.Mapnik')
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

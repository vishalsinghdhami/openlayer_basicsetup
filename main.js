import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import OSM from 'ol/source/OSM';
import { get as getProjection } from 'ol/proj';
const projection = new Projection({
  code: 'EPSG:32643',
  units: 'm',
});

const sourceExtent = [456369.752, 2487267.279,457468.662 , 2488352.844]; 
// [minX, minY, maxX, maxY]
const source = new GeoTIFF({
  sources: [
    {
      url:'https://firebasestorage.googleapis.com/v0/b/tif-file-colection.appspot.com/o/bigGeoTif_output_cog.tif?alt=media&token=870d53d7-aae5-49b3-a269-a00f52ada7e2',
      //  'https://tifcollection.s3.ap-south-1.amazonaws.com/bigGeoTif_output_cog.tif',
    },
  ],
});

const layer1 = new TileLayer({
  source: source,
  projection: getProjection('EPSG:32643')
});
const layer2= new TileLayer({
  source: new OSM(),
  projection: getProjection('EPSG:32643')
});
const map=new Map({
  target: 'map-container',
  layers: [layer2],
  view: new View({
    extent: sourceExtent,
    zoom: 1,
  }),
})
var newCenter = ol.proj.fromLonLat([74.5902512572504,22.498497384484125]);
map.getView().setCenter(newCenter);
map.addLayer(layer1);
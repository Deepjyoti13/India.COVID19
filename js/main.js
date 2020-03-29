var map = L.map("map").setView([23.838697, 78.1141228], 5);

// load a tile layer
L.tileLayer("http://tiles.mapc.org/basemap/{z}/{x}/{y}.png", {
  attribution:
    'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
  maxZoom: 6,
  minZoom: 4
}).addTo(map);

// fixed map
var southWest = L.latLng(8.095214, 63.172716),
  northEast = L.latLng(39.124163, 100.350449);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on("drag", function() {
  map.panInsideBounds(bounds, { animate: false });
});

// color
function getColor(d) {
  return d > 70
    ? "#800026"
    : d > 60
    ? "#BD0026"
    : d > 50
    ? "#E31A1C"
    : d > 35
    ? "#FC4E2A"
    : d > 25
    ? "#FD8D3C"
    : d > 10
    ? "#FEB24C"
    : d > 5
    ? "#FED976"
    : "#FFEDA0";
}
function style(feature) {
  return {
    fillColor: getColor(feature.properties.confirmed_case),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7
  };
}

// layer
$.getJSON("india_states.geojson", function(data) {
  // add GeoJSON layer to the map once the file is loaded

  var datalayer = L.geoJson(data, {
    onEachFeature: function(feature, featureLayer) {
      $.getJSON("https://api.covid19india.org/data.json", function(datax) {
        $.each(datax["statewise"], function(key, val) {
          if (val.state != "Total") {
            if (val.state == feature.properties.name) {
              feature.properties.confirmed_case = val.confirmed;
              featureLayer.bindPopup(
                feature.properties.name +
                  "<br/>" +
                  "Confirmed cases : " +
                  val.confirmed +
                  "<br/>" +
                  "Death : " +
                  val.deaths +
                  "<br/>" +
                  "Recovered : " +
                  val.recovered
              );
            }
          }
        });
      });
    },
    style: style
  }).addTo(map);
  map.fitBounds(datalayer.getBounds());
});

// legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 5, 10, 25, 35, 50, 60, 70],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1]
        ? "&ndash;" + grades[i + 1] + "<br>"
        : "+" + "<br>" + "Confirmed cases");
  }

  return div;
};

legend.addTo(map);

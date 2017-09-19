<!DOCTYPE html>
<html>
<head>
    <title>Leaflet Map</title>
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
    
    <style>
        body {
            padding: 0;
            margin: 0;
        }
        html, body, #map {
            height: 100%;
            width: 100%;
        }
    </style>   
</head>
    
<body>
    <!-- Our web map and content will go here -->
    <div id="map"></div>

    <!-- Add the Leaflet JavaScript library -->
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
    
    <!-- Add the jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
    </script>

    
    <script>
    // Create variable to hold map element, give initial settings to map
    var map = L.map('map',{ center: [34.735450, -119.990435], zoom: 10});
        
    // Add OpenStreetMap tile layer to map element
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    
        var overlayMaps = {
        "Fire Boundary": boop,
        "Fire Stations": stations
    };    
        
    // Create an Empty Popup
    var popup = L.popup();
            
        
    // Load sb fire data geoJSON data from external file
    var boop = $.getJSON("sbfirePLEASE.geojson",function(data){
        // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data,{
        style: function (feature) {
            var fillColor,
                haz = feature.properties.HAZ_CLASS;
              if ( haz == 'Moderate' ) fillColor = "#ffff4d";
              else if ( haz == 'High' ) fillColor = "#ffa64d";
              else if ( haz =='Very High' ) fillColor = "#ff3333";
              else fillColor == "#f7f7f7";  // no data
              return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    }
    }).addTo(map);
    });   
        
        
    var stations = $.getJSON("sbcFireStations.geojson",function(data){
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
        var marker = L.marker(latlng);
        marker.bindPopup('<b>' + feature.properties.Station + '</b>' + '<br/>' + feature.properties.Street + '<br/>' + feature.properties.City + '<br/>' + feature.properties.Phone);
    return marker; 
        }
    }).addTo(map);
    });
          
//    var legend = L.control({position: 'bottomleft'});
//    legend.onAdd = function (map) {
//
//    var div = L.DomUtil.create('div', 'info legend');
//    labels = ['<strong>Categories</strong>'],
//    categories = ['Moderate','High','Very High'];
//
//    for (var i = 0; i < categories.length; i++) {
//
//            div.innerHTML += 
//            labels.push(
//                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
//            (categories[i] ? categories[i] : '+'));
//
//        }
//        div.innerHTML = labels.join('<br>');
//    return div;
//    };
//    legend.addTo(map);
//        
//    var baseLayers = {
//        
//    };
        
  
    
    // initialize up the L.control.layers
    L.control.layers(null, overlayMaps).addTo(map);
        
    </script>
    

</body>
</html>

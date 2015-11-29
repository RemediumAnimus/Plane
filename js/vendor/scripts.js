$(document).ready(function() {

function initialize() {
    var mapOptions = {
       zoom: 4,
       mapTypeId: google.maps.MapTypeId.HYBRID,
       center: new google.maps.LatLng(42.558992, 40.539854)
    };

    var flightPlanCoordinates = [
       {lat: 55.7177713, lng: 37.6091254},
       {lat: 46.7000871, lng: 3.4228421},
       {lat: 26.7746408, lng: 26.3032135},
    ];

    var lineSymbol = {
        path: 'M59,0c3.7,1.1,2.9,0.8,5,3c-3.2,9.7-10.4,13.9-16,21c2.3,12,4.7,24,7,36c-1.7,1.3-3.3,2.7-5,4c-0.3,0-0.7,0-1,0 c-4.7-9-9.3-18-14-27c-2,1.7-4,3.3-6,5c-0.6,8.3-0.8,14-7,17c-3.1-12.9-7.7-11.9-17-18c1.3-1.7,2.7-3.3,4-5c10.3,0.4,13.9-1.4,18-7 c0-0.3,0-0.7,0-1c-9-4.7-18-9.3-27-14c1.3-1.7,2.7-3.3,4-5c0.3,0,0.7,0,1,0c12,2.3,24,4.7,36,7C47,10.7,53,5.3,59,0z',
        fillColor: '#fc7307',
        fillOpacity: 0,
        scale: 0.4,
        strokeColor: '#fda25b',
        strokeWeight: 1,
        rotation: 315,
        anchor: new google.maps.Point(10, 58)
    };

    var flightPath = new google.maps.Polyline({
       path: flightPlanCoordinates,
       icons: [{
          icon: lineSymbol,
          offset: '100%',
        }],
       geodesic: true,
       strokeColor: '#b8e2ff',
       strokeOpacity: 0,
       strokeWeight: 3,
       map: map,
    });

    var count = 0;
    setTimeout(function(){
        var timer;
        var count = 0;
        timer = setInterval(function(){
            if (count>=1) {
                clearInterval(timer);
            } else {
                flightPath.strokeOpacity = flightPath.strokeOpacity + 0.02;
                lineSymbol.fillOpacity = lineSymbol.fillOpacity + 0.02;
            }
            count = count + 0.02;
        },25);
    },1400);

    var marker;
    var map = new google.maps.Map(document.getElementsByClassName('map')[0],mapOptions);
    var image = {
        url: 'img/mark.png',
        anchor: new google.maps.Point(10, 42)
    };

    var animateMarker = (function() {
        var j = 0;
        return function(){
            setTimeout(function(){
                var coords = {
                   lat: flightPlanCoordinates[j].lat,
                   lng: flightPlanCoordinates[j].lng,
                }
                var marker = new google.maps.Marker({
                   position: coords,
                   map: map,
                   animation: google.maps.Animation.DROP,
                   icon: image,
                });
                j++;
                if (j!=flightPlanCoordinates.length) {
                    animateMarker();
                }
            },300);
        }
    })();
    animateMarker();
    flightPath.setMap(map);
    animateCircle(flightPath);
}
function animateCircle(line) {
    setTimeout(function(){
        var count = 0;
        window.setInterval(function() {
          count = (count + 1) % 200;

          var icons = line.get('icons');
          icons[0].offset = (count / 2) + '%';
          line.set('icons', icons);
      }, 20);
    },1500);
}
initialize();


});

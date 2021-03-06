Backbone.MapView = Backbone.CompositeView.extend({ 
	restartPolyLine: function () {
		
    this.initializeMap();
		this.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		this.$el.find('.distance-field').text('0 Miles');
    this.$el.find('.elevation-field').text('0 ft');
	},
  
	initializeMap: function() {
          // this.getUserLocation();
          this.map = new google.maps.Map(this.$el.find('#map')[0], this.mapOptions);
          this.service = new google.maps.DirectionsService();
          this.path = new google.maps.MVCArray();
          this.elevationGain = 0;
          this.poly = new google.maps.Polyline({ map: this.map, strokeColor: "#0066FF" });
          this.elevations = new google.maps.ElevationService();
          this.distance = 0; //accumulator used to get total distance
          this.heartRate = 0;
          this.time = 0;
          this.markers = [];
          this.elevationsAlongPath = [];
          this.pathCache = [];
          this.distanceCache = [];
          this.elevationCache = [];
          this.markerCache = [];
          this.mapOptions = {
    		    zoom: 3,
    		    center: new google.maps.LatLng(37.7833, -122.4167)
          };
        google.maps.event.addListener(this.map, "click", this.mapUpdated.bind(this));
    },

    placeMarker: function(evt) {
            var marker = new google.maps.Marker({ 
                position: evt.latLng, 
                map: this.map 
              });
            this.markers.push(marker);
            this.map.panTo(evt.latLng);
    },

    getCaloriesBurned: function (age, weight, heartRate, gender, totTime) {
    if (gender==='m') {
      var ageConst = 0.2017,
        weightConst = 0.09036,
        hrConst = 0.6309,
        subt = 55.0969;
    } else {
       ageConst = 0.2017;
       weightConst = 0.09036;
       hrConst = 0.6309;
       subt = 55.0969;
    }
    var numerator = (((age * ageConst) - ((weight/2.2) * weightConst) 
            + (heartRate * hrConst) - subt) * totTime)
    return Math.round(numerator/4.184)
  },

    saveMap: function() {
  		var view = this;
      var calories = this.getCaloriesBurned(21, 150, this.heartRate, 'm', this.time);
  		debugger;
      this.backboneMap.set({
  			"path": (JSON.stringify(this.poly.getPath())),
        'heart_rate': this.heartRate,
        'minutes': this.time,
        "elevations": JSON.stringify(_.flatten(view.elevationsAlongPath)),
        "elevation_gain": this.elevationGain,
  			"total_miles": view.distance,
        "calories": calories 
  		});
      
  		this.backboneMap.save({},{
        success: function(resp, msg){
          $('.message-success').css('display','block').fadeOut(2500);
          view.restartPolyLine();
          view.render();
        }
      });	
	 },

   
});


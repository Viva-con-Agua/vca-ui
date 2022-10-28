<template>
  <div>
    <div id="map"></div>
    <div v-if="isLoaded" class="vca-mapdata">
      <div class="vca-center">
        <button v-if="!disabled && !hideButtons" class="vca-button-small" @click="removeMarker">remove marker</button>
        <button v-if="!hideButtons" class="vca-button-small" @click="centerMarker">center current</button>
        <button v-if="!hideButtons" class="vca-button-small" @click="fitBounds">show all</button>
      </div>
      <vca-input v-if="!hideFields" :disabled="disabled" placeholder="Title" @input="updateMapsMarker" v-model="current.title" />
      <vca-input v-if="!hideFields" :disabled="disabled" placeholder="Subtitle" @input="updateMapsMarker" v-model="current.subtitle" />
      <vca-input v-if="!hideFields" :disabled="disabled" placeholder="Latitude" @input="updateMapsMarker" v-model="current.position.lat" />
      <vca-input v-if="!hideFields" :disabled="disabled" placeholder="Longitude" @input="updateMapsMarker" v-model="current.position.lng" />
      <vca-dropdown v-if="!disabled && !hideFields" :options="markerTypes" @input="updateMapsMarker" label="" v-model="current.type" placeholder="Marker Type" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "VcaMap",
    props: {
      value: {
        type: Array,
        default: function() {
          return []
        }
      },
      markerTypes: {
        type: Array,
        default: function() {
          return [
            { title: 'Default', subtitle: 'Default marker', label: 'Default', icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png', value: 'default' },
            { title: 'Info', subtitle: 'Information', label: 'Info', icon: 'http://maps.google.com/mapfiles/kml/shapes/info.png', value: 'info' },
            { title: 'Camping', subtitle: 'Unser Campingplatz', label: 'Camping', icon: 'http://maps.google.com/mapfiles/kml/shapes/campground.png', value: 'camping' },
            { title: 'Parking', subtitle: 'Parkplatz', label: 'Parking', icon: 'http://maps.google.com/mapfiles/kml/shapes/parking_lot.png', value: 'parking' },
            { title: 'Meet', subtitle: 'Unser Treffpunkt', label: 'Meet', icon: 'http://maps.google.com/mapfiles/kml/shapes/poi.png', value: 'meeting' },
            { title: 'Check-In', subtitle: 'Check-In', label: 'Check-In', icon: 'http://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png', value: 'checkin' }
          ]
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      hideFields: {
        type: Boolean,
        default: false
      },
      hideButtons: {
        type: Boolean,
        default: false
      },
      center: {
        type: Object,
        default: function() {
          return { lat: 53.5579, lng: 9.9683 }
        }
      }
    },
    watch: { 
      center: function(center) {
        this.gotoCenter(center)
      }
    },
    data() { 
      return {
        // List for a simple marker object
        markerList: [],
        // List of all google maps markers
        mapsMarker: [],
        currentCenter: this.center,
        zoom: 5,
        map: null,
        current: {
          id: null,
          position: {
            lat: '',
            lng: ''
          },
          title: '',
          subtitle: '',
          type: []
        }
      }
    },
    methods: {
        // Check if google api is loaded
        isLoaded() {
          return window.google
        },
        // Change listener, called if any field in the form is edited
        change() {
          this.updateMarkerList()
          this.$emit('input', this.markerList)
        },
        // Center the map to the current 
        gotoCenter(center) {
          if (center.lat && center.lng) {
            this.map.panTo(center)
            this.map.setZoom(18)
          }
        },
        // Zoom map so that every marker is vivisble
        fitBounds() {
          var bounds = new window.google.maps.LatLngBounds();

          this.mapsMarker.forEach((myMarker) => {
            bounds.extend(myMarker.position)
          })

          this.map.fitBounds(bounds)
        },
        // Listener is called, when the current Marker should be centered
        centerMarker() {
          this.gotoCenter(new window.google.maps.LatLng(Number(this.current.position.lat), Number(this.current.position.lng)))
        },
        // Add a new marker to the map
        addMarker(markerArg) {

          // Search for the marker in the given marker types by its value
          var index = this.markerTypes.findIndex((el) => el.value == markerArg.type)
          var markerType = this.markerTypes[0]
          if (index !== -1) {
            markerType = this.markerTypes[index]
          }

          // Add new marker to the map
          var marker = new window.google.maps.Marker({
            map: this.map,
            draggable: !this.disabled,
            animation: window.google.maps.Animation.DROP,
            id: markerArg.id,
            position: markerArg.position,
            title: markerArg.title + "\n" + markerArg.subtitle,
            icon: markerType.icon,
            type: markerType.value
          });

          // Add listeners for drag ends and clicking
          marker.addListener('dragend', () => {
            this.handleClick(marker)
          });

          marker.addListener('click', () => {
            this.handleClick(marker)
          });

          marker.addListener('rightclick', () => {
            this.handleClick(marker)
            this.removeMarker()
          });

          // Perform a click on the current marker to make it accessible in the form
          this.handleClick(marker)

          // Push marker to the lists
          this.markerList.push(markerArg)
          this.mapsMarker.push(marker)

          this.change()

        },
        // Updates markes on the map
        updateMapsMarker() {

          // Check if there is a marker on the map
          var index = this.mapsMarker.findIndex((el) => el.id == this.current.id)
          if (index == -1) {
            return
          }

          this.mapsMarker[index].setPosition(new window.google.maps.LatLng(Number(this.current.position.lat), Number(this.current.position.lng)))
          this.mapsMarker[index].setTitle(this.current.title + "\n" + this.current.subtitle)

          // If the current marker has no type, we use the default type
          if (this.current.type[0] === undefined) {
            this.current.type = [ { value: this.markerTypes[0].value } ]
          }

          this.mapsMarker[index].type = this.current.type[0].value

          var iconIndex = this.markerTypes.findIndex((el) => el.value == this.current.type[0].value)
          this.mapsMarker[index].setIcon(this.markerTypes[iconIndex].icon)

          this.change()
          
        },
        // Removes a marker from the map and resets the current marker
        removeMarker() {

          this.mapsMarker.forEach((myMarker, index) => {
            if (this.current.id == myMarker.id) {
              this.mapsMarker[index].setMap(null)
              this.mapsMarker.splice(index, 1)
              this.markerList.splice(index, 1)
            }
          })

          this.current.position.lat = ''
          this.current.position.lng = ''

          this.current.id = null
          this.current.title = ''
          this.current.subtitle = ''
          this.current.type = []

          this.change()

        },
        updateMarkerList() {

          // Search for current marker in the marker list
          var index = this.markerList.findIndex((el) => el.id == this.current.id)
          if (index == -1) {
            return
          }

          // Update the current marker in the marektList to the new values
          this.markerList[index].position = { lat: Number(this.current.position.lat), lng: Number(this.current.position.lng)}
          this.markerList[index].title = this.current.title
          this.markerList[index].subtitle = this.current.subtitle
  
          // If the current marker has no type, we use the default type
          if (this.current.type[0] === undefined) {
            this.current.type = [ { value: this.markerTypes[0].value } ]
          }

          this.mapsMarker[index].type = this.current.type[0].value

        },
        // Handles a click on a marker to set it to the curret marker
        handleClick(marker) {

          this.current.position.lat = marker.position.lat().toString()
          this.current.position.lng = marker.position.lng().toString()

          let desc = marker.title.split("\n")

          this.current.id = marker.id
          this.current.title = desc[0]
          this.current.subtitle = desc[1]

          this.current.type = [ { value: marker.type } ]

          this.change()

        },
        mapCallback() {
          // Check if there is any value given and center first element
          if (this.value.length > 0) {
            this.currentCenter = { lat: Number(this.value[0].position.lat), lng: Number(this.value[0].position.lng)}
            this.zoom = 12
          }

          // Create the map
          this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: this.zoom,
            center: this.currentCenter,
          });

          // If map is not disabled, add onClick handler for adding new markers
          if (!this.disabled) {
            this.map.addListener('click', (e) => {
              this.addMarker({
                id: Math.random().toString(),
                position: e.latLng,
                title: '',
                subtitle: '',
                type: ''
              })
            });
          }

          // Add all markers from the value prop to the map
          if (this.value.length > 0) {
            this.value.forEach(marker => {
              this.addMarker(marker)
            })
          }

          if (this.value.length > 0) {
            this.fitBounds()
          }

      }
    },
    mounted() {

      if (this.isLoaded()) {
        this.mapCallback()
        return;
      }

      // eslint-disable-next-line
      console.error('Please include the Google Maps API in your index.html- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[[API_KEY]]&libraries=places" ><\/script>')

    }

  }
</script>
<style lang="scss">
#map {
    height: 400px;
    width: 100%;
    margin-bottom: 15px;
}
</style>
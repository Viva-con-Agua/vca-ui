<template>
  <div class="vca-input" :class="{error: hasError === true, valid: hasError === false}">
    <input type="text" ref="autocompleteAddress"/>
    <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
    <span v-else></span>
  </div>
</template>

<script>
  export default {
    name: "VcaLocation",
    props: {
      type: {
        type: String,
        default: 'geocode',
        validator: function (value) {
          // The value must match one of these strings
          return ['address', 'geocode', 'establishment'].indexOf(value) !== -1
        }
      },
      errorMsg: {
          type: String,
          default: ''
      },
      rules: {
          type: Object,
          default: null
      }
    },
    data() { 
      return {
        hasError: null,
        locationType: this.type,
        currentAddress: {
          name: '',
          street: '',
          number: '',
          zip: '',
          city: '',
          sublocality: '',
          country: '',
          countryCode: '',
          position: {
            lat: '',
            lng: ''
          },
          placeId: '',
        },
        autocomplete: null
      }
    },
    methods: {
        validate() {
          this.hasError = false
          if (this.rules !== null && this.rules.$invalid) {
            this.hasError = true
          }
        },
        autocompleteCallback() {

        // Load autocomplete from google places
        this.autocomplete = new window.google.maps.places.Autocomplete(
          (this.$refs.autocompleteAddress),
          {types: [this.locationType]}
        );
        
        // Add listener for changing of place
        this.autocomplete.addListener('place_changed', () => {

          // Get values from places
          let place = this.autocomplete.getPlace();

          if (place.address_components === undefined) {
            return
          }

          let ac = place.address_components;

          let name = place.name
          let street = ac.find(field => field.types.some(t => t === "route")) //ac[ac.length-1]["long_name"];
          let street_number = ac.find(field => field.types.some(t => t === "street_number")) //ac[ac.length-1]["short_name"];
          let zip = ac.find(field => field.types.some(t => t === "postal_code")) //ac[ac.length-1]["short_name"];
          let city = ac.find(field => field.types.some(t => t === "locality")) //ac[0]["long_name"];
          let sublocality = ac.find(field => field.types.some(t => t === "sublocality")) //ac[0]["long_name"];
          let country = ac.find(field => field.types.some(t => t === "country")) //ac[ac.length-1]["long_name"];

          // Set place id
          this.currentAddress.placeId = place.place_id
          this.currentAddress.name = name

          // Set geolocation informations
          if (place.geometry.location) {
            this.currentAddress.position.lat = place.geometry.location.lat()
            this.currentAddress.position.lng = place.geometry.location.lng()
          }

          // Set address elements
          if(typeof street !== "undefined") {
            this.currentAddress.street = street.long_name;
          }

          if (typeof street_number !== "undefined") {
            this.currentAddress.number = street_number.long_name;
          }

          if(typeof zip !== "undefined") {
            this.currentAddress.zip = zip.short_name;
          }

          if(typeof city !== "undefined") {
            this.currentAddress.city = city.long_name;
          }

          if(typeof sublocality !== "undefined") {
            this.currentAddress.sublocality = sublocality.long_name;
          }

          if(typeof country !== "undefined") {
            this.currentAddress.country = country.long_name;
            this.currentAddress.countryCode = country.short_name;
          }

          // Emit new address
          this.$emit('input', this.currentAddress)
        });

      }
    },
    mounted() {

      if (window.google) {
        this.autocompleteCallback()
        return;
      }

      // eslint-disable-next-line
      console.error('Please include the Google Maps API in your index.html- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[[API_KEY]]&libraries=places" ><\/script>')

    }

  }
</script>
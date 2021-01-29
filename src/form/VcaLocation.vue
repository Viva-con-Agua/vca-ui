<template>
  <div class="vca-input">
    <input type="text" ref="autocompleteAddress"/>
  </div>
</template>

<script>
  export default {
    name: "VcaLocation",
    props: {
      apiKey: {
        type: String,
        default: null
      },
      language: {
        type: String,
        default: 'de'
      }
    },
    data() { 
      return {
        currentAddress: {
          street: '',
          number: '',
          zip: '',
          city: '',
          sublocality: '',
          country: '',
          countryCode: '',
          meta: {
            latitude: '',
            longitude: '',
            placeId: '',
          }
        },
        autocomplete: null
      }
    },
    methods: {
        autocompleteCallback() {

        // Load autocomplete from google places
        this.autocomplete = new window.google.maps.places.Autocomplete(
          (this.$refs.autocompleteAddress),
          {types: ['address']}
        );
        
        // Add listener for changing of place
        this.autocomplete.addListener('place_changed', () => {

          // Get values from places
          let place = this.autocomplete.getPlace();
          let ac = place.address_components;
          let street = ac.find(field => field.types.some(t => t === "route")) //ac[ac.length-1]["long_name"];
          let street_number = ac.find(field => field.types.some(t => t === "street_number")) //ac[ac.length-1]["short_name"];
          let zip = ac.find(field => field.types.some(t => t === "postal_code")) //ac[ac.length-1]["short_name"];
          let city = ac.find(field => field.types.some(t => t === "locality")) //ac[0]["long_name"];
          let sublocality = ac.find(field => field.types.some(t => t === "sublocality")) //ac[0]["long_name"];
          let country = ac.find(field => field.types.some(t => t === "country")) //ac[ac.length-1]["long_name"];

          // Set place id
          this.currentAddress.meta.placeId = place.place_id

          // Set geolocation informations
          if (place.geometry.location) {
            this.currentAddress.meta.latitude = place.geometry.location.lat()
            this.currentAddress.meta.longitude = place.geometry.location.lng()
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

      // Check if script is already added
      let gapi = document.getElementById('vca_gapi')

      if (gapi !== null) {
        return;
      }

      // If script is not added, add it to head
      let placesApi = document.createElement('script')
      placesApi.setAttribute('id', 'vca_gapi')
      placesApi.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=places&language=' +  this.language)

      // Set callback function if script is loaded
      placesApi.onload = () => this.autocompleteCallback()

      document.head.appendChild(placesApi)

    }

  }
</script>
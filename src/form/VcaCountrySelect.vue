<template>
    <div class="vca-country-select" :class="{error: hasError}">
        <label class="container">
            <country-select :class="{error: hasError}" placeholder="Bitte wähle ein Land" v-model="selectedCountry" topCountry="DE" />
        </label>
        <span v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
    name: 'VcaCountrySelect',
    props: {
        country: {
            type: String,
            default: ''
        },
        errorMsg: {
            type: String,
            default: 'Please select'
        },
        label: {
            type: String,
            default: ""
        },
        req: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            hasError: false,
            selectedCountry: this.country
        }
    },
    watch: { 
        selectedCountry: function() {
            this.validate()
        }
    },
    methods: {
        // validate form via vuelidate
        validate () {
            // if validate is set
            if (this.req && this.selectedCountry == '') {
                this.hasError = true
            } else {
                this.hasError = false
            }
        }
    }
}
</script>

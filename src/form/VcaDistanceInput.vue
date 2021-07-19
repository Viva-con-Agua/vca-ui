<template>
    <div class="vca-input vca-label-field" :class="{error: hasError === true, valid: hasError === false}">
        <div class="vca-input-label">
            <div class="vca-labeled-input-container">
                <div class="top-text" v-if="topText"> {{ topText }} </div>

                <div class="input-fields">
                    <input 
                    ref="ta"
                    class="left"
                    type="number"
                    v-model="distance_data.km" 
                    placeholder="0" 
                    min="0"
                    @input="changeKm"
                    @blur="validate"
                    @change="change">
                    
                    <span class="middle">,</span>
                    <input 
                    ref="ta"
                    class="middle"
                    type="number"
                    v-model="distance_data.meter" 
                    placeholder="000"
                    :maxlength="max_meter"
                    @change="change"
                    @blur="validate"
                    @input="changeMeter">
                    <div class="currency-label">
                        <label class="currency-select"> KM </label>
                    </div>
                </div>
            </div>
        </div>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Distance from '../utils/Distance'
export default {
    name: 'VcaDistanceInput',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            'type': String,
            'default': ''
        },
        topText: {
            'type': String,
            'default': ''
        },
        errorMsg: {
            type: String,
            default: ''
        },
        rules: {
            type: Object,
            default: null
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            max_meter: 3,
            distance_data: Distance.getData(this.value),
            hasError: null,
            hasFocus: false,
            lastLength: 0,
            lastPos: 0,
        }
    },
    watch: { 
      value: function(nVal) {
        this.distance_data = Distance.getData(nVal)
      }
    },
    methods: { 
        setFocus () {
            this.lastLength =  this.$refs.ta.value.length
            this.lastPos =  this.$refs.ta.selectionStart
            this.hasFocus = true
        },
        validate () {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        },
        change() {
            this.$emit("input", Distance.getValue(this.distance_data))
        },
        changeMeter(){
            if (this.distance_data.meter === "") {
                this.distance_data.meter = 0
            }
            this.change()
        },
        changeKm(){
            if (this.distance_data.km >= 999) {
                this.distance_data.km = 999
            }
            if (this.distance_data.km === "") {
                this.distance_data.km = 0
            }
            this.change()
        }
    }

}
</script>
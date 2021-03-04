<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-labeled-input">
            <div class="vca-labeled-input-container" :class="{focus: hasFocus}">
                <label v-if="topText"> {{ topText }} </label>
                <div class="vca-right vca-input-container">
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
                     placeholder="0" 
                      :maxlength="max_meter"
                     @change="change"
                     @blur="validate"
                     @input="changeMeter">
                </div> 
            </div>
            <div class="currency-label">
                <label class="currency-select"> KM </label>
            </div>
        </div>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Distance from '@/utils/Distance'
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
            max_meter: 1,
            distance_data: Distance.getData(this.value),
            hasError: false,
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
            if (this.distance_data.meter.length > 1){
                this.distance_data.meter = this.distance_data.meter[1]
            }
            this.change()
        },
        changeKm(){
            if (this.distance_data.km >= 120) {
                this.distance_data.km = 120
            }
            if (this.distance_data.km === "") {
                this.distance_data.km = 0
            }
            this.change()
        }
    }

}
</script>
<style scoped>

input[class*="left"] {
    text-align: right;
}
input[class*="middle"] {
    text-align: left;
}

</style>

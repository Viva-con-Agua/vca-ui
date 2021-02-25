<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-labeled-input">
            <div class="vca-labeled-input-container" :class="{focus: hasFocus}">
                <label v-if="topText"> {{ topText }} </label>
        <div class="vca-flex-cell vca-input-container vca-right">
            <input 
             ref="ta"
             type="number"
             v-model="time_data.hours"
             :placeholder="label"
             min="0"
             @input="changeHours"
             @blur="validate"
             @change="change">
            <span class="middle"> : </span>
            <input 
             ref="ta"
             class="middle"
             type="number"
             v-model="time_data.minutes" 
             :placeholder="label" 
             min="0"
             max="59"
             @change="change"
             @blur="validate"
             @input="changeMinutes">
            <span class="middle"> : </span>
            <input 
             ref="ta" 
             class="middle"
             type="number"
             v-model="time_data.seconds" 
             :placeholder="label" 
             min=0
             max=59
             @change="change"
             @blur="validate"
             @input="changeSecond">
        </div>
            </div>
            <div class="currency-label">
                <label class="currency-select"> Zeit </label>
            </div>
        </div>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Time from '@/utils/Time'
export default {
    name: 'VcaTimeInput',
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
            default: ''
        }
    },
    data () {
        return {
            time_data: Time.getTimeDate(this.value),
            hasError: false,
            hasFocus: false,
            lastLength: 0,
            lastPos: 0,
        }
    },
    methods: {
        changeHours(){
            this.time_data.hours = Time.validateHours(this.time_data.hours)
            this.change()
        },
        changeMinutes(){
            this.time_data.minutes = Time.validate(this.time_data.minutes)
            this.change()
        },
        changeSecond(){
            this.time_data.seconds = Time.validate(this.time_data.seconds)
            this.change()
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
            this.$emit("input", Time.getValue(this.time_data))
        }
    }
}
</script>
<style scoped>

input[type=number] {
    text-align: center;
}

</style>

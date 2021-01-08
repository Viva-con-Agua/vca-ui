<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-labeled-input">
            <div class="vca-labeled-input-container" :class="{focus: hasFocus}">
                <label v-if="topText"> {{ topText }} </label>
        <div class="vca-flex-cell vca-right">
            <input 
             ref="ta"
             type="number"
             v-model="time_data.hours"
             :placeholder="label"
             min="0"
             @input="changeHours"
             @blur="change">
            <span class="middle"> : </span>
            <input 
             ref="ta"
             class="middle"
             type="number"
             v-model="time_data.minutes" 
             :placeholder="label" 
             min="0"
             max="59"
             @blur="change"
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
             @blur="change"
             @input="changeSecond">
        </div>
            </div>
            <div class="currency-label">
                <label class="currency-select"> Zeit </label>
            </div>

        </div>
        <span v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Time from '@/utils/Time'
export default {
    name: 'VcaTimeInput',
    props: {
        time: {
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
        placeholder: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            time_data: Time.getTimeDate(this.time),
            value: this.time,
            hasError: false,
            hasFocus: false,
            lastLength: 0,
            lastPos: 0,
        }
    },
    methods: {
        changeHours(){
            this.time_data.hours = Time.validateHours(this.time_data.hours)
        },
        changeMinutes(){
            this.time_data.minutes = Time.validate(this.time_data.minutes)
        },
        changeSecond(){
            this.time_data.seconds = Time.validate(this.time_data.seconds)
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
        

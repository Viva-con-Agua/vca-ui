<template>
    <div class="vca-progress">
        <span class="progress-label">{{ label }}</span> 
        <div class="progress">
            <div class="progress-bar" :style="{ width: width }"></div>
        </div>
        <div class="progress-scale vca-center" v-if="showScale">
            <div class="vca-left">0</div>
            <div class="vca-right">100</div>
        </div>
        <span class="progress-sub"> {{ subtitle }} </span>
    </div>
</template>
<script>
export default {
    name: 'VcaProgressBar',
    props: {
        label: {
            type: String,
            default: ""
        },
        subtitle: {
            type: String,
            default: ""
        },
        showScale: {
            type: Boolean,
            default: false
        },
        current: {
            type: Number,
            default: 0
        },
        finish: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            width: Math.min(100 / this.finish * this.current, 100) + "%"
        }
    }

}
</script>

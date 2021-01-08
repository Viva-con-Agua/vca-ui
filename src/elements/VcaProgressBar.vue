<template>
    <div class="vca-progress">
        <span class="card-input-label">{{ label }}</span> 
    <div id="progress">
        <div class="progress-bar" :style="{ width: width }"></div>
    </div>
    <span class="card-input-sub"> {{ subtitle }} </span>
    </div>
</template>
<script>
export default {
    name: 'VcaProgressBar',
    props: {
        label: {
            type: String,
            default: function() {
                return ""
            }
        },
        subtitle: {
            type: String,
            default: function() {
                return ""
            }
        },
        current: {
            type: Number,
            default: function() {
                return 0
            }
        },
        finish: {
            type: Number,
            default: function() {
                return 100
            }
        }
    },
    data () {
        return {
            width: Math.min(100 / this.finish * this.current, 100) + "%"
        }
    }

}
</script>

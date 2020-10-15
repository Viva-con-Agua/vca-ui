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
            width: 100 / this.finish * this.current + "%"
        }
    }

}
</script>
<style scoped>
.vca-progress {
    text-align: left;
    font-size: large;
    padding: 0.6em;
}
#progress {
    width: 100%;
    border-top: solid thin #008fc3;
    border-left: solid thin #008fc3;
    border-bottom: solid thin #008fc3;
    border-right: solid thin #008fc3;
}

.progress-bar {
    width: 1%;
    height: 30px;
    background-color: #1f1b6e;
}
</style>

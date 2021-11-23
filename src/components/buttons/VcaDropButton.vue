<template>
    <button class="btn-drop" :class="{'btn-drop-selected': isSelected}" @click.prevent="triggerCallback">
        <slot></slot>
    </button>
</template>
<script>

export default {
    name: 'VcaDropButton',
    data () {
        return {
            isSelected: this.selected
        }
    },    
    watch: { 
      selected: function(nVal) {
        this.isSelected = nVal
      }
    },
    props: {
        selected: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        triggerCallback(e) {
            // eslint-disable-next-line
            this.isSelected = true
            this.$emit("click", e)
        }
    }
}
</script>
<template>
  <div class="btn-center-container">
    <button v-for="item in selection" :key="item.value" class="selection-button" :class="btnSelected(item.value)" @click.prevent="triggerCallback(item.value)">{{ item.label }}</button>
  </div>
</template>
<script>

export default {
    name: 'VcaSelection',
    data () {
        return {
            selected: 0
        }
    },
    props: {
        value: {
            type: String
        },
        selection: {
            type: Array,
            default: function() {
                return [ { value: '0', label: "" } ]
            }
        },
    },
    methods: {
        triggerCallback(e) {
            this.selected = e
            this.$emit("input", e)
        },
        btnSelected(val) {
            return (val == this.value) ? 'selection-btn-selected' : '';
        },
    }
}
</script>
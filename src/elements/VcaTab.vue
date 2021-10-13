<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'VcaTab',
    props: {
        title: { required: true },
        selected: { default: false}
    },
    watch: {
        selected: function(val) {
          this.isActive = val
        }
    },
    data() {
        return {
            isActive: false
        };
    },
    mounted() {
        this.isActive = this.selected;
    }
}
</script>

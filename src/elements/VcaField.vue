<template>
    <div class="vca-field">
        <div class="vca-field-label">
            <label v-if="hasLabel"> {{ label }} </label>
        </div>
        <div class="vca-field-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VcaField',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    computed: {
        hasLabel () {
            if (this.label === '') {
                return false
            } else {
                return true
            }
        }
    }

}
</script>

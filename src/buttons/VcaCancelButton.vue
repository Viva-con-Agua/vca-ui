<template>
    <div class="cancel-button">
      <button @click.prevent="submit" target="_blank" class="button">{{ placeholder }}</button>
    </div>
</template>
<script>

export default {
    name: 'VcaCancelButton',
    props: {
        placeholder: {
            type: String,
            default: "X"
        },
        callback: {
            type: String,
            default: "click"
        }
    },
    methods: {
        submit() {
            this.$emit(this.callback)
        }
    }
}
</script>
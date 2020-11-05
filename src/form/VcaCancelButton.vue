<template>
  <div>
    <div class="cancel-button">
      <a @click.prevent="submit" target="_blank" class="button">{{ placeholder }}</a>
    </div>
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
            default: "cancel"
        }
    },
    methods: {
        submit() {
            this.$emit(this.callback)
        }
    }
}
</script>
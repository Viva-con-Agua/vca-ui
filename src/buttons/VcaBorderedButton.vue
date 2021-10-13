<template>
  <div>
    <div class="border-button">
      <a @click.prevent="submit" target="_blank" class="button">{{ placeholder }}</a>
      <div class="border-bottom"></div>
    </div>
  </div>
</template>
<script>

export default {
    name: 'VcaBorderedButton',
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        callback: {
            type: String,
            default: "submit"
        }
    },
    methods: {
        submit() {
            this.$emit(this.callback)
        }
    }
}
</script>
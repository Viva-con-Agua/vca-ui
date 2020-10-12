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
<style type="text/css">

.cancel-button {
  display: flex;
  position: relative;

  margin-right: 10px;
}

.cancel-button .button {
  text-decoration: none;
  background-color: #882222;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;

  outline: none;
  line-height: 40px;
  font-size: 18px;

  cursor: pointer;
  padding: 0 15px;
  width: 100%;
}

@media only screen and (max-width: 500px) {

  .cancel-button .button {
    font-size: 12px;
  }
}


</style>
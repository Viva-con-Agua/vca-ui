<template>
    <div class="popup-container" v-if="visible">
      <div class="popup-background" />
      <div class="popup">
        <div class="popup-header">
          {{ title }}
          <span @click="hide">X</span>
        </div>
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
    
</template>
<script>
export default {
    name: 'VcaPopup',
    props: {
        title: {
            type: String,
            default: ""
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
        visible: this.show
      }
    },
    methods: {
        hide() {
          this.$emit("close")
          this.visible = false
        }
    },
    watch: { 
      show: function(nVal) {
        this.visible = nVal
      }
    },
}
</script>
<style>
.popup-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
}
.popup-background {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: block;
  z-index: 100;
}  
.popup {
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 100px auto;
  position: relative;
  width: 80%;
  height: auto;
  max-height: 80%;
  z-index: 200;
}

.popup-content {
  overflow: scroll;
  padding: 10px;
}

.popup-header {
  padding: 5px 10px 3px 10px;
  font-weight: bold;
  font-weight: 1.25em;
  min-height: 21px;
  border-bottom: solid thin #ddd;
}
.popup-header span {
  cursor: pointer;
  float: right;
}

</style>

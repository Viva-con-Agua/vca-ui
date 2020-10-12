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
<style type="text/css">
.border-bottom {
    border-bottom: 1px solid #008fc3;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: calc(100% - 15px);
    z-index: 100;
}

.border-button {
  display: flex;
  position: relative;
  margin-bottom: 10px;
}

.border-button:first-child {
  margin-right: 10px;
}

.border-button:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 0px;
}

.border-button:first-child:after {
    
    border-right: none;
    background: linear-gradient(110deg, rgba(255,255,255,1) 47%, rgba(0,143,195,1) 48%, rgba(0,143,195,1) 52%, rgba(255,255,255,1) 53%);
    width: 15px;
    height: 40px;
    right: 0px;
    background-repeat: no-repeat;
    top: 1px;
    bottom: 0px;
    cursor: pointer;
}

.border-button .button {
    text-decoration: none;
    background-color: #fff;
    color: #008fc3;
    border-left: solid thin #008fc3;
    border-top: solid thin #008fc3;
    font-weight: bold;
    text-transform: uppercase;
  
    outline: none;
    line-height: 40px;
    font-size: 18px;
  
    cursor: pointer;
    padding: 0 30px 0 20px;
    width: 100%;
}

@media only screen and (max-width: 500px) {

  .border-button .button {
    font-size: 12px;
  }
}


</style>
<template>
    <div class="accord">
        <button @click="toggle" class="accordion">
          <div class="arrow" v-if="isActive">&minus;</div>
          <div class="arrow" v-else>&plus;</div>
          <div class="header">{{ header }}</div>
        </button>
        <transition name="fade" mode="out-in">
            <div v-if="isActive" class="panel" :class="{active: isActive}">
                <p class="content"><slot name="body"></slot></p>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: "VcaAccordion", 
    data() {
        return {
            isActive: false
        }
    },
    props: {
        header: {
            type: String,
            default: ""
        },
        body: {
            type: String,
            default: ""
        }
    },
    methods: {
        toggle() {
            this.isActive = !this.isActive
        }
    }
}
</script>
<style scoped>
    button {
      position: relative;
    }
    button div {
      display: inline-block;
    }
    button .arrow {
      margin-right: 10px;
    }

    .accord {
        margin-bottom: 5px;
    }

    .accord .header {
      font-size: 1em;
    }

     /* Style the buttons that are used to open and close the accordion panel */
    .accordion {
      background-color: #008fc3;
      color: #fff;
      border-radius: 0.2rem;
      cursor: pointer;
      padding: 12px;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      transition: 0.4s;
      display: flex;
    }

    /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
    .active, .accordion:hover {
      background-color: #006ab1;
    }

    /* Style the accordion panel. Note: hidden by default */
    .panel {
      padding: 0 12px;
      background-color: white;
      overflow: hidden;
    } 

    .panel .content {
        font-size: 13px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
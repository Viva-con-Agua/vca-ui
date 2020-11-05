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
</style>
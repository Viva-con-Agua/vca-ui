<template>
    <div class="accord">
        <button @click="toggle" class="accordion">
          <div class="arrow" v-if="isActive">&minus;</div>
          <div class="arrow" v-else>&plus;</div>
          <div class="accord-header">{{ header }}</div>
        </button>
        <transition name="fade" mode="out-in">
            <div v-if="isActive" class="panel" :class="{active: isActive}">
                <vca-card><slot name="body"></slot></vca-card>
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
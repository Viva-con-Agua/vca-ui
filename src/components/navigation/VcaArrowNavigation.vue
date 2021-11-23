<template>
    <div class="arr-btn-box">
        <div class="arr-buttons" :class="{single: !showNext || !showBack}">
            <button :class="getBackClass" v-if="showBack" :disabled="!backEnabled" @click.prevent="back()">{{ getBack }}</button>
            <button :class="getNextClass" v-if="showNext" :disabled="!nextEnabled" @click.prevent="next()">{{ getNext }}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VcaArrowNavigation',
    props: {
        showNext: {
            type: Boolean,
            default: true
        },
        nextEnabled: {
            type: Boolean,
            default: true
        },
        nextLabel: {
            type: String,
            default: null
        },
        nextLong: {
            type: Boolean,
            default: false
        },
        showBack: {
            type: Boolean,
            default: true
        },
        backEnabled: {
            type: Boolean,
            default: true
        },
        backLabel: {
            type: String,
            default: null
        },
        backLong: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        getNext() {
            return this.nextLabel ? this.nextLabel : '>>>>>>>>'
        },
        getBack() {
            return this.backLabel ? this.backLabel : '<<<<<<<<'
        },
        getBackClass() {
            return 'arr-btn-back'
        },
        getNextClass() {
            return this.nextLong ? 'arr-btn-next-long' : 'arr-btn-next'
        }
    },
    methods: {
        next() {
            this.$emit("next")
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
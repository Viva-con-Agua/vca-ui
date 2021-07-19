<template>
    <div class="arr-btn-box">
        <div class="arr-buttons" :class="{single: !showNext || !showBack}">
            <button class="arr-btn-back" v-if="showBack" :disabled="!backEnabled" @click.prevent="back()">{{ getBack }}</button>
            <button class="arr-btn-next" v-if="showNext" :disabled="!nextEnabled" @click.prevent="next()">{{ getNext }}</button>
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
        }
    },
    computed: {
        getNext() {
            return this.nextLabel ? this.nextLabel : '>>>>>>>>'
        },
        getBack() {
            return this.backLabel ? this.backLabel : '<<<<<<<<'
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
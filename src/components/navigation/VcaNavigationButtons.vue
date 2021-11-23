<template>
    <div class="nav-btn-container">
        <div v-if="showBack" class="nav-back">
            <button class="nav-btn-back>" @click.prevent="back()" :disabled="!backEnabled">{{ backLabel }}</button>
        </div>
        <div v-if="showNext" class="nav-next">
            <button class="nav-btn" @click.prevent="next()" :disabled="!nextEnabled">{{ nextLabel }}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VcaNavigationButtons',
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
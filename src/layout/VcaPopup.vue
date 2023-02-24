<template>
    <div class="popup-container" v-if="visible">
        <div class="popup-background" @click="hide" />
        <div class="popup">
            <h2 class="popup-header">
                <span>{{ title }}</span>
                <span @click="hide" class="popup-close">✕</span>
            </h2>
            <vca-card class="popup-content">
                <slot></slot>
            </vca-card>
        </div>
    </div>
</template>
<script>
export default {
    name: "VcaPopup",
    props: {
        title: {
            type: String,
            default: "",
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: this.show,
        };
    },
    methods: {
        hide() {
            this.$emit("close");
            this.visible = false;
        },
    },
    watch: {
        show: function (nVal) {
            this.visible = nVal;
        },
    },
};
</script>
<style lang="scss">
@import "../../src/assets/styles/utils/variables";
@import "../../src/assets/styles/utils/mixins";

.popup-container {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;

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
        margin: 5% auto;
        position: relative;
        width: 80%;
        height: auto;
        max-height: 80%;
        z-index: 200;

        @include media(small) {
            margin: 10% auto;
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            border-bottom: solid thin $grey;
            background-color: $main-color;
            color: $white;
            min-height: auto;
            font-size: 1.25rem;

            @include media(large) {
                font-size: 2rem;
            }

            .popup-close {
                cursor: pointer;
                color: $white;
                &:hover {
                    color: $primary-dark;
                }
            }
        }
        .popup-content {
            overflow: scroll;
        }
    }
}
</style>

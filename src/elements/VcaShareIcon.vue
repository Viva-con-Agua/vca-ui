<template>
    <div>
        <img v-if="isShareMobile" class="mobile" @click.stop.prevent="shareMobile" title="Einladung teilen" src="data:image/png;base64,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" />

    </div>
</template>
<script>

export default {
    name: 'VcaShareIcon',
    props: {
        url: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        }
    },
    computed: {
        isShareMobile() {
            return navigator.share !== undefined
        }
    },
    methods:{
        shareMobile() {
            if (navigator.share) {
                navigator.share({
                    title: "",
                    text: this.share.text,
                    url: this.share.url
                }).then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing:', error));
            }
        }
    }

}
</script>
<style scoped>

    .mobile {
        display: inline-flex;
        width: 35px;
        height: 35px;
        margin: 0 10px;
        border-radius: 50%;
        border: solid 2px #008fc3;
        cursor: pointer;
    }

    .mobile:hover {
        border: solid 2px #002e6d;
    }

    .mobile div {
        width: inherit;
    }

    .mobile img, .mobile div {
        margin: auto;
    }

</style>

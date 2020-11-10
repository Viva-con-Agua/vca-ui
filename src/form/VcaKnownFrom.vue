<template>
    <div class="select-known">
        <VcaDropdown label="So bin ich auf euch aufmerksam geworden" errorMsg="Bitte wähle etwas aus" @change="change" title="Bitte wählen" ref="known_from" :rules="$v.known_from" :options="options"/>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import VcaDropdown from '@/form/VcaDropdown'
export default {
    name: 'VcaKnownFrom',
    components:{
        VcaDropdown
    },
    props: {
        req: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            known_from: "",
            options:
            [
                { title: "Bitte wählen", value: "" },
                { title: "Familie & Freunde", value: "family_friends" },
                { title: "Festivals & Becherspende", value: "festivals_cupdonation" },
                { title: "Wasser", value: "water" },
                { title: "Instagram", value: "instagram" },
                { title: "Facebook", value: "facebook" }
            ]
        }
    },
    validations: {
        known_from: {
            required
        }
    },
    methods: {
        change(e) {
            this.known_from = e
            this.$emit("input", e)
            if(this.req) {
                this.$refs.known_from.validate()
            }
        },
        validate () {
            if(this.req) {
                this.$refs.known_from.validate()
            }
        }
    }
}
</script>
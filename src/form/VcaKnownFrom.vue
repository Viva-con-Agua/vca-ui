<template>
    <div class="select-known">
        <vca-dropdown :label="label" :errorMsg="errorMsg" v-model="current" @input="change" :placeholder="placeholder" ref="reference" :rules="$v.known_from" :options="options"/>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'VcaKnownFrom',
    props: {
        placeholder: {
            type: String,
            default: 'Bitte wählen'
        },
        label: {
            type: String,
            default: 'So bin ich auf euch aufmerksam geworden'
        },
        preselection: {
            type: String,
            default: null
        },
        req: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array
        },
        errorMsg: {
            type: String,
            default: 'Error'
        }
    },
    validations: {
        known_from: {
            required
        }
    },
    created() {
      if (this.preselection !== null) {

        var value = this.options.find(element => element.value == this.preselection)
        if (value != null) {
          this.current = [value]
          this.$emit("input", this.current)
        }
      }
    },
    methods: {
        change(e) {
            this.current = e
            this.$emit("input", e)
            if(this.req) {
                this.$refs.reference.validate()
            }
        },
        validate () {
            if(this.req) {
                this.$refs.reference.validate()
            }
        }
    },
    data() {
        return {
            current: this.value,
            options:
            [
                { title: "Bitte wählen", label: 'Bitte wählen', value: "" },
                { title: "Familie & Freunde",  label: 'Familie & Freunde', value: "family_friends" },
                { title: "Festivals & Becherspende", label: 'Festivals & Becherspende', value: "festivals_cupdonation" },
                { title: "Wasser", label: 'Wasser', value: "water" },
                { title: "Instagram", label: 'Instagram', value: "instagram" },
                { title: "Facebook", label: 'Facebook', value: "facebook" }
            ]
        }
    }
}
</script>
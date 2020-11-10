<template>
    <div class="dropdown-container">
        
        <label>{{ label }}</label>
        <div class="vca-input" :class="{error: hasError, first: first, last: last}">
            <v-select
                    :value="currentOption"
                    :options="options"
                    :class="{error: hasError}"
                    label="title"
                    :placeholder="title"
                    v-on:input="handleClick"
            >
                <span slot="no-options">Bitte auswählen</span>
                <template slot="option" slot-scope="option">
                    <div class="dropdown-option">
                        <h3 class="option-title">{{ option.title }}</h3>
                        <h5 v-if="option.subtitle" class="option-subtitle">{{ option.subtitle }}</h5>
                    </div>
                </template>
            </v-select>
            <span v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>

    </div>
</template>

<script>
export default {
    name: "VcaDropdown",
    props: {
        title: {
            type: String,
            default: 'default title'
        },
        label: {
            type: String,
            default: 'default label'
        },
        rules: {
            type: Object,
            default: null
        },
        first: {
            type: Boolean,
            default: false
        },
        last: {
            type: Boolean,
            default: false
        },
        errorMsg: {
            type: String,
            default: 'Error'
        },
        options: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            currentOption: "",
            hasError: false
        }
    },
    methods: {
        handleClick(event) {
            if(event !== null && event.value != "") {
                this.currentOption = event.title
                this.$emit("change", event.value)
            } else {
                this.currentOption = ""
                this.$emit("change", "")
            }
        },
        validate () {
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        }
    }
}
</script>
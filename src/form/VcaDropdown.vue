<template>
    <div class="dropdown-container">
        
        <label>{{ label }}</label>
        <div class="vca-input" :class="{error: hasError, first: first, last: last}">
            <v-select
                    :value="currentOptions"
                    :options="options"
                    :class="{error: hasError}"
                    label="title"
                    :multiple="multiple"
                    :taggable="taggable"
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
            <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>

    </div>
</template>

<script>
export default {
    name: "VcaDropdown",
    props: {
        value: {
            type: Array,
            default: function() {
                return []
            }
        },
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
        multiple: {
            type: Boolean,
            default: false
        },
        taggable: {
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
            currentOptions: this.value,
            hasError: false
        }
    },
    methods: {
        handleClick(event) {
            if(event !== null) {

                // Set event as an array if its only a single selection, otherwise we cannot handle the model correctly
                if(!Array.isArray(event)) {
                    event = [event]                
                }

                this.currentOptions = event
                this.$emit("input", event)
            } else {
                this.currentOptions = []
                this.$emit("input", [])
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
<style type="text/css">
    .vs__selected {
        padding: .6em;
        background-color: white;
        border: solid thin #008fc3;
        margin-left: 0;
    }
</style>
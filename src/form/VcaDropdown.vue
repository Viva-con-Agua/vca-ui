<template>
    <div class="dropdown-container">
        <v-select
                :value="currentOption"
                :options="options"
                label="title"
                :placeholder="title"
                v-on:input="handleClick"
        >
            <span slot="no-options">Bitte auswählen</span>
            <template slot="option" slot-scope="option">
                <div class="dropdown-option">
                    <h3 class="option-title">{{ option.title }}</h3>
                    <h5 class="option-subtitle">{{ option.subtitle }}</h5>
                </div>
            </template>
        </v-select>
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
        current: {
            type: Object,
            default: function() {
                return {
                    title: "",
                    subtitle: ""
                }
            }
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
            currentOption: this.current.title
        }
    },
    methods: {
        handleClick(event) {
            if(event !== null) {
                this.currentOption = event.title
            } else {
                this.currentOption = { title: "", subtitle: "" }
            }
        }
    }
}
</script>
<template>
    <tr class="vca-table-nav">
        <td :colspan="colspan" class="vca-table-nav-cell">
            <vca-input class="vca-table-search" v-model="pg.filter" :placeholder="placeholder" />
        </td>
    </tr>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableSearch',
    props: {
        store: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: ''
        },
        colspan: {
            type: Number,
            default: 1
        }
    },
    watch: {
        pg: {
            handler(val) {
                this.$store.commit(this.store + '/pagination', val)
            },     
            deep: true
        }
    },
    computed: {
        ...mapState({
            pg (state, getters) {
                if (this.store) {
                    return getters[`${this.store}/pagination`]
                }
            }
        })
    }

}
</script>

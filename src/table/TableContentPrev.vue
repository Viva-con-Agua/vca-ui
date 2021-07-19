<template>
    <tr v-if="pg.currentPage > 1" class="vca-content-row">
        <td :colspan="colspan" class="vca-table-nav-cell">
            <div class="vca-column text-center">
                <label @click="firstPage()" :class="{bordered: parseInt(pg.currentPage) > 2}" v-if="parseInt(pg.currentPage) > 2">&uarr; {{ $t('table.page.first') }}</label>
                <label @click="prevPage()" v-if="parseInt(pg.currentPage) > 1">&uarr; {{ $t('table.page.back') }}</label>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableContentPrev',
    props: {
        store: {
            type: String,
            default: null
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
    },
    methods: {
        firstPage() {
            this.$store.commit(this.store + '/firstPage')
        },
        prevPage() {
            this.$store.commit(this.store + '/prevPage')
        }
    }

}
</script>

<template>
    <tr v-if="pg.currentPage < pg.pageCount" class="vca-content-row">
        <td :colspan="colspan" class="vca-table-nav-cell">
            <div class="vca-column text-center">
                <label @click="nextPage()" :class="{bordered: parseInt(pg.currentPage) + 1 < parseInt(pg.pageCount)}" v-if="parseInt(pg.currentPage) < parseInt(pg.pageCount)">{{ $t('table.page.next') }} &darr;</label>
                <label @click="lastPage()" v-if="(parseInt(pg.currentPage) + 1) < parseInt(pg.pageCount)">{{ $t('table.page.last') }} &darr;</label>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableContentNext',
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
        lastPage() {
            this.$store.commit(this.store + '/lastPage')
        },
        nextPage() {
            this.$store.commit(this.store + '/nextPage')
        }
    }

}
</script>

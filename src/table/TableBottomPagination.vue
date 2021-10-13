<template>
    <tr class="vca-table-nav bottom-navigation"><td :colspan="colspan" class="text-right vca-table-nav-cell">
        <span>
            {{ $t('table.page.label') }} <vca-number class="vca-table-page typo-roboto" :min="1" :max="pg.pageCount" v-model="pg.currentPage"/> / {{ pg.pageCount }}
        </span>
        <span>
            {{ $t('table.page.size') }}: <vca-number :min="1" :max="pg.listLength" class="vca-table-pagesize typo-roboto" v-model="pg.pageSize"/> / <div class="vca-border main-color editable vca-page-all" @click="setMax()">{{ pg.listLength }}</div>
        </span>
    </td>
</tr>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableBottomPagination',
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
        setMax() {
            this.$store.commit(this.store + '/pageSize', this.pg.listLength)
        }
    }

}
</script>
<style lang="scss">
    .bottom-navigation td {
        span {
            display: inline-block;
        }
    }
</style>
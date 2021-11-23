<template>
    <tr class="vca-table-nav">
        <td :colspan="colspan" class="vca-table-nav-cell">
            <div class="vca-row">
                <span v-if="!hideSearch" ><vca-input class="vca-table-search" v-model="pg.filter" :placeholder="placeholder" /></span>
                <div class="vca-right">
                    <span>
                        {{ $t('table.page.label') }} <vca-number class="vca-table-page typo-roboto" :min="1" :max="pg.pageCount" v-model="pg.currentPage"/> / {{ pg.pageCount }}
                    </span>
                    <span>
                        {{ $t('table.page.size') }}: <vca-number :min="1" :max="10000" class="vca-table-pagesize typo-roboto" v-model="pg.pageSize"/> / <div class="vca-border main-color editable vca-page-all" @click="setMax()">{{ pg.listLength }}</div>
                    </span>
                </div>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableHeaderPagination',
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
        },
        hideSearch: {
            type: Boolean,
            default: false
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

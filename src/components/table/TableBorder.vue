<template>
    <tr><td :colspan="colspan" class="vca-table-border"></td></tr>
</template>
<script>
export default {
    name: 'TableBorder',
    props: {
        colspan: {
            type: Number,
            default: 1
        }
    }
}
</script>

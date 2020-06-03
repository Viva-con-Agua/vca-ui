<template>
    <div class="vca-form">
        <form>
            <slot></slot>
        </form>
    </div>
</template>
<script>
export default {
    name: 'VcaForm'
}
</script>
<style>
.vca form {
    width: 100%;
    max-width: 100%;
}
</style>

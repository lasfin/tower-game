<template>
    <div class="field">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GameField"
    }
</script>

<style scoped>
    .field {
        width: 880px;
        height: 600px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
        position: relative;
    }
</style>
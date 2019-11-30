<template>
    <div class="square">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "SquareF"
    }
</script>

<style scoped>
    .square {
        width: 24px;
        height: 24px;
        border: 1px solid #000;
        text-align: center;
        line-height: 24px;
        opacity: .4;
    }
</style>
<template>
    <div class="t-wrap">
        <div class="triangle"></div>
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TriangleF"
    }
</script>

<style scoped>
    .t-wrap {
        width: 24px;
        height: 24px;
        opacity: .4;
    }
    .triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 24px solid #000;
        line-height: 24px;
        opacity: .3;
        text-align: center;
    }
    .slot {
        text-align: center;
        line-height: 28px;
    }
</style>
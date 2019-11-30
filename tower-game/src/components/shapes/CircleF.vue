<template>
   <div class="circle">
       <slot></slot>
   </div>
</template>

<script>
    export default {
        name: "CircleF"
    }
</script>

<style scoped>
    .circle {
        width: 24px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #000;
        text-align: center;
        border-radius: 50%;
        opacity: .4;
    }
</style>
<template>
    <div class="position-wrapper" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Position",
        props: ['positionX'],
        computed: {
            style () {
                return 'left: ' + `calc(${this.positionX}% - 25px);`;
            }
        },
    }
</script>

<style scoped>
    .position-wrapper {
        width: 25px;
        position: absolute;
    }
</style>
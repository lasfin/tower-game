<template>
    <div class="root">
        <div class="line"></div>
        <div class="triangle"></div>
        <div class="danger"></div>
    </div>
</template>

<script>
    export default {
        name: "Tower"
    }
</script>

<style scoped>
    .root {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .triangle {
        margin: auto;
        width: 0;
        height: 0;
        border-left: 35px solid transparent;
        border-right: 35px solid transparent;
        border-bottom: 70px solid #0cb1ff94;
    }

    .line {
        margin-left: 5%;
        width: 90%;
        height: 5px;
        background: #ccc;
        position: absolute;
        bottom: 70px;
        border-radius: 5px;
        /*transform: rotate(0deg);*/
    }

    .danger {
        width: 378px;
        height: 2px;
        margin: 0 auto;
        background: rgba(255, 0, 0, .33);
        border-radius: 2px;
    }

</style>
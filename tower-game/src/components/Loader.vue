<template>
    <div class="loader-wrapper">
        <div class="loader">
            Game over
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .loader-wrapper {
        width: 4em;
        height: 4em;
        margin: auto;
        padding-top: 50px;
    }
    .loader {
        margin-top: 130px;
        position: relative;
        width: 4em;
        height: 4em;
        border: 3px solid #3cefff;
        overflow: hidden;
        animation: spin 3s ease infinite;
    }

    loader::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        width: 2em;
        height: 2em;
        background-color: hsla(185, 100%, 62%, 0.75);
        transform-origin: center bottom;
        transform: scaleY(1);
        animation: fill 3s linear infinite;
    }

    @keyframes spin {
        50%,
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes fill {
        25%,
        50% {
            transform: scaleY(0);
        }
        100% {
            transform: scaleY(1);
        }
    }
</style>





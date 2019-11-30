<template>
    <div class="position-wrapper" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Position",
        props: ['positionX', 'created'],
        computed: {
            style () {
                const diff = new Date() - this.created;
                const fullTime = 5000; // pass as prop

                const k = diff / fullTime;

                const left = `calc(${this.positionX}% - 25px);`;
                const top = diff > fullTime ? `calc(100% - 25px);` : `calc(${100 * k}% - 25px);`;

                // it's better to use translate with transition for animation, but time ¯\_(ツ)_/¯

                return `
                    left: ${left}
                    top: ${top}
                `;
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
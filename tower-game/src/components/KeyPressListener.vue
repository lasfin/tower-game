<template>
    <div></div>
</template>

<script>
    export default {
        name: "KeyPressListener",
        mounted() {
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    this.$store.commit('changeCurrentPosition', 'left');
                }
                if (e.key === 'ArrowRight') {
                    this.$store.commit('changeCurrentPosition', 'right');
                }
            }.bind(this));
        }
    }
</script>

<style scoped>

</style>
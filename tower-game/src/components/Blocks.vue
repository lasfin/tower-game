<template>
    <div class="wrapper">
        <div id="example-1">
            <div
                class="default-figure"
                v-for="figure in figures"
                v-bind:key="figure.created.toISOString()"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </div>
        </div>
    </div>
</template>

<script>
    import { figuresTypes } from '../helpers';
    import CircleF from './shapes/CircleF';
    import SquareF from './shapes/SquareF';
    import TriangleF from './shapes/TriangleF';

    export default {
        name: "Blocks",
        components: {
            CircleF,
            SquareF,
            TriangleF
        },
        methods: {
            figuresTypes: () => figuresTypes,
        },
        computed : {
            figures () {
                return this.$store.getters.generatedFigures;
            },
        },
    }
</script>

<style scoped>
    .wrapper {
        position: absolute;
        right: 0;
        width: 50%;
        height: 100%;
    }
</style>
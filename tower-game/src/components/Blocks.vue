<template>
    <div class="wrapper-blocks">
        <div id="example-1">
            <Position
                v-for="figure in figures"
                v-bind:key="figure.created.toISOString()"
                v-bind:positionX="figure.positionX"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </Position>

        </div>
    </div>
</template>

<script>
    import { figuresTypes } from '../helpers';
    import CircleF from './shapes/CircleF';
    import SquareF from './shapes/SquareF';
    import TriangleF from './shapes/TriangleF';
    import Position from './shapes/Position';

    export default {
        name: "Blocks",
        components: {
            CircleF,
            SquareF,
            TriangleF,
            Position
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
    .wrapper-blocks {
        position: absolute;
        right: 0;
        width: 50%;
        height: 100%;
    }
</style>
<template>
    <div>
        <div class="wrapper-user-blocks">
            <Position
                    v-for="figure in userFiguresInProgress"
                    v-bind:key="figure.created.toISOString() + componentKey"
                    v-bind:positionX="figure.positionX"
                    v-bind:created="figure.created"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </Position>

            <Position
                    v-for="figure in userFiguresOnEarth"
                    v-bind:key="figure.created.toISOString()"
                    v-bind:positionX="figure.positionX"
                    v-bind:created="figure.created"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </Position>
        </div>

        <div class="wrapper-blocks">
            <Position
                v-for="figure in figuresInProgress"
                v-bind:key="figure.created.toISOString() + componentKey"
                v-bind:positionX="figure.positionX"
                v-bind:created="figure.created"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </Position>

            <Position
                v-for="figure in figuresOnEarth"
                v-bind:key="figure.created.toISOString()"
                v-bind:positionX="figure.positionX"
                v-bind:created="figure.created"
            >
                <CircleF v-if="figure.type === figuresTypes().circle">{{figure.weight}}</CircleF>
                <TriangleF v-if="figure.type === figuresTypes().triangle">{{figure.weight}}</TriangleF>
                <SquareF v-if="figure.type === figuresTypes().square">{{figure.weight}}</SquareF>
            </Position>

        </div>
    </div>
</template>

<script>
    import { figuresTypes, gameStatuses } from '../helpers';
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
        data() {
           return {
               componentKey: 0
           }
        },
        methods: {
            figuresTypes: () => figuresTypes,
            forceRerender() {
                this.componentKey += 1;
            }
        },
        mounted() {
            window.setInterval(() => {
                if (this.gameStatus === gameStatuses.inProgress ) {
                    window.requestAnimationFrame(this.forceRerender);
                }
            }, 30)
        },
        computed : {
            figuresInProgress () {
                return this.$store.getters.figuresInProgress;
            },
            figuresOnEarth () {
                return this.$store.getters.figuresOnEarth;
            },
            userFiguresInProgress () {
                return this.$store.getters.userFiguresInProgress;
            },
            userFiguresOnEarth () {
                return this.$store.getters.userFiguresOnEarth;
            },
            gameStatus () {
                return this.$store.state.gameStatus
            }
        },
    }
</script>

<style scoped>
    .wrapper-blocks {
        position: absolute;
        left: 50%;
        width: 45%;
        height: 525px;
    }
    .wrapper-user-blocks {
        position: absolute;right: 50%;
        width: 45%;
        height: 525px;
    }
</style>
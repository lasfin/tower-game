<template>
    <div class="wrapper">
        <div class="shadow from topMargin game-control">
            <div class="inline start">
                <div class="card-amount">
                    <button
                        class="small shadowless shadow fromNumber float"
                        v-on:click="handleButtonClick(gameStatuses().inProgress)"
                    >
                        Start
                    </button>
                    <button
                        class="small shadowless shadow fromNumber float"
                        v-on:click="handleButtonClick(gameStatuses().paused)"
                    >
                        Pause
                    </button>
                    <button
                        class="small shadowless shadow fromNumber float"
                        v-on:click="handleButtonClick(gameStatuses().initial)"
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { gameStatuses } from '../helpers';

    export default {
        name: "GameControls",
        methods: {
            gameStatuses: () => gameStatuses,
            handleButtonClick (index) {
                this.$store.commit('changeGameStatus', gameStatuses[parseInt(index, 10)]);
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        width: 880px;
        margin: 0 auto;
    }

    .game-control {
        width: 520px;
        display: block;
        padding: var(--padding-large);
    }
    button {
        font-size: 1em;
    }

    button:hover {
        cursor: pointer;
    }

    button:focus {
        outline: none;
    }

    .shadow {
        border-radius: var(--radius);
    }

    .small {
        --radius: .75em;
    }

    .float {
        float: left;
        margin-right: 1em;
    }

    .shadow {
        position: relative;
        box-shadow: 8px 8px 15px #CFDAE7;
        z-index: 1;
    }

    .shadow .shadowless {
        box-shadow: none;
    }

    .shadow .shadowless:before {
        background-image: linear-gradient(160deg, #f5fbff 40%, rgba(255,255,255,0) 60%),  linear-gradient(330deg, #ADBAC8 30%, rgba(255,255,255,0) 60%);
    }

    .shadow:before {
        content: ' ';
        display: block;
        position: absolute;
        top: var(--border-width);
        left: var(--border-width);
        right: var(--border-width);
        bottom: var(--border-width);
        border-radius: var(--radius);
        background-image: linear-gradient(120deg, #f5fbff 25%, rgba(255,255,255,0) 50%),  linear-gradient(300deg, #ADBAC8 14%, rgba(255,255,255,0) 40%);
        z-index: -1;
    }

    .shadow:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: calc(var(--radius) - 1px);
        background-image: linear-gradient(165deg, #EAF1F8 9%, #DFE8F5 80%);
        z-index: -1;
    }

    .inline {
        display: inline-flex;
        align-items: center;
        justify-content:flex-start;
        width: 100%;
    }

    .inline.start {
        align-items: flex-start;
    }

    .fromNumber {
        font-family: var(--mono-font);
        padding: var(--padding-small);
    }
</style>
import Vue from 'vue'
import Vuex from 'vuex'
import { gameStatuses, allTypes, randomInteger } from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        angle: 0,
        gameStatus: '',
        increaseTime: 20,
        secondsBeforeNew: 5 * 1000,
        gameInterval: null,
        timerStartedTime: null,
        timerPauseTime: null,
        figures: [],
        userFigures: []
    },
    getters: {
        angle: state => state.angle,
        generatedFigures: state => state.figures,
        userFigures: state => state.userFigures
    },
    mutations: {
        changeGameStatus,
    },
    actions: {
        changeGameStatus: (context, payload) => {
            context.commit('changeGameStatus', payload)
        },
    }
})



function changeGameStatus(state, newStatus) {

    state.gameStatus = newStatus;

    if (newStatus === gameStatuses.inProgress && !state.timerPauseTime) {
        state.timerStartedTime = new Date();
        state.figures.push(generateNewFigure());
        // start interval
        state.gameInterval = setInterval(() => {
            state.figures.push(generateNewFigure());

            console.log(state.figures);

        }, state.secondsBeforeNew);
    }
    // if (newStatus === gameStatuses.inProgress && state.timerPauseTime) {
    //     state.gameInterval = setInterval(() => {
    //         console.log('new item should appears'); // timeout
    //     }, state.secondsBeforeNew);
    //     state.timerPauseTime = null;
    // }
    if (newStatus === gameStatuses.initial && state.gameInterval) {
        clearInterval(state.gameInterval);
    }
    // if (newStatus === gameStatuses.paused) {
    //     state.pauseTime = Math.ceil(new Date() - state.timerStartedTime);
    //     console.log(Math.abs(state.timerStartedTime / (5 * 1000)));
    // }
}


function generateNewFigure() {
    return {
        created: new Date(),
        type: allTypes[randomInteger(0, 2)],
        weight: randomInteger(1, 10),
        positionX: randomInteger(1, 100)
    }
}


import Vue from 'vue'
import Vuex from 'vuex'
import { gameStatuses, allTypes, randomInteger } from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        angle: 0,
        gameStatus: gameStatuses.initial,
        increaseTime: 20,
        secondsBeforeNew: 5 * 1000,
        newBlockInterval: null,
        gameInterval: null,
        timerPauseTime: null,
        resumeTimeout: null,
        figures: [],
        userFigures: []
    },
    getters: {
        angle: state => state.angle,
        generatedFigures: state => state.figures,
        userFigures: state => state.userFigures,
        figuresInProgress: state => state.figures.filter((f) => new Date() - f.created < state.secondsBeforeNew),
        figuresOnEarth: state =>  state.figures.filter(f => new Date() - f.created >= state.secondsBeforeNew )
    },
    mutations: {
        changeGameStatus,
    },
    actions: {
        changeGameStatus: (context, payload) => {
            context.commit('changeGameStatus', payload)
        },
        saveGameInterval: (context, payload) => {
            context.commit('saveGameInterval', payload)
        }
    }
})



function changeGameStatus(state, newStatus) {

    // start game
    if (newStatus === gameStatuses.inProgress && state.gameStatus === gameStatuses.initial) {
        state.figures.push(generateNewFigure());
        setTimer(state);
    }

    // resume game
    if (newStatus === gameStatuses.inProgress && state.gameStatus === gameStatuses.paused) {
        // item in progress
        state.figures[state.figures.length - 1].created = new Date(Date.now() - state.lastItemTime);
        if (state.resumeTimeout) {
            clearTimeout(state.resumeTimeout);
            state.resumeTimeout = 0;
        }
        state.resumeTimeout = setTimeout(() => {
            state.figures.push(generateNewFigure());
            setTimer(state)
        }, state.lastItemTime)

    }

    // pause game
    if (newStatus === gameStatuses.paused && state.gameStatus === gameStatuses.inProgress) {
        state.lastItemTime = Math.ceil(new Date() - state.figures[state.figures.length - 1].created);
        clearInterval(state.newBlockInterval);
    }

    // stop game
    if (newStatus === gameStatuses.initial) {
        clearInterval(state.newBlockInterval);
        state.figures = [];
    }

    state.gameStatus = newStatus;
}


function setTimer(state) {
    state.newBlockInterval = setInterval(() => {
        state.figures.push(generateNewFigure());
    }, state.secondsBeforeNew);
}

function generateNewFigure() {
    return {
        created: new Date(),
        type: allTypes[randomInteger(0, 2)],
        weight: randomInteger(1, 10),
        positionX: randomInteger(1, 100)
    }
}


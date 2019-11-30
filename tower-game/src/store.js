import Vue from 'vue'
import Vuex from 'vuex'
import { gameStatuses, allTypes, randomInteger } from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        angle: 0,
        gameStatus: gameStatuses.initial,

        secondsBeforeNew: 5 * 1000,

        newBlockInterval: null,
        resumeTimeout: null,

        figures: [],
        userFigures: [],
        lastFigurePositionX: 0,
    },
    getters: {
        angle: state => state.angle,

        generatedFigures: state => state.figures,
        figuresInProgress: state => state.figures.filter(f => new Date() - f.created < state.secondsBeforeNew),
        figuresOnEarth: state =>  state.figures.filter(f => new Date() - f.created >= state.secondsBeforeNew),

        userFigures: state => state.userFigures,
        userFiguresInProgress: state => state.userFigures.filter(f => new Date() - f.created < state.secondsBeforeNew),
        userFiguresOnEarth: state =>  state.userFigures.filter(f => new Date() - f.created >= state.secondsBeforeNew),

    },
    mutations: {
        changeGameStatus,
        changeCurrentPosition(state, direction) {
            if (state.gameStatus !== gameStatuses.inProgress) {
                return;
            }

            const lastUserFigure = state.userFigures[state.userFigures.length - 1];
            if (direction === 'left') {
                lastUserFigure.positionX -= 5;
            } else {
                lastUserFigure.positionX += 5;
            }
            if (lastUserFigure.positionX < 0) {
                lastUserFigure.positionX = 0;
            }
            if (lastUserFigure.positionX > 100) {
                lastUserFigure.positionX = 100;
            }
        }
    },
    actions: {
        changeGameStatus: (context, payload) => {
            context.commit('changeGameStatus', payload)
        },
    }
})


function changeGameStatus(state, newStatus) {
    if (newStatus === state.gameStatus) {
        return;
    }
    if ((newStatus === gameStatuses.paused || newStatus === gameStatuses.initial) && state.gameStatus === gameStatuses.initial ) {
        return;
    }

    // start game
    if (newStatus === gameStatuses.inProgress && state.gameStatus === gameStatuses.initial) {
        addFigures(state);
        setTimer(state);
    }

    // resume game
    if (newStatus === gameStatuses.inProgress && state.gameStatus === gameStatuses.paused) {

        // item in progress
        state.figures[state.figures.length - 1].created = new Date(Date.now() - state.lastItemTime);
        state.userFigures[state.userFigures.length - 1].created = new Date(Date.now() - state.lastItemTime);

        if (state.resumeTimeout) {
            clearTimeout(state.resumeTimeout);
            state.resumeTimeout = null;
        }

        state.resumeTimeout = setTimeout(() => {
            addFigures(state);
            setTimer(state)
        }, state.lastItemTime)

    }

    // pause game
    if (newStatus === gameStatuses.paused && state.gameStatus === gameStatuses.inProgress) {
        state.lastItemTime = Math.ceil(new Date() - state.figures[state.figures.length - 1].created);
        clearInterval(state.newBlockInterval);
        clearTimeout(state.resumeTimeout);
    }

    // stop game
    if (newStatus === gameStatuses.initial) {
        clearInterval(state.newBlockInterval);
        clearTimeout(state.resumeTimeout);
        state.figures = [];
        state.userFigures = [];
    }

    state.gameStatus = newStatus;
}


function setTimer(state) {
    state.newBlockInterval = setInterval(() => {
        addFigures(state);
    }, state.secondsBeforeNew);
}

function addFigures(state) {
    const userFigure = generateNewFigure();

    state.userFigures.push(userFigure);
    state.lastFigurePositionX = userFigure.positionX;
    state.figures.push(generateNewFigure());
}

function generateNewFigure() {
    return {
        created: new Date(),
        type: allTypes[randomInteger(0, 2)],
        weight: randomInteger(1, 10),
        positionX: randomInteger(1, 100)
    }
}


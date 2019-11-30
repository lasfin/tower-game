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
        gameStatus: state => state.gameStatus,

        generatedFigures: state => state.figures,
        figuresInProgress: state => state.figures.filter(f => new Date() - f.created < state.secondsBeforeNew - 100),
        figuresOnEarth: state =>  state.figures.filter(f => new Date() - f.created >= state.secondsBeforeNew - 100),

        userFigures: state => state.userFigures,
        userFiguresInProgress: state => state.userFigures.filter(f => new Date() - f.created < state.secondsBeforeNew - 100),
        userFiguresOnEarth: state =>  state.userFigures.filter(f => new Date() - f.created >= state.secondsBeforeNew - 100),

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
            context.commit('changeGameStatus', payload, )
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
        }, state.secondsBeforeNew - state.lastItemTime)

    }

    // pause game
    if (newStatus === gameStatuses.paused && state.gameStatus === gameStatuses.inProgress) {
        state.lastItemTime = Math.ceil(new Date() - state.figures[state.figures.length - 1].created);
        clearInterval(state.newBlockInterval);
        clearTimeout(state.resumeTimeout);
    }

    // stop game
    if (newStatus === gameStatuses.initial) {
        resetGame(state);
    }

    state.gameStatus = newStatus;
}


function setTimer(state) {
    state.newBlockInterval = setInterval(() => {
        addFigures(state);
    }, state.secondsBeforeNew);
}

function addFigures(state) {
    // check for game over by weight

    let [F1, F2] = [5, 5];
    const MAGIC_PHYSICS = 3.5;

    // check for game over by angle
    // very suspicious physics, yes
    state.userFigures.forEach((figure) => {
        F1 += Math.abs(figure.positionX - 100) / 100 * figure.weight;
    });

    state.figures.forEach((figure) => {
        F2 += figure.positionX / 100 * figure.weight;
    });

    state.angle = (F1 - F2) * MAGIC_PHYSICS;

    if (Math.abs(state.angle) > 30) {
        state.gameStatus = gameStatuses.gameOver;
        resetGame(state)
    }

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

function resetGame(state) {
    clearInterval(state.newBlockInterval);
    clearTimeout(state.resumeTimeout);

    state.figures = [];
    state.userFigures = [];
    state.angle = 0;
}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        angle: 0,
        gameStatus: '',
        increaseTime: 20,
    },
    getters: {
        angle: state => state.angle
    },
    mutations: {
        changeGameStatus: (state, newStatus) => {
            state.gameStatus = newStatus
        },
    },
    actions: {
        changeGameStatus: (context, payload) => {
            context.commit('changeGameStatus', payload)
        },
    }
})



<template>
  <div id="app">

    <GameControls />

    <GameField>
      <Tower v-if="gameStatuses().gameOver !== this.gameStatus"/>
      <Blocks v-if="gameStatuses().gameOver !== this.gameStatus"/>

      <Loader v-if="gameStatuses().gameOver === this.gameStatus"/>
      <Loader v-if="gameStatuses().gameOver === this.gameStatus"/>

    </GameField>

    <KeyPressListener/>
  </div>
</template>

<script>
import GameControls from './components/GameControls'
import GameField from './components/GameField'
import Tower from './components/Tower'
import Blocks from './components/Blocks'
import KeyPressListener from './components/KeyPressListener'
import { gameStatuses } from './helpers'
import Loader from "./components/Loader";

export default {
  name: 'app',
  components: {
    Loader,
    GameField,
    GameControls,
    Tower,
    Blocks,
    KeyPressListener
  },
  computed: {
    gameStatus () {
      return this.$store.getters.gameStatus;
    }
  },
  methods: {
    gameStatuses () {
      return gameStatuses
    }
  }
}
</script>

<style>

:root {
    --text-color: #33476B;
    --text-color-light: #9EB0C4;
    --radius: 1.2em;
    --shadow-color: #ccdbe8;
    --border-width: -1px;
    --mono-font: monaco;
    --body-font: -apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif;
    --padding-small: .75em;
    --padding-medium: 1.25em;
    --padding-large: 2em;
}

body {
    background-image: linear-gradient(to right, #E9F0F8 0%, #DEE7F4 100%);
    font-family: var(--body-font);
    color: var(--text-color);
}

</style>

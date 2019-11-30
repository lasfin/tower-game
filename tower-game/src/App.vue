<template>
  <div id="app">
    <GameControls />
    <GameField>
      <Tower/>
      <Blocks/>
    </GameField>
  </div>
</template>

<script>
import GameControls from './components/GameControls.vue'
import GameField from './components/GameField.vue'
import Tower from './components/Tower.vue'
import Blocks from './components/Blocks.vue'

export default {
  name: 'app',
  components: {
    GameField,
    GameControls,
    Tower,
    Blocks
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

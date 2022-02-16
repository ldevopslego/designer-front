<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h3>Installed CLI Plugins</h3>

  </div>
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

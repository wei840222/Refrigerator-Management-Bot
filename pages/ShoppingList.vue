<template>
  <section class="container">
    <TitleBar/>
  </section>
</template>

<script>
import TitleBar from '~/components/ShoppingList/TitleBar.vue'

export default {
  async asyncData () {
  },
  head () {
    return {
      title: 'Shopping List'
    }
  },
  components: {
    TitleBar
  }
}
</script>

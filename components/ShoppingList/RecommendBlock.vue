<template>
  <div>
    <div class="recommend-title" v-b-toggle.recommend>
      <div class="recommend-title-text">建議清單</div>
    </div>
    <b-collapse visible id="recommend">
      <b-form-checkbox
        class="recommend-item"
        v-for="rmd in recommend"
        :key="rmd.id"
        :id="rmd.id"
        v-model="rmd.select"
        :style="{ 'text-decoration':rmd.select ? 'line-through black' : '' }">
        {{ rmd.name }}
      </b-form-checkbox>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    recommend: Array
  }
};
</script>

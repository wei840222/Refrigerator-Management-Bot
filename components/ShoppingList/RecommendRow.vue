<template>
  <b-container>
    <b-form-checkbox :id="id" v-model="status" value="true" unchecked-value="false">
      {{ name }}
    </b-form-checkbox>
  </b-container>
</template>

<script>
export default {
  props: {
    id: String,
    name: String
  },
  data() {
    return {
      status: false
    };
  }
};
</script>

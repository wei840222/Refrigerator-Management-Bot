<template>
  <div>
      <b-row>
          <b-col cols="2"><b-badge variant="dark">{{ type }}</b-badge></b-col>
          <b-col cols="4">{{ name }}</b-col>
          <b-col cols="4">保存期限<br/>{{ period }}</b-col>
          <b-col cols="1"><b-form-checkbox :id="id"/></b-col>
      </b-row>
    <br/>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    type: String,
    buyTime: String,
    period: String,
    name: String
  }
};
</script>

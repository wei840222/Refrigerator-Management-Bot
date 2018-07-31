<template>
  <b-container>
    <b-card>
      <b-row>
          <b-col cols="2"><b-badge variant="dark">{{ type }}</b-badge></b-col>
          <b-col cols="3">{{ name }}</b-col>
          <b-col cols="4">保存期限<br/>{{ period }}</b-col>
          <b-col cols="3"><b-btn v-b-modal="id">編輯</b-btn></b-col>
      </b-row>
    </b-card>
    <b-modal :id="id" title="編輯詳細資訊" ok-only>
      名稱：<br/>
      <b-form-input v-model="name" type="text"></b-form-input><br/>
      品項：<br/>
      <b-form-input v-model="type" type="text"></b-form-input><br/>
      購買日期：<br/>
      <b-form-input v-model="buyTime" type="date"></b-form-input><br/>
      保存期限：<br/>
      <b-form-input v-model="period" type="date"></b-form-input>
    </b-modal>
    <br/>
  </b-container>
</template>

<script>
export default {
  props: {
    id: String,
    type: String,
    buyTime: String,
    period: String,
    name: String
  },
  data() {
    return {
      modalShow: false
    };
  }
};
</script>

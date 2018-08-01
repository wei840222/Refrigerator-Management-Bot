<template>
  <div>
    <b-button v-b-modal="'add'" @click="beforeAddItem">新增</b-button>
    <b-modal id="add" title="新增品項" @ok="addItem">
      名稱：<br/>
      <b-form-input v-model="name" type="text"></b-form-input><br/>
      品項：<br/>
      <b-form-input v-model="type" type="text"></b-form-input><br/>
      購買日期：<br/>
      <b-form-input v-model="buyTime" type="date"></b-form-input><br/>
      保存期限：<br/>
      <b-form-input v-model="period" type="date"></b-form-input>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 10,
      type: null,
      buyTime: null,
      period: null,
      name: null
    };
  },
  methods: {
    beforeAddItem() {
      this.id++;
      this.type = null;
      this.buyTime = null;
      this.period = null;
      this.name = null;
    },
    addItem() {
      this.$emit('add-item',
        {
          id: this.id,
          type: this.type,
          buyTime: this.buyTime,
          period: this.period,
          name: this.name
        }
      );
    }
  }
};
</script>

<template>
  <b-container>
    <b-form @submit="onSubmit">
      <br/>
      <b-form-group label="新增清單通知" description="設定是否會跳出通知。">
        <b-form-checkbox id="AddListInput" v-model="AddListNotify" value=開啟 unchecked-value=關閉>{{ AddListNotify }}</b-form-checkbox>
      </b-form-group>
      <b-form-group label="冰箱通知" description="設定是否會跳出通知。">
        <b-badge variant="warning">快過期</b-badge>
        <b-form-select v-model="a.selected" :options="a.options" class="mb-3"/>
        <b-badge variant="danger">已過期</b-badge>
        <b-form-select v-model="b.selected" :options="b.options" class="mb-3"/>
        <b-badge variant="secondary">頻率</b-badge>
        <b-form-select v-model="c.selected" :options="c.options" class="mb-3"/>
      </b-form-group>
      <b-button type="submit" variant="primary">儲存</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      AddListNotify: '開啟',
      a: {
        selected: null,
        options: [
          { value: null, text: '不提醒' },
          { value: 1, text: '1天' },
          { value: 2, text: '2天' },
          { value: 3, text: '3天' },
          { value: 4, text: '4天' }
        ]
      },
      b: {
        selected: null,
        options: [
          { value: null, text: '不提醒' },
          { value: 1, text: '1天' },
          { value: 2, text: '2天' },
          { value: 3, text: '3天' },
          { value: 4, text: '4天' }
        ]
      },
      c: {
        selected: null,
        options: [
          { value: null, text: '不提醒' },
          { value: 1, text: '1次' },
          { value: 2, text: '2次' },
          { value: 3, text: '3次' }
        ]
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(
        {
          AddListNotify: this.AddListNotify,
          a: this.a.selected,
          b: this.b.selected,
          c: this.c.selected
        }
      ));
    }
  }
}
</script>

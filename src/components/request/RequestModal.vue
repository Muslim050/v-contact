<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: fError}">
      <label for="fio">ФИО</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{fError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <div class="form-control" :class="{invalid: eError}">
      <label for="email">Email</label>
      <input type="text" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{eError}}</small>
    </div>

    <div class="form-control">
      <label for="status">Тег</label>
      <select id="status" v-model="status">
        <option value="active">Семья</option>
        <option value="cancelled">Работа</option>
        <option value="done">Хобби</option>
        <option value="pending">Развлечения</option>
      </select>

    </div>
    

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useRequestForm} from '../../use/request-form'
import {useStore} from 'vuex'
export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    

    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return {
      ...useRequestForm(submit),
    }
  }
}
</script>

<style scoped>

</style>
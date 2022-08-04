<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Поиск по имени" v-model="name">
    </div>
    <div class="form-control">
      <input type="text" placeholder="Поиск по телефону" v-model="Pphone">
    </div>
    <div class="form-control">
      <input type="text" placeholder="Поиск по email" v-model="Eemail">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="active">Семья</option>
        <option value="cancelled">Работа</option>
        <option value="done">Хобби</option>
        <option value="pending">Развлечения</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const name = ref()
    const Pphone = ref()
    const Eemail = ref()
    const status = ref()

    watch([name, status, Pphone, Eemail], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
        Pphone: values[2],
        Eemail: values[3],
        
      })
    })

    const isActive = computed(() => name.value  || Pphone.value || Eemail.value || status.value)

    return {
      name,
      Pphone,
      Eemail,
      status,
      isActive,
      reset: () => {
        name.value = '',
        Pphone.value = '',
        Eemail.value = '',
        status.value = null
      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Информация о пользователе" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{request.fio}}</p>
    <p><strong>Телефон</strong>: {{request.phone}}</p>
    <p><strong>Email</strong>: {{request.email}}</p>
    <p><strong>Тег</strong>: <app-status :type="request.status" /></p>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="edit = true">Редактировать</button>


    

    <div class="form-control" style="margin-top: 30px" v-if="edit">
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

      <label for="status">Тег</label>
      <select id="status" v-model="status">
        <option value="active">Семья</option>
        <option value="cancelled">Работа</option>
        <option value="done">Хобби</option>
        <option value="pending">Развлечения</option>
      </select>

      <button class="btn" style="margin-top: 10px" @click="update" v-if="hasChanges">Обновить</button>
    </div>

    
    
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{$route.params.id}} нет.
  </h3>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const edit = ref(false)
    const loading = ref(true)
    const request = ref({})


    const status = ref()
    const email = ref()
    const phone = ref()
    const fio = ref()

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      email.value = request.value?.email
      phone.value = request.value?.phone
      fio.value = request.value?.fio
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value || request.value.email !== email.value || request.value.phone !== phone.value || request.value.fio !== fio.value )

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, status: status.value, email: email.value, phone: phone.value, fio: fio.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
      edit.value = false
    }

    return {loading, request, remove, update, status, hasChanges, email, edit, phone, 
fio}
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>
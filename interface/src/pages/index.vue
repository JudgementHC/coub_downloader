<script setup lang="ts">
import { AxiosResponse } from 'axios';
import Notification, { NotificationTypes } from '~/components/Notification.vue';
import Loading from '~/components/Loading.vue';
import { $baseApi } from '~/services/axios';

const _coub_session_2 = ref('')
const remember_token = ref('')
const loading = ref(false)

const notification = reactive<{ type: NotificationTypes, message: string, show: boolean }>({
  type: 'info',
  message: '',
  show: false
})

const fetchCoubs = () => {
  if (isValidated.value) {
    localStorage.setItem('_coub_session_2', _coub_session_2.value)
    localStorage.setItem('remember_token', remember_token.value)
    loading.value = true

    $baseApi.post('/coub/fetch_videos', {
      _coub_session_2: _coub_session_2.value,
      remember_token: remember_token.value
    }).then(setNotification)
      .catch(setError)
      .finally(() => {
        loading.value = false
      })
  }
}

const downloadCoubs = () => {
  loading.value = true
  $baseApi.get('/coub/download')
    .then(setNotification)
    .catch(setError)
    .finally(() => {
      loading.value = false
    })
}

const setNotification = (res: AxiosResponse) => {
  if (res.status === 200) {
    notification.type = 'success'
  } else {
    notification.type = 'danger'
  }
  notification.message = res.data?.message
  notification.show = true
}
const setError = (err: any) => {
  notification.message = err
  notification.type = 'danger'
  notification.show = true
}

const isValidated = computed(() => {
  return _coub_session_2.value && remember_token.value
})

onMounted(() => {
  const coubSession = localStorage.getItem('_coub_session_2')
  const rememberToken = localStorage.getItem('remember_token')

  if (coubSession) {
    _coub_session_2.value = coubSession
  }
  if (rememberToken) {
    remember_token.value = rememberToken
  }
}),

  watch(() => notification.show, (value, prevValue) => {
    if (prevValue !== value && value) {
      setTimeout(() => {
        notification.show = false
      }, 3000);
    }
  })
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">Vitesse Lite</a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div class="relative mx-auto w-max p-5">
      <div
        v-if="loading"
        class="absolute top-0 left-0 w-full h-full z-100 flex items-center justify-center"
      >
        <div class="w-full h-full opacity-80 bg-black absolute t-0 l-0 z-1"></div>
        <div class="relative z-2 text-4xl">
          <Loading></Loading>
        </div>
      </div>

      <div flex flex-col items-center my-5>
        <input
          v-model="_coub_session_2"
          placeholder="_coub_session_2"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          @keydown.enter="fetchCoubs"
          :disabled="loading"
        />
        <input
          v-model="remember_token"
          placeholder="remember_token"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="250px"
          mt="15px"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          @keydown.enter="fetchCoubs"
          :disabled="loading"
        />
      </div>
      <div class="flex flex-col items-center mt-3">
        <button class="mb-3 text-sm btn" :disabled="!isValidated || loading" @click="fetchCoubs">Fetch</button>
        <button class="text-sm btn" :disabled="loading" @click="downloadCoubs">Download</button>
      </div>
    </div>

    <Notification
      v-if="notification.show"
      class="fixed bottom-10 right-10"
      :type="notification.type"
      :message="notification.message"
    ></Notification>
  </div>
</template>

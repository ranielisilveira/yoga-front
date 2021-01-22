export default function ({ $axios, $auth, store }) {
  $axios.onRequest((config) => {
    if (store.state.token) {
      config.headers.common.Authorization = this.$auth.getToken('local')
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      $auth.logout()
    }
  })

  $axios.defaults.baseURL = process.env.API_ROOT
}

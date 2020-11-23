const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    token: null,
    userId: null,
    userInfo: {},
    IsMoblie: false,
  }
}
export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setIsMobile(state,IsMoblie) {
    state.IsMoblie = IsMoblie
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    let userId = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed._t
        userId =  parsed.userId
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setToken', token)
    commit('setUserId', userId)
  }
}

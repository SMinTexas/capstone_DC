import * as types from './action-types'

export const remove = () => ({type: types.REMOVE})
export const verify = () => ({type: types.VERIFY})
export const add = (token, username, access_level) => ({type: types.ADD, token, username, access_level})

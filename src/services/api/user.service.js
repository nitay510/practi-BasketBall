// import { httpService } from '../http.service'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser';

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
}

async function getUsers() {
  // return await httpService.get(`user`)
}

async function getById(userId) {
  // return await httpService.get(`user/${userId}`)

}

async function remove(userId) {
  // NOT TESTED
  // return await httpService.delete(`user/${userId}`)
}

async function update(user) {
  // NOT TESTED
  // return await httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
  // try {
  //   const user = await httpService.post('auth/login', userCred)
  //   if (user) return _saveUserToLocal(user)
  // } catch (err) {
  //   throw err;
  // }
}

async function signup(userCred) {
  // try {
  //   console.log('userCred:', userCred);
  //   await httpService.post('auth/signup', userCred)
  //   return _saveUserToLocal(userCred)
  // } catch (err) {
  //   throw err;
  // }
}
async function logout() {
  // return await httpService.post('auth/logout')
}

function _saveUserToLocal(user) {
  // const { firstName } = user
  // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(firstName))
  // return user
}

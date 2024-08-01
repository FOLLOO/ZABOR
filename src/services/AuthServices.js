import Cookies from 'js-cookie';

export const getAccessToken =() => {
  const accessToken = Cookies.get('token')
  return accessToken || null
}

export const saveTokenStorage = (accessToken) => {
  Cookies.set('accessToken', accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1
  })
}
export const removeFromStorage = () => {
  localStorage.clear()
  Cookies.remove('email')
  Cookies.remove('refreshToken')
  Cookies.remove('token')
}
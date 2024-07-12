import Cookies from 'js-cookie';

export const getAccessToken =() => {
  const accessToken = Cookies.get('accessToken')
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
  Cookies.remove('accessToken')
}
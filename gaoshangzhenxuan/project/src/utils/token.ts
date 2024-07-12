//存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
}
//本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN');
}
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN');
}
export const getTime = () => {
  let hours = new Date().getHours();
  let message = hours <= 9 ? '早上' : hours <= 12 ? '上午' : hours <= 18 ? '下午' : '晚上';
  return message;

}
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}
export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}

export function formatTime(time: number) {
  // return '04:45'
  //将毫秒转成秒钟
  const timeSeconds = time / 1000

  //获取分钟和秒钟
  const minute = Math.floor(timeSeconds / 60)
  const seconds = Math.floor(timeSeconds) % 60

  //格式化时间,不足两位用0补位
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(seconds).padStart(2, '0')

  return `${formatMinute}:${formatSecond}`
}

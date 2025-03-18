import hyRequest from '@/service'

// export function getSongPlayUrl(id: number) {
//   return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
//   // return `http://m7.music.126.net/20250315175900/6f39e3be9745ed7eb9f081f4bbf5d1f9/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3`
//   // return hyRequest.get({
//   //   url: `/song/url?id=${id}`
//   // })
// }
export async function getSongPlayUrl(id: number) {
  const response = await hyRequest
    .get({
      url: `/song/url?id=${id}`
    })
  // 检查返回的数据是否符合预期
  if (response && response.data && response.data.length > 0) {
    // 提取 data 数组中第一个元素的 url 值
    const songUrl = response.data[0].url
    return songUrl
  } else {
    throw new Error('Failed to get song URL')
  }
}

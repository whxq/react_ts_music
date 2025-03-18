 export interface ILyric {
  time: number
  text: string
}

//正则表达式匹配
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString: string) {
  //拿到每一行的歌词
  const lines: string[] = lyricString.split('\n')

  //对每句歌词解析，解析成对应的对象
  const lyrics: ILyric[] = []
  for (const line of lines) {
    const results = timeRegExp.exec(line)
    if (!results) continue

    //获取每一组数据
    const time1 = Number(results[1]) * 60 * 1000
    const time2 = Number(results[2]) * 1000
    const time3 =
      results[3].length === 2 ? Number(results[3]) * 10 : Number(results[3])
    const time = time1 + time2 + time3
    // console.log(time1, time2, time3)
    // console.log(time)
    //获取每一组文本
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })
  }
  return lyrics
}

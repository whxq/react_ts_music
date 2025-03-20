import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayerInfo, PlayBarWrapper } from './style'
import { Link } from 'react-router-dom'
import { message, notification, Slider } from 'antd'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayMOdeAction
} from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = (props) => {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [currentLyric, setCurrentLyric] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong, lyrics, layricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      layricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  // const [messageApi, contextHolder] = message.useMessage()

  /** 组件内的副作用操作 */
  //useEffect(() => {
  //   // 1.播放音乐
  //   audioRef.current!.src = getSongPlayUrl(currentSong.id)
  //   audioRef.current
  //     ?.play()
  //     .then(() => {
  //       setIsPlaying(true)
  //       console.log('歌曲播放成功')
  //     })
  //     .catch((err) => {
  //       setIsPlaying(false)
  //       console.log('歌曲播放失败:', err)
  //     })

  //   // 2.获取音乐的总时长
  //   // setDuration(currentSong.dt)
  // }, [currentSong])

  useEffect(() => {
    // 异步获取歌曲播放地址
    const fetchSongUrl = async () => {
      try {
        // 等待 Promise 解析完成，获取 URL
        const songUrl = await getSongPlayUrl(currentSong.id)
        console.log(songUrl)

        if (audioRef.current) {
          audioRef.current.src = songUrl // 设置音频源
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
              console.log('歌曲播放成功')
            })
            .catch((err) => {
              setIsPlaying(false)
              console.log('歌曲播放失败:', err)
            })
        }
      } catch (error) {
        console.error('获取歌曲 URL 失败:', error)
      }
    }

    //  调用异步函数
    fetchSongUrl()
    //获取音乐总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  /** 组件内部的事件处理 */
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  //音乐切换
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }

  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayMOdeAction(newPlayMode))
  }

  function handleSliderChanged(value: number) {
    // console.log(value);
    //获取点击位置时间
    const currentTime = (value / 100) * duration

    //设置当前播放时间
    audioRef.current!.currentTime = currentTime / 1000

    //
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  function handleSliderChanging(value: number) {
    //目前处于拖拽状态
    setIsSliding(true)

    setProgress(value)

    //获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  //音乐播放进度处理
  function handleTimeUpdate() {
    // console.log('handleTimeUpdate',audioRef.current!.currentTime);
    //获取当前播放时间
    const currentTime = audioRef.current!.currentTime * 1000
    //计算当前歌曲进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    //根据当前时间匹配对应的歌词
    //cunrrentTime/lyrics
    //currentTime/lyrics
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    //匹配上歌词
    if (layricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
    console.log(lyrics[index]?.text)
    //展示对应的歌词

    // message.open({
    //   content: lyrics[index]?.text,
    //   key: 'lyric',
    //   duration: 0
    // })
    if (lyrics[index]?.text) {
       setCurrentLyric(lyrics[index].text) //  更新歌词状态
    }
  }

  //歌曲进度条结束自动播放下一首
  function handleTimeEnde() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  return (
    <>
      {/* {contextHolder} */}
      <PlayBarWrapper className="sprite_playbar">
        <div className="content wrap-v2">
          <BarControl isPlaying={isPlaying}>
            <button
              className="btn sprite_playbar prev"
              onClick={() => handleChangeMusic(false)}
            ></button>
            <button
              className="btn sprite_playbar play"
              onClick={handlePlayBtnClick}
            ></button>
            <button
              className="btn sprite_playbar next"
              onClick={() => handleChangeMusic()}
            ></button>
          </BarControl>
          <BarPlayerInfo>
            <Link to="/player">
              <img
                className="image"
                src={getImageSize(currentSong?.al?.picUrl, 50)}
                alt=""
              />
            </Link>
            <div className="info">
              <div className="song">
                <span className="song-name">{currentSong.name}</span>
                <span className="singer-name">
                  {currentSong?.ar?.[0]?.name}
                </span>
              </div>
              <div className="progress">
                <Slider
                  step={0.5}
                  value={progress}
                  tooltip={{ formatter: null }}
                  onChange={handleSliderChanging}
                  onAfterChange={handleSliderChanged}
                />
                <div className="time">
                  <span className="current">{formatTime(currentTime)}</span>
                  <span className="divider">/</span>
                  <span className="duration">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </BarPlayerInfo>
          <BarOperator playMode={playMode}>
            <div className="left">
              <button className="btn pip"></button>
              <button className="btn sprite_playbar favor"></button>
              <button className="btn sprite_playbar share"></button>
            </div>
            <div className="right sprite_playbar">
              <button className="btn sprite_playbar volume"></button>
              <button
                className="btn sprite_playbar loop"
                onClick={handleChangePlayMode}
              ></button>
              <button className="btn sprite_playbar playlist"></button>
              <button className="btn quality"></button>
            </div>
          </BarOperator>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleTimeEnde}
        />
        <div className={`lyric-display ${isPlaying ? 'active' : ''}`}>
          {currentLyric}
        </div>
      </PlayBarWrapper>
    </>
  )
}

export default memo(AppPlayerBar)

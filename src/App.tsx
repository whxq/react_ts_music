import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
// import { useAppSelector, useAppDispatch } from './store'
// import ChangeMessage from './store'
import routes from './router'
// import { changeMessage } from './store/modules'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './views/player/store/player'
import { BackTop } from 'antd'
function App() {
  // const { count, message } = useAppSelector((state) => ({
  //   count: state.counter.count,
  //   message: state.counter.message
  // }))

  // const dispatch = useAppDispatch()
  // function handleChangeMessage() {
  //   // console.log('handle');
  //   dispatch(changeMessage('hahhhhh'))
  // }

  //获取某一首歌
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(1842025914))
  }, [])
  return (
    <div className="App">
      <AppHeader />
      {/* <h2>当前计数：{count}</h2>
      <h2>当前消息：{message}</h2> */}
      {/* <button onClick={handleChangeMessage}>修改message</button> */}
      <Suspense fallback="loading ...">
        <div>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      {/* 播放工具栏 */}
      <AppPlayerBar />
      <BackTop />
    </div>
  )
}

export default App

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend'
import { LockFilled } from '@ant-design/icons'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    // console.log(res)
    dispatch(changeBannersAction(res.banners))

    return res.data
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    // console.log(res)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumAction(res.albums))
    // console.log(res)
  }
)

export const fetchSettleSingersAction = createAsyncThunk(
  'SettleSingers',
  async (arg, { dispatch }) => {
    const res = await getArtistList(5)
    dispatch(changeSettleSingersAction(res.artists))
    // console.log(res)
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  SettleSingers: any[]
  // upRanking: any
  // newRanking: any
  // originRanking: any
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  SettleSingers: []
  // upRanking:{}
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingersAction(state, { payload }) {
      state.SettleSingers = payload
    }
  }
})

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    //获取榜单数据
    //每个请求单独处理
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     // console.log(res)
    //     switch (id) {
    //       case 19723756:
    //         console.log('sheng', res)
    //         break
    //       case 3779629:
    //         console.log('xin', res)
    //         break
    //       case 2884035:
    //         console.log('chuang', res)
    //         break
    //     }
    //   })
    // }

    //将三个结果拿到，统一放到一个数组里面
    //获取所有结果后，进行dispatch操作
    //获取到的结果一定是有正确顺序的
    let index = 0
    const promise: Promise<any>[] = []
    for (const id of rankingIds) {
      promise.push(getPlaylistDetail(id))
    }
    Promise.all(promise).then((res) => {
      const playlists = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingsAction,
  changeSettleSingersAction
} = recommendSlice.actions
export default recommendSlice.reducer

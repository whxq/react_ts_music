import styled from 'styled-components'

export const PlayBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;
  .lyric-display {
    position: fixed;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 8px 16px;
    border-radius: 4px;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
    width: 1030px;
  }
`
interface IBarControl {
  isPlaying: boolean
}
export const BarControl = styled.div<IBarControl>`
  display: flex;
  align-items: center;
  width: 137px;
  .btn {
    cursor: pointer;
  }

  .prev,
  .next {
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    &:hover {
      background-position: -40px
        ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    }
  }

  .next {
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
`
export const BarPlayerInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        top: -3px;
        width: 466px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')})
            left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -7px;
          background: url(${require('@/assets/img/sprite_icon.png')}) 0 -250px;
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`
interface IBarOperator {
  playMode: number
}

export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${require('@/assets/img/pip_icon')});
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 173px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.playMode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
      &:hover {
        cursor: pointer;
        background-position: ${(props) => {
          switch (props.playMode) {
            case 1:
              return '-93px -248px'
            case 2:
              return '-93px -344px'
            default:
              return '-33px -344px'
          }
        }};
      }
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
    }
    .quality {
      background: url(${require('@/assets/img/audio-quality.png')});
      background-size: 45px 30px;
      margin-left: 4px;
      width: 41px;
      text-align: center;
      margin-bottom: 4px;
      &:hover {
        background: url(${require('@/assets/img/audio-quality-hover.png')});
        background-size: 45px 30px;
        margin-left: 4px;
        width: 41px;
        text-align: center;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }
  }
`

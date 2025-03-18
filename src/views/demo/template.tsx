import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Template: FC<IProps> = (props) => {
  return (
    <>
      <div>Template</div>
    </>
  )
}

export default memo(Template)

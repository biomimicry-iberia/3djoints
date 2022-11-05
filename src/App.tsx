import { cylinder, rectangle } from '@jscad/modeling/src/primitives'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { useEffect, useState } from 'react'
import { Renderer } from './hooks/render'
import { Box } from '@mui/material'

const App: React.FC = () => {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })
  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize({ w: window.innerWidth, h: window.innerHeight })
    })
  }, [])

  const [solids] = useState<any[]>([
    union(
      extrudeLinear(
        { height: 10 },
        rectangle({ size: [34, 2], center: [17, 1] })
      ),
      extrudeLinear(
        { height: 10 },
        rectangle({ size: [2, 22], center: [1, 11] })
      ),
      extrudeLinear(
        { height: 10 },
        rectangle({ size: [2, 22], center: [13, 11] })
      ),
      extrudeLinear(
        { height: 10 },
        rectangle({ size: [20, 2], center: [24, 13] })
      )
      //   extrudeLinear(
      //     { height: 2 },
      //     rectangle({ size: [10, 20], center: [5, 10] })
      //   )
    ),

    // cylinder({ center: [0, 0, 12], height: 24, radius: 8, segments: 36 }),
    // subtract(
    //   cylinder({ center: [0, 0, 12], height: 24, radius: 8, segments: 36 }),
    //   cylinder({ center: [0, 0, 12], height: 24, radius: 6.4, segments: 36 })
    // ),
  ])
  return (
    <Box
      sx={{
        width: size.w,
        height: size.h,
      }}
    >
      <Renderer solids={solids} height={size.h} width={size.w} />
    </Box>
  )
}

export default App

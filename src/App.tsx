import { cylinder } from '@jscad/modeling/src/primitives'
import { subtract } from '@jscad/modeling/src/operations/booleans'
import { Renderer } from 'jscad-react'
import { useState } from 'react'

const App: React.FC = () => {
  const [solids] = useState<any[]>([
    subtract(
      cylinder({ center: [0, 0, 12], height: 24, radius: 8, segments: 36 }),
      cylinder({ center: [0, 0, 12], height: 24, radius: 6.4, segments: 36 })
    ),
  ])
  return <Renderer solids={solids} height={500} width={600} />
}

export default App

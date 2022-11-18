import { Flex } from '@mantine/core'
import { Body } from './components/layout'
import {
  Deg90Block,
  Deg90x2_120_interiorBlock,
  Deg90x3Block,
  Deg120x3Block,
} from './components/organisms'

const App: React.FC = () => {
  return (
    <Body>
      <Flex direction="column">
        <Deg90Block />
        <Deg90x3Block />
        <Deg120x3Block />
        <Deg90x2_120_interiorBlock />
      </Flex>
    </Body>
  )
}

export default App

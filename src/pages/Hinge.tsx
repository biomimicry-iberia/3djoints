import { Flex } from '@mantine/core'
import { Body } from '../components/layout'
import { HingeBlock } from '../components/organisms'

export const HingePage: React.FC = () => {
  return (
    <Body>
      <Flex direction="column">
        <HingeBlock />
      </Flex>
    </Body>
  )
}

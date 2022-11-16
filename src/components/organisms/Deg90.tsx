import { Box, Button, Divider, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { useDownloadGeom } from '../../hooks'
import { Renderer } from '../../hooks/render'
import { Deg90 } from '../../shapes'

export function Deg90Block() {
  const deg90 = new Deg90(5.1, 5, 2)

  const [solids] = useState<any[]>([deg90.getUnion()])
  return (
    <Flex direction="column" align="stretch" w="100%" mt="2rem">
      <Title order={2}>Deg90</Title>
      <Divider style={{ width: '100%' }} my="1.25rem" />
      <Flex w="100%" justify="space-between">
        <Box>
          <Title order={3} mb="xl">
            Introduce custom parameters
          </Title>
          <Button
            onClick={() => useDownloadGeom(deg90.getUnion(), '90-degrees')}
          >
            Descargar
          </Button>
        </Box>
        <Renderer solids={solids} height={400} width={500} />
      </Flex>
    </Flex>
  )
}

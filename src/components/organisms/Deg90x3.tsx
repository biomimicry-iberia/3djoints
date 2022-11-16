import { Box, Button, Divider, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { useDownloadGeom } from '../../hooks'
import { Renderer } from '../../hooks/render'
import { Deg90x3 } from '../../shapes'

export function Deg90x3Block() {
  const deg90x3 = new Deg90x3(5.1, 5, 2)

  const [solids] = useState<any[]>([deg90x3.getUnion()])
  return (
    <Flex direction="column" align="stretch" w="100%" mt="2rem">
      <Title order={2}>3 Sides 90 deg</Title>
      <Divider style={{ width: '100%' }} my="1.25rem" />
      <Flex w="100%" justify="space-between">
        <Box>
          <Title order={3} mb="xl">
            Introduce custom parameters
          </Title>
          <Button
            onClick={() => useDownloadGeom(deg90x3.getUnion(), '90x3-degrees')}
          >
            Descargar
          </Button>
        </Box>
        <Renderer solids={solids} height={400} width={500} />
      </Flex>
    </Flex>
  )
}

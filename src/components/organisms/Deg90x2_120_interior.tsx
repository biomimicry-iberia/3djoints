import { Box, Button, Divider, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { useDownloadGeom } from '../../hooks'
import { Renderer } from '../../hooks/render'
import { Deg90x2_120_interior } from '../../shapes'

export function Deg90x2_120_interiorBlock() {
  const deg90x3 = new Deg90x2_120_interior(5.1, 5, 2)

  const [solids] = useState<any[]>([deg90x3.getUnion()])
  return (
    <Flex direction="column" align="stretch" w="100%" mt="2rem">
      <Title order={2}>Deg 90 + 30, 3 sides</Title>
      <Divider style={{ width: '100%' }} my="1.25rem" />
      <Flex w="100%" justify="space-between">
        <Box>
          <Title order={3} mb="xl">
            Introduce custom parameters
          </Title>
          <Button
            onClick={() =>
              useDownloadGeom(deg90x3.getUnion(), '90x2_120_side-degrees')
            }
          >
            Descargar
          </Button>
        </Box>
        <Renderer solids={solids} height={400} width={500} />
      </Flex>
    </Flex>
  )
}

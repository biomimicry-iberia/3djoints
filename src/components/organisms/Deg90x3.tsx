import {
  Box,
  Button,
  Divider,
  Flex,
  NumberInput,
  Text,
  Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useDownloadGeom } from '../../hooks'
import { Renderer } from '../../hooks/render'
import { Deg90x3 } from '../../shapes'

export function Deg90x3Block() {
  const [woodThickness, setWoodThickness] = useState(5.1)
  const [height, setHeight] = useState(5)
  const [thickness, setThickness] = useState(2)
  const [shape, setShape] = useState(
    new Deg90x3(woodThickness, height, thickness).getUnion()
  )
  useEffect(() => {
    setShape(new Deg90x3(woodThickness, height, thickness).getUnion())
  }, [woodThickness, height, thickness])

  return (
    <Flex direction="column" align="stretch" w="100%" mt="2rem">
      <Title order={2}>3 Sides 90 deg</Title>
      <Divider style={{ width: '100%' }} my="1.25rem" />
      <Flex w="100%" justify="space-between">
        <Box>
          <Title order={3} mb="xl">
            Introduce custom parameters
          </Title>
          <Text>In order to customize your piece, fill in the form.</Text>
          <Box component="form">
            <NumberInput
              mt="1rem"
              value={woodThickness}
              label="Opening"
              onChange={(value) => setWoodThickness(value as number)}
              precision={1}
              step={0.1}
            />
            <NumberInput
              mt="1rem"
              value={height}
              label="Height"
              onChange={(value) => setHeight(value as number)}
              precision={1}
              step={0.1}
            />
            <NumberInput
              mt="1rem"
              value={thickness}
              label="Thickness"
              onChange={(value) => setThickness(value as number)}
              precision={1}
              step={0.1}
            />
          </Box>
          <Button
            mt="1rem"
            onClick={() => useDownloadGeom(shape, '90x3-degrees')}
          >
            Descargar
          </Button>
        </Box>
        <Renderer solids={[shape]} height={400} width={500} />
      </Flex>
    </Flex>
  )
}

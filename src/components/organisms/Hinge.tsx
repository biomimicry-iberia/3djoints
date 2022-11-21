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
import { Hinge } from '../../shapes'

export function HingeBlock() {
  const [woodThickness, setWoodThickness] = useState(5.1)
  const [height, setHeight] = useState(5)
  const [thickness, setThickness] = useState(2)
  const [shape, setShape] = useState(
    new Hinge(woodThickness, height, thickness).getUnion()
  )

  useEffect(() => {
    setShape(new Hinge(woodThickness, height, thickness).getUnion())
  }, [woodThickness, height, thickness])

  return (
    <Flex direction="column" align="stretch" w="100%" mt="2rem">
      <Title order={2}>Hinge</Title>
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
          <Flex mt="1rem" gap="sm">
            <Button onClick={() => useDownloadGeom(shape, 'hinge')}>
              Descargar
            </Button>
          </Flex>
        </Box>
        <Renderer animate solids={[shape]} height={400} width={500} />
      </Flex>
    </Flex>
  )
}

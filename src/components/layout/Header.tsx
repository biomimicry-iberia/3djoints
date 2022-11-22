import { Container, createStyles, Divider, Flex } from '@mantine/core'
import { logo } from '../../assets'
import { mainMenu } from '../../constants'
import { Menu } from '../molecules'

const useStyles = createStyles({
  img: {
    maxWidth: 140,
    height: 'auto',
  },
})

export const Header = () => {
  const { classes } = useStyles()
  return (
    <Container py="lg">
      <Flex align="center" justify="space-between">
        <img src={logo} className={classes.img} />
        <Menu menu={mainMenu} />
      </Flex>
      <Divider mt="lg" />
    </Container>
  )
}

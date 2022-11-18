import { Container, createStyles, Divider } from '@mantine/core'
import { logo } from '../../assets'

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
      <img src={logo} className={classes.img} />
      <Divider mt="lg" />
    </Container>
  )
}

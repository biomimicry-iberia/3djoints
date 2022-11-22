import { Box, Container, createStyles, Divider, Flex } from '@mantine/core'

const useStyles = createStyles({
  heart: {
    fontSize: 36,
    color: 'red',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
})

export const Footer = () => {
  const { classes } = useStyles()
  return (
    <Box component="footer">
      <Container>
        <Divider mt="2rem" />
        <Flex align="center" justify="center" my="2rem">
          <span>Built with</span> <span className={classes.heart}>♥</span>{' '}
          <span>by Biomimicry Iberia</span>
        </Flex>
      </Container>
    </Box>
  )
}

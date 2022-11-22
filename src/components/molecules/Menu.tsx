import { Box, createStyles } from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles({
  menu: {
    display: 'flex',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    li: {
      marginLeft: '1rem',
      '&:first-child': {
        margin: 0,
      },
      a: {
        textDecoration: 'none',
        color: '#333',
      },
    },
  },
})

type TMenu = {
  menu: {
    name: string
    url: string
  }[]
}

export const Menu = ({ menu }: TMenu) => {
  const { classes } = useStyles()
  return (
    <Box component="ul" className={classes.menu}>
      {menu.map((m) => (
        <li key={m.url}>
          <Link to={m.url}>{m.name}</Link>
        </li>
      ))}
    </Box>
  )
}

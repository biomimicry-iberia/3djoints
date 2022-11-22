import { Container } from '@mantine/core'
import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type TBody = {
  children: React.ReactNode
}
export const Body = ({ children }: TBody) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

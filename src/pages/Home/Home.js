import React from 'react'
import { NavBar, GoogleMap, SearchBox, Compass } from 'containers'
import { Container } from 'components'

const Home = () => (
  <main>
    <NavBar />
    <Container>
      <SearchBox placeholder='Where are we going?' />
    </Container>
    <GoogleMap />
    <Compass />
  </main>
)

export default Home

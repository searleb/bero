import React from 'react'
import { GoogleMap, Compass } from 'containers'
import { NavBar } from 'components'

const Home = () => (
  <main>
    <NavBar />
    <GoogleMap />
    <Compass />
  </main>
)

export default Home

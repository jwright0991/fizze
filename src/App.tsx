import React from 'react';
import './App.css';
import {Grid, GridItem} from './layout/grid'
import {useMediaQueryValue} from './hooks/useMediaQuery'

function App() {
  const value = useMediaQueryValue({xs: 4, sm:4, md: 2, lg: 1, xl: 1})
  return (
    <Grid columnSpacing={10} rowSpacing={10} style={{}} wrap='wrap'>
      <GridItem span={value} basis={4} style={{border: 'solid 1px',height:'100px'}} />
      <GridItem span={value} basis={4} style={{border: 'solid 1px',height:'200px'}} />
      <GridItem span={value} basis={4} style={{border: 'solid 1px',height:'100px'}} />
      <GridItem span={value} basis={4} style={{border: 'solid 1px',height:'100px'}} />
    </Grid>
    )
}

export default App;

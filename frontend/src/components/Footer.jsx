import React from 'react'
import Cartradetech from './../images/cartrade_tech.svg'
import Olx from './../images/olx.svg'
import Carwale from './../images/carwale.svg'
import Bikewale from './../images/bikewale.svg'
import Cartrade from './../images/cartrade.svg'
import Mobility from './../images/mobility.svg'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    const Footericon=[Cartradetech,Olx, Carwale, Bikewale, Cartrade, Mobility ]
   
  return (
   <section className='footer' style={{backgroundColor:"rgb(0,47,52)"}}>
   <Container >
    <Row >
        
        {Footericon.map((elem1, ind1) => {
            return(
        <Col md={2} key={ind1}>
    <img src={elem1} alt='footer-img-{ind1+1}' width={"100px"}/>
     </Col>
            )
     })}
    
    </Row>
    </Container>
    </section>
  )
}

export default Footer

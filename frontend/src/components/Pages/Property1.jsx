import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Property1 = () => {
  return (
    <>
   

    <form
      style={{
        width: "50%",
       
        border: "1px solid",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div>
        <label>Brand *</label>
      </div>

      <div>
        <label>Year *</label>
      </div>

      <div>
        <label>Fuel *</label>
      </div>

      <div>
        <label>Transmission *</label>
      </div>

      <div>
        <label>KM driven *</label>
      </div>

      <div>
        <label>No. of Owners *</label>
      </div>

      <div>
        <label>Ad title *</label>
      </div>

      <div>
        <label>Description *</label>
      </div>

      <hr></hr>

      <div>
        <h1>SET A PRICE</h1>
        <label>Price *</label>
      </div>
      <hr />

      <div>
        <h1>UPLOAD UP TO 20 PHOTOS</h1>
      </div>
      <hr />

      <div>
        <h1>CONFIRM YOUR LOCATION</h1>
        <label>State *</label>
      </div>
      <hr />

      <div>
        <h1>REVIEW YOUR DETAILS</h1>
        <Row>
          <Col sd={2} md={2} lg={2}>
          <h2>Deepika</h2>
          </Col>
          <Col sd={4} md={4} lg={4}>
          <div>
            <label>Name</label>
          </div>
          </Col>
        </Row>
      </div>
      <hr />


    </form>
  </>
  )
}

export default Property1
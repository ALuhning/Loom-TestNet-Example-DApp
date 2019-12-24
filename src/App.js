import React, { Component } from 'react';
import './App.css';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap'
import Contract from './utils/Contract'

class App extends Component {
  constructor(props) {
    super(props)

    this.contract = new Contract()

    this.state = {
      storageValue: 0,
      error: null,
      loading: false
    }
  }

  componentDidMount() {
    this.contract.loadContract()
  }  

  async addToSimpleStorage() {
    if( this.contract.simpleStoreInstance && this.contract.currentUserAddress) {
      const value = this.storageAmountInput.value
      this.setState({ loading: true })
      const result = await this.contract.simpleStoreInstance.methods.set(value).send({ from: this.contract.currentUserAddress })
      this.setState({
            storageValue: result.events.NewValueSet.returnValues[0],
            loading: false
          })
    } else {
      this.setState({
          error: new Error('simple storage instance not loaded')
      })
    }
  }


render() {
  return (
    <div className="App">
    <Container>
      <Card>
        <Card.Header as="h3">
          Simple Storage DApp
        </Card.Header>
        <Card.Body>
          <Card.Title>Storage Value is: {!this.state.loading ? this.state.storageValue : 'Loading...'}</Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Label>
                      Storage Amount
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Enter Number"
                      ref={c => {this.storageAmountInput = c}}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.addToSimpleStorage()
                      }}
                    >
                      Set Storage
                    </Button>
                  </Col>
                </Row>
            </Form>
          </Card.Body>
      </Card>
     </Container>
    </div>
  );
}
}

export default App;

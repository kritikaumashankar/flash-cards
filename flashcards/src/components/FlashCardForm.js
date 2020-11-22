import React from 'react';
import {Container, Form, FormGroup, Label, Input, Col, Button} from 'reactstrap';

class FlashCardForm extends React.Component{

  defaultValues = { _id:null,question: '', answer: ''}
  state = {...this.defaultValues}

  componentDidMount(){
    if (this.props.fc!==null)
      this.setState({...this.props})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let qa = this.state;
    this.props.submit(qa);
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    const { target: { name, value }} = e;
    this.setState({ [name]: value })
  }

  render(){
    const {question, answer} = this.state
    return(
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleText">Question: </Label>
            <Input type="textarea" name="question" id="question" value={question} onChange={this.handleChange}/>
            <Label for="exampleText">Answer: </Label>
            <Input type="textarea" name="answer" id="answer" value={answer} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup check row>
          <Col sm={{ size: 50, offset: 5 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
        </Form>

      </Container>
    )
  }
}

export default FlashCardForm;
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import {getAllQA,addQA,editQA,deleteQA} from '../reducers/flashcards';
import FlashCardForm from './FlashCardForm';

class FlashCards extends Component{
  state = {
    lists: [],
    showForm: false,
    edit: {}
  }

  componentDidMount(){
    this.props.dispatch(getAllQA());
    this.setState({lists : this.props.flashcards});
  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.props.flashcards.length!== prevProps.flashcards.length)
      this.setState({lists : this.props.flashcards});
  }
  submit = (flashcard) => {
    const { dispatch } = this.props;
    const func = flashcard._id!==null ? editQA : addQA;
    dispatch(func(flashcard));
    this.setState({ showForm: false, edit: null });
  };
  
  toggleForm = () =>{
    this.setState({showForm: !this.state.showForm})
  }
  editFlashCard = (fc) =>{
    this.setState({showForm: !this.state.showForm, edit: fc});
  }
  deleteFlashCard =(fc) =>{
    this.props.dispatch(deleteQA(fc));
    this.setState({ showForm: false });
  }
  displayFlashgCards = ()=>{
    return this.state.lists.map( fc=>
          <Row key={fc._id}>
            <Col xs="4">{fc.question}</Col>
            <Col xs="4">{fc.answer}</Col>
            <Col xs="2"><Button onClick={()=>{this.editFlashCard(fc)}}>Edit</Button></Col>
            <Col xs="2"><Button onClick={()=>{this.deleteFlashCard(fc)}}>Delete</Button></Col>
          </Row>
    )
  }

  render(){
    const {showForm,edit} = this.state;
    
    return(
      <>
      <Container>
        
        <Button color="primary" active onClick={this.toggleForm}>{ showForm? 'FlashCard Q&A List': 'Add FlashCard Q&A'}</Button>
        { showForm ? <FlashCardForm {...edit} submit={this.submit} /> : this.displayFlashgCards() } 

        <Button onClick={this.props.history.goBack}>Back</Button>
       </Container>
      </>
    )};
}
const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards
  };
};
export default withRouter(connect(mapStateToProps)(FlashCards));
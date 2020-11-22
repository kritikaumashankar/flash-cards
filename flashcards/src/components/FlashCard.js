import React, {Component} from 'react'
import {getAllQA} from '../reducers/flashcards';
import { withRouter } from "react-router-dom";
import '../App.css'
import { connect } from 'react-redux';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Collapse, Button, CardBody, Card 
} from 'reactstrap';
import styled from 'styled-components'
class FlashCard extends Component{

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, collapse: false };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(getAllQA());
  }
  
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.flashcards.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex, collapse: false });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.flashcards.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex,collapse: false });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render(){
    console.log("inside flashacrd"+ process.env.PUBLIC_URL)
    const {activeIndex} = this.state
    const slides = this.props.flashcards.map((item) => {
      return (
        <StyledCarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item._id}
        >

          <h2 style={{textAlign: 'center'}}>{item.question}</h2>
          <Button style={{margin:'3vh 30vw',textAlign: 'center'}} color="primary" onClick={this.toggle} >Click here for Answer!</Button>
          <Collapse style={{margin:'auto',textAlign: 'center'}} isOpen={this.state.collapse}>
            <Card style={{width: '50vw',margin: 'auto'}}>
              <CardBody>
                <h2>{item.answer}</h2>
              </CardBody>
            </Card>
          </Collapse>
        </StyledCarouselItem>
      );
    });
    return(
      <>
        <StyledCarousel
        style={{height: '30vh! important',width: '30vw! important'}}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {slides}
        <StyledCarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <StyledCarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </StyledCarousel>
      </>
    )
  }
}

const StyledCarousel = styled(Carousel)`
  width:75vw;
  top: 20vh;
  height: 50vh;
  margin: auto;
`

const StyledCarouselItem = styled(CarouselItem)`
  margin: auto;
`

const StyledCarouselControl = styled(CarouselControl)`
span .carousel-control-prev-icon {
  background-image:url(../images/previous.png)! important;
}

span .carousel-control-next-icon {
  backgroundImage:url(../images/next.png)! important;
}
`

const mapStateToProps = (state) => {
  return {
    flashcards: state.flashcards
  };
};
export default withRouter(connect(mapStateToProps)(FlashCard));
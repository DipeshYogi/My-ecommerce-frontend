import React from 'react';
import './header.css';
import {Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {getSimilarityScores} from '../../../actions/filterActions';
import {connect} from 'react-redux';


class SearchBar extends React.Component{
  state = {
    searchInput:'',
    displaySuggest: false
  }

  onInputChange = (input) =>{
    this.setState({searchInput:input})
    this.props.getSimilarityScores(input)
  }

  onBlur = () =>{
    setTimeout(()=>{
      this.setState({displaySuggest:false})
    }, 150)
  }

  render(){
    const {suggestedItems} = this.props;

    return(
      <div>
        <div className="header1__input">
          <input type="text" placeholder="Search for Products..."
                 value={this.state.searchInput}
                 onChange={(e)=>this.onInputChange(e.target.value)}
                 onFocus={()=> this.setState({displaySuggest:true})}
                 onBlur={()=> this.onBlur() } />
          <Button><SearchIcon fontSize="large"/></Button>
        </div>
        {suggestedItems.length > 0 && this.state.displaySuggest ?
          <div className="header1__suggest">
            {suggestedItems.map(items=>(
              <Button
                onClick={()=>this.onInputChange(items.text)}>
                <div className="header1__suggest__item">
                  <h5>{items.text}</h5>                 
                </div>
              </Button>
            ))}
          </div> 
          : null
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  suggestedItems: state.searchReducer.finalScores
})

export default connect(mapStateToProps,{getSimilarityScores})(SearchBar);
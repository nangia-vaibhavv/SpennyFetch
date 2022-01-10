import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import img from './spenny2.png';
class App extends Component {
  constructor(){
    super();
    this.state = {
      tag:'food',
      pokemonList: [],
      indexValue:0,
      
    };
  }

  componentDidMount(){
    this.updateSearch();
  }
  updateSearch=()=>{
    // alert(process.env.REACT_APP_API_KEY);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags='+this.state.tag+'nyc&per_page=15&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      // alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="dogs" className='pictureClass' src={srcPath}></img>
        )
      })
      this.setState({pokemonList: picArray});
    }.bind(this))
  }
  

  HandleChange=(e)=>{
    this.setState({tag:e.target.value})
  }

  Delay=(function(){
    var timer=0;
    return function(callback,ms){
      clearTimeout(timer);
      timer=setTimeout(callback,ms);
    }
  })();

  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={img} className="App-logo" alt="logo" />
          <h1 className="App-title">Image Gallery</h1>
        
        </header>
        <div className='hr'></div>
        <div className='hr2'></div>
        <p className='tt'><input className='textInput'  placeholder='🔍' 
        onChange={this.HandleChange}
        onKeyUp={()=>this.Delay(function(){
          this.updateSearch();
        }.bind(this),1000)}></input></p>
       
        
        <div className='gallery'>
      
        <span className='pic'>
        {this.state.pokemonList}
        </span>
        
        </div>
        
      </div>
    
    );
  }
}

export default App;

import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import Newscontainer from './component/Newscontainer';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWSAPI
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
     
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>

        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        
        <Routes>
        <Route path="/" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}   key='general' pagesize={5} category=' '/>} />
        <Route path="/entertainment" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}  key='entertainment' pagesize={5} category='entertainment'/>} />
        <Route path="/health" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}  key='health' pagesize={5} category='health'/>} />
        <Route path="/science" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}  key='science' pagesize={5} category='science'/>} />
        <Route path="/sports" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}  key='sports' pagesize={5} category='sports'/>} />
        <Route path="/technology" element={<Newscontainer setprogress={this.setProgress}  apikey={this.apikey}  key='technology' pagesize={5} category='technology'/>} />
      </Routes>
      </BrowserRouter>
      </div>
    )
  }
}

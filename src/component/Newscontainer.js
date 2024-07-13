import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class Newscontainer extends Component {

  static defaultProps = {
    country:'in',
    pagesize:8,
    category:'general',
  }

  static propTypes={
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    // console.log("hello i ama aconstructor");
    this.state={
      articles: [],
      loading: true,
      page:1,
      totalResults: 0,
      category:[]
      
    }
  }
  async componentDidMount(){
    this.props.setprogress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setprogress(30);
    let parseddata=await data.json()
    this.props.setprogress(70);
    // console.log(parseddata)
    this.setState({articles:parseddata.articles,
      totalResults:parseddata.totalResults,
      loading:false
    })
    this.props.setprogress(100);
   

  }

  // handleprevious=async()=>{

  //   let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=4fca032d8aea40009751e913b1bfe42e&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parseddata=await data.json()
  //   // console.log(parseddata)
  //   this.setState({
  //     page:this.state.page-1,
  //     articles:parseddata.articles,
  //     loading:false
  //   })

  // }

  // handlenext=async()=>{
  //   if(this.state.page+1>Math.ceil((this.state.totalResults/this.props.pagesize))){

  //   }
  //   else{

  //   let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=4fca032d8aea40009751e913b1bfe42e&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parseddata=await data.json()
  //   // console.log(parseddata)
  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parseddata.articles,
  //     loading:false
  //   })
  // }
    
  // }

  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // const setError='null';
    this.setState({page:this.state.page+1})
     
    const url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    //  this.setState({loading:true})
    let data=await fetch(url);
    
    let parseddata=await data.json()
    this.setState({
      articles:this.state.articles.concat(parseddata.articles),
      totalResults:parseddata.totalResults,
      // key:parseddata.source.id
      // loading:false
    })

    // console.log(parseddata)
     

  };

  render() {
    return (
      <>
      
        <h1 className='text-center' style={{marginTop: '90px', marginBottom: '32px' }}>News-Dose TOP Headlines Daily News</h1>
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        <div className="row">
          { this.state.articles.map((element,index)=>{
            return <div className="col-md-4 my-3" key={index}>
            <Newsitem name={element.source.name} author={element.author} time={element.publishedAt} title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>

          })}
        </div>
        </div>

        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprevious}>&larr;Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil((this.state.totalResults/this.props.pagesize))} className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>


        </div> */}
        
        
        </>
        
      
    )
  }
}

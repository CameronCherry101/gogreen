import './App.css';
import greenlogo from './go-green-logo.png'
import thumbsdown from './thumbsdown.png'
import thumbsup from './thumbsup.png'
import search from './search.png'
import React from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: '',
      searched: false,
      loading: false,
      returnPage:''
    };

  }

  getScores=()=> {
    this.setState({
      loading: true,
      searched: false
    })
    axios.get('http://localhost:5000/wordscores?page=' + this.state.page)
          .then((response)=> {
            this.setState({
              loading: false,
              searched: true,
              returnPage: this.state.page,
              ...response.data
            });
          })
          .catch((error)=> {
            this.setState({
              loading: false
            });
            alert("Unable to connect to backend services");
            console.log(error);
          });
  }

  handleInput=(e)=> {
    this.setState({
      page:e.target.value
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
  
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet"/>
  
        <div className="box-area">
          <header>
            <div className="wrapper">
              <div className="logo">
                <img src={greenlogo} alt="Go Green" height="77.5px" width="187.5px"/>
              </div>
              <nav>
                <a>Profile</a>
                <a>Watchlist</a>
                <a>Account</a>
                <a>Settings</a>
              </nav>
              <div className="searchbar">
                <input type="text" id='search'className="bar" style={{width:"474px", height: "30px", outline:"none"}} placeholder="Search" onChange={this.handleInput}/>
                  <div className="button">
                    <button alt="searchbutton" style={{width:"35px", height:"35px"}} onClick= {()=>{if(!this.state.loading){this.getScores();} }}/>
                  </div>
                <a href="#"><i style={{top:"-30px"}} className="glyphicon glyphicon-search"></i></a>
              </div>
            </div>
          </header>
        </div>

        {this.state.loading && <ClipLoader color={"#FF4713"} loading={this.state.loading} css={{position:"absolute", top:"400px", right:"950px"}} size={150} />}

        {this.state.searched && 

        <div>
          <div className="sect1">
          <div className="about" >
            <h1>About {this.state.returnPage}</h1>
          </div>
        </div>
  
        <div className="STOCK">
          <div className="name" >
            <h2>{this.state.returnPage}</h2>
          </div>
          <div className="price">
              <h4>$123.45</h4>
          </div>
          <div className="GREENRATE"> 
            <h5>Go Green Rating</h5>
          </div>
          <div className="underline">
          </div>
          <div className={this.state.thumbsUpScore > this.state.thumbsDownScore ? "approvalbox" : "disapprovalbox"}>
            <div className="percentscore">
                <h6>{this.state.thumbsUpScore > this.state.thumbsDownScore ? this.state.thumbsUpScore : this.state.thumbsDownScore}%</h6>
              </div>
                <div className="ratename">
                  <h6>{this.state.thumbsUpScore > this.state.thumbsDownScore ? "Approval" : "Disapproval"}</h6>
                  </div>
            </div>
              <div className="approval_static">
                <div className="approvalpercentage" style= {{left: (this.state.thumbsUpScore / 100 * 695 - 20) + "px"}}>
                  <p>{this.state.thumbsUpScore}%</p>
                </div>
              </div>
              <div className="disapproval_static">
                <div className="disapprovalpercentage" style= {{left: (this.state.thumbsDownScore / 100 * 695 - 20) + "px"}}>
                  <p>{this.state.thumbsDownScore}%</p>
                </div>
              </div>
              <div className="approval_dynamic" style= {{width: (this.state.thumbsUpScore / 100 * 695) + "px"}}></div>
              <div className="disapproval_dynamic" style= {{width: (this.state.thumbsDownScore / 100 * 695) + "px"}}></div>
              <div className="thumbsup"><img src={thumbsup} alt="Approval" height="62px" width="75px"/></div>
              <div className="thumbsdown"><img src={thumbsdown} alt="Disapproval" height="62px" width="75px"/></div>
          </div>
        </div>}
        
      </div>  
    );
  }
}
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';

import img from './sunrise.jpg';
import svg from './growth3.svg';
import './style.css';



  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fbPicture: null,
      firstName: '',
      timeSpent: 0
    }
  }

  responseFacebook = (response) => {
  console.log(response);
  this.setState({
    fbPicture: response.picture.data.url,
    firstName: response.name.split(' ')[0]
  });
  console.log(this.state.fbPicture);
  }

  tick = () => {
    this.setState((prevState) => ({
      timeSpent: prevState.timeSpent + 1
    }));
    //this.state.timeSpent === 30 ? alert("Braaaaavo, tu es resté au moins 30 secondes hahaaha - voilà ta récompense " + this.state.firstName) : null;
  }

  alertBravo = () => {
    setTimeout(() => alert("BRAVO tu es là depuis siiiiiiii longtemps, 30 SECONDES " + this.state.firstName + " !!!"), 60000);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.alert = this.alertBravo();
  } 

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  render() {
    const { className, ...props } = this.props;
    return (
      <div className="App">
       <img src={img} className="Landing-page-img" alt="" />
        <div className="App-header1 col-lg-4">
        </div>
        <div className="content text-center container">
          <div className="row">
            <div className="col-xs-12">
            <h1>Welcome to <span className="liife-yellow">LIIFE</span> </h1>
              <div className="inside">
              <p className="find-your-path">Find your <span>Path</span>, grow your <span>Life</span></p>
              <img src={svg} className="growth" />
              <p></p>
            <form id="form" className="form-horizontal">
              <div className="form-group has-success has-feedback">
                <div className="col-sm-12">
                  <div className="input-group">
                    <span id="mail" className="input-group-addon">@</span>
                    <input type="mail" className="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status" placeholder="Your favorite mail" />
                  </div>
                  <span id="glyphicon-ok" className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                  <span id="inputGroupSuccess2Status" className="sr-only">(success)</span>
                </div>
              </div>
              <div className="form-group has-success has-feedback">
                <div className="col-sm-12">
                  <div className="input-group">
                    <span id="mail" className="input-group-addon glyphicon glyphicon-lock"></span>
                    <input type="password" className="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status" placeholder="Your best password" />
                  </div>
                  <span id="glyphicon-ok" className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                  <span id="inputGroupSuccess2Status" className="sr-only">(success)</span>
                </div>
              </div>
            </form>
                <div className="login-btn">
                  <FacebookLogin
                    appId="1774378529551502"
                    autoLoad={false}
                    size="small"
                    fields="name,email,picture"
                    scope="public_profile,user_friends,user_actions.books"
                    textButton="Connect with Facebook"
                    icon="fa-facebook"
                    callback={this.responseFacebook} />
                  </div>
                  {this.state.firstName ? <p>Mini {this.state.firstName} hehe!!</p> : null}
                  <img src={this.state.fbPicture} />
                </div>
                </div>
              </div>
            </div>
         </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

import logo from './logo.png';
import SerieList from './components/SerieList';
import { AuthDialog } from './components/Dialog';
import seriesApiClient from './services/seriesApiClient';

const url = 'https://searchasdf.search.windows.net/indexes/azuresql-index/docs?api-version=2017-11-11';

class App extends Component {
  state = {
    series: [],
    authOpen: false,
    apiKey: null
  };

  openAuth = () => this.setState({ authOpen: true });
  closeAuth = () => this.setState({ authOpen: false });
  saveAuth = () => {
    this.props.cookies.set('apiKey', this.state.apiKey, { maxAge: 500, sameSite: 'strict' });
    this.closeAuth();
    this.fetchSeries();
  }
  handleChange = event => this.setState({ apiKey: event.target.value });
  fetchSeries = () => {
    seriesApiClient(url, this.props.cookies.get('apiKey'), () => {
      this.props.cookies.remove('apiKey');
      this.openAuth();
    }).then(data => this.setState({series: data}));
  }

  componentDidMount() {
    if (!this.props.cookies.get('apiKey')) {
      this.openAuth();
    }
    else {
      this.fetchSeries();
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <AuthDialog open={this.state.authOpen} handleClose={this.closeAuth} handleSave={this.saveAuth} handleChange={this.handleChange} />
        <SerieList listOfSeries={this.state.series} />
      </div>
    );
  }
}

export default withCookies(App);

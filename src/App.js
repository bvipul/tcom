import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import store from './store';

import './styles/app.css';

class App extends Component {
	render() {
		return (	
			<Provider store={store}>
				<BrowserRouter>
					<div className="app">
						<Route exact path="/" component={Header} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

render(<App/>, document.getElementById('root'));
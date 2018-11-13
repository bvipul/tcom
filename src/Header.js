import React from 'react';
import { Container, Header as HeaderUI, Menu, Button } from 'semantic-ui-react';

import Login from './Login';
class Header extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isOpen: false
		};
		
		this.toggle = this.toggle.bind(this);
	}
	
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	
    render() {
        return (
			<Container fluid>
				<HeaderUI as="h2">Tcom</HeaderUI>
				{/* <Row className="header">
					<Col xs="6" sm="4" className="header-logo">Tcom</Col>
					<Col sm="8" className="menu text-right">
						<Button outline size="sm" onClick={this.toggle}>Login</Button>{' '}
						<Button outline size="sm">Register</Button>
					</Col>
				</Row> */}
				<Menu>
					<Container>
						<HeaderUI as="h2">Tcom</HeaderUI>
						<Menu>
							<Menu.Item position="right" name="login">
								<Button as='a' inverted={true} onClick={this.toggle}>
									Login
								</Button>
								<Button as='a' inverted={true}>
									Register
								</Button>
							</Menu.Item>
						</Menu>
					</Container>
				</Menu>
				<Login isOpen={this.state.isOpen} toggle={this.toggle}/>
			</Container>
        );
    }
}

export default Header;
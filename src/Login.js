import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormGroup,
    FormFeedback,
    Form,
    Label,
    Input
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import Server from './Helpers/Server';
import { authLogin } from './store/actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        authLogin
    }, dispatch);
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("values", this.state);
        if(this.state.email && this.state.password) {
            const data = Object.assign({}, this.state);
            console.log("data", data);
            
            Server
            .post('http://localhost:3000/api/login', data)
            .then(response => {
                if(response.data.auth) {
                    this.props.authLogin(response.data);
                }
            });
        }
    }
    
    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <Form method="POST" onSubmit={this.handleSubmit}>
                    <ModalHeader toggle={this.props.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="example@company.com" onChange={this.handleEmail}/>
                            <FormFeedback>You will not be able to see this</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" placeholder="********" onChange={this.handlePassword}/>
                            <FormFeedback>You will not be able to see this</FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Login</Button>
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
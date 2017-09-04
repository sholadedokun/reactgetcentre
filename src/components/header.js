import React, {Component} from 'react';
import { signoutUser} from '../actions/userActions';
import { connect } from 'react-redux'
import { Link,  } from 'react-router-dom';
import {Grid, Col, Row, Nav} from 'react-bootstrap';
import {searchForm} from "../config"
import { Field, FieldArray, reduxForm } from 'redux-form';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash'

class Header extends(Component){
    constructor(props){
        super();
        this.state={
            currentSearch:'FLIGHT',
        }
    }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){

    }
    signoutUser(){
        this.props.signoutUser()
        this.props.history.push('/')
    }
    renderLinks() {
      if (this.props.authenticated) {
        // show a link to sign out
        return [
            <li key={_.uniqueId()} className="nav-item">
          <a href="" className="nav-link" onClick={this.signoutUser.bind(this)} >Sign Out</a>
        </li>,
        <li><Link key={0} to="/userAccount/">Account</Link></li>
        ]
      } else {
        // show a link to sign in or sign up
        return [
          <li className="nav-item" key={_.uniqueId()}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={_.uniqueId()}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        ];
      }
    }
    renderInput(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        field.input.name= field.input.name.replace(' ', '')
        return(
            <span>
                <input className={classN}  type={field.type} placeholder={field.placeholder}  {...field.input} />
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    renderSearchForm(){
        console.log(searchForm);
        return(

            _.map(searchForm[this.state.currentSearch], (item, index)=>

                    <li>
                        <Field component={renderInput} type={item.type} name={item.type} placeholder={item.placeholder} />
                    </li>

            )
        )
    }

    render(){
        const { allRestaurants, title } = this.props
        return(
            <Grid fluid className="App-header">
                <Col xs={12}>
                    <div className="companyName">{title}</div>
                    <Nav>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/inventory">About</Link></li>
                            <li><Link to="/pricing">Blog</Link></li>
                            <li><Link to="/help">Contact</Link></li>
                            {this.renderLinks()}
                    </Nav>
                </Col>
                <Grid fluid  className="searchBar">
                    <Col xs={12}>
                        <ul className="searchBarTabTitle">
                            <li>Flights</li>
                            <li>Hotels</li>
                            <li>Tours</li>
                            <li>Transfer</li>
                            <li>Visa</li>
                            <li>Insurance</li>
                        </ul>
                        <ul xs={12} className="">
                            {
                                this.renderSearchForm()
                            }

                        </ul>
                    </Col>
                </Grid>
            </Grid>
        )
    }
}
//to connet to our this component's prop to our state
function mapStateToProps(state){
    return{
        authenticated:state.user.authenticated
    }
}
const mapDispatchToProps = { signoutUser}
//wrapping our connect with the component
function validate(formProps) {
    const errors = {};
    if (!formProps.name) {
        errors.name = 'Please enter your Product/service Name';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your product or service Brief';
    }
    // if (!formProps.userName) {
    //     errors.userName = 'Please enter your user Name';
    // }
    // if (!formProps.email) {
    //     errors.email = 'Please enter an email';
    // }
    //
    // if (!formProps.password) {
    //     errors.password = 'Please enter a password';
    // }
    //
    // if (!formProps.conPassword) {
    //     errors.conPassword = 'Please enter a password confirmation';
    // }
    //
    // if (formProps.password !== formProps.conPassword && formProps.conPassword) {
    //     errors.password = 'Passwords must match';
    // }

    // return errors;
}
export default reduxForm({
    validate,
    form: 'SearchBar'
})(
    connect(mapStateToProps, mapDispatchToProps)(Header)
)

import React, {Component} from 'react';
import { signoutUser} from '../actions/userActions';
import { connect } from 'react-redux'
import { Link,  } from 'react-router-dom';
import {Grid, Col, Row, Nav} from 'react-bootstrap';
import {searchForm} from "../config"
import Icon from './icon'
import { Field, FieldArray, reduxForm } from 'redux-form';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash'

class Header extends(Component){
    constructor(props){
        super();
        this.state={
            currentSearch:'FLIGHT',
            searchParameter:searchForm
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
    count(value){
        console.log(value)
        return  (_.isArray(value)) ? value.length : value
    }
    counter(item, operation){

        if(operation==='+'){
            if(_.isArray(item)){
                item.push('')
                return item;
            }
            return ++item
        }
        else{
            if(_.isArray(item)){
                item.pop();
                return item
            }
            if(item > 0)  return  --item
            return 0
        }
    }
    updateSearchParameter(superIndex, item, index, operation){
        let {searchParameter,currentSearch } = this.state;
        let newState={...searchParameter}
        console.log(newState[currentSearch][superIndex].content[index])

        newState[currentSearch][superIndex].content[index] = this.counter(newState[currentSearch][superIndex].content[index], operation)
        // console.log(newState[currentSearch][superIndex].content[index])
        // console.log(newState[currentSearch][superIndex].content[index])
        // newState[superIndex][item][index] = this.counter(newState[superIndex][item][index], operation)
        // console.log(newState)
        // valueToChange=this.counter(item, index, operation)

        this.setState({
            searchParameter:newState
        })
    }
    renderChildren(index){
        if(index=="Child"){
            _.map()
        }

    }
    renderSearchForm(){
         console.log(this.state.searchParameter);
         const {searchParameter, currentSearch} =this.state
        return(

            _.map(this.state.searchParameter[this.state.currentSearch], (item, superIndex)=>{
                return(
                    (item.type=='text')?
                        <li key={_.uniqueId()}><input type="text"  name={item.type} placeholder={item.placeholder} /></li> :
                        (superIndex=='passenger')?
                            <li key={_.uniqueId()}>
                                {_.map(item.content, (input, index)=>{
                                    return(
                                        <Col xs={6} key={_.uniqueId()}>
                                            <span class="passengerAdder" onClick={this.updateSearchParameter.bind(this, superIndex, item, index, "+")}>
                                                <Icon icon="plus" />
                                            </span>
                                            <span class="passengerAdder" onClick={this.updateSearchParameter.bind(this, superIndex, item, index, "-")}>
                                                <Icon icon="minus" />
                                            </span>
                                            {console.log(searchParameter[currentSearch][superIndex].content[index])}
                                            <input type='text' name={index}  value={this.count(searchParameter[currentSearch][superIndex].content[index])} />
                                            {
                                                index==="Child"? _.map(searchParameter[currentSearch][superIndex].content[index], (item, childIndex)=>{
                                                    return(
                                                        <input  type="text" value={item} placeholder="Input date of birth" />
                                                    )

                                                }):''

                                            }
                                        </Col>
                                    )
                                    })
                                }

                            </li>
                            :
                            ''
                    )

            }

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

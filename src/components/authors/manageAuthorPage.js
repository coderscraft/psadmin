"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var Router = require('react-router');
var toastr = require('toastr');
var AuthorAction = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var ManageAuthorPage = React.createClass({

	statics: {
		willTransitionFrom: function(transition, component) {
			if(component.state.dirty) {
				if(!confirm('Leave without saving?')) {
					transition.abort();
				}
			}
		}
	},

	componentWillMount: function() {
		var authorId = this.props.params.id;
		if(authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},


	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: ''},
			error: { firstName: '', lastName: ''},
			dirty: false
		};
	},

	setAuthorState: function(event) {
		this.state.dirty = true;
		this.setState({dirty: this.state.dirty});
		var field = event.target.name;
		var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
	},

	isAuthorValid: function() {
		var authorIsValid = true;
		if(this.state.author.firstName.length < 3) {
            this.state.error.firstName = "First Name is Invalid";
            authorIsValid = false;
		}
		if(this.state.author.lastName.length < 3) {
            this.state.error.lastName = "Last Name is Invalid";
            authorIsValid = false;
		}
		this.setState({error: this.state.error});
		return authorIsValid;

	},

	onAuthorSave: function(event) {
		event.preventDefault();
        if(this.isAuthorValid()) {
			if(this.state.author.id) {
				AuthorAction.updateAuthor(this.state.author);
			} else {
				AuthorAction.createAuthor(this.state.author);	
			}
			this.state.dirty = false;
			this.setState({dirty: this.state.dirty});
			toastr.success('Autor Saved');
			this.transitionTo('authors');
        }
	
	},

	render: function () {
		return (
			<div>
               <h1>Manage Author</h1>
               <AuthorForm author={this.state.author}
					onChange={this.setAuthorState}
					onSave={this.onAuthorSave}
					error={this.state.error}/>
			</div>
		); 
	}
});

module.exports = ManageAuthorPage;
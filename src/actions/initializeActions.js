"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {

	initApp: function() {
		console.log("Initializing app");
		var authors = AuthorApi.getAllAuthors();
		console.log(authors);

		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: authors	
			} 
		});
	}

};

module.exports = InitializeActions;
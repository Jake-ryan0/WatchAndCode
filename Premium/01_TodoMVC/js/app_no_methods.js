/*global jQuery, Handlebars, Router */
jQuery(function($) {
	'use strict';
  
	Handlebars.registerHelper('eq', function (a, b, options) {
    console.log(this);
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var App = {
		todos: null,
		filter: null,
		todoTemplate: null,
		footerTemplate: null
	};


	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;


	function initializeApp() {
		App.todos = store('todos-jquery');
		App.todoTemplate = Handlebars.compile($('#todo-template').html());
		App.footerTemplate = Handlebars.compile($('#footer-template').html());
		bindEvents();

		new Router({
			'/:filter': function(filter) {
				App.filter = filter;
				render();
			} // no need to bind because there is no "this" involved.
		}).init('/all');
	}


	function bindEvents() {
		$('#new-todo').on('keyup', create);
		$('#toggle-all').on('change', toggleAll);
		$('#footer').on('click', '#clear-completed', destroyCompleted);
		$('#todo-list')
			.on('change', '.toggle', toggleTodo)
			.on('dblclick', 'label', enterEditingMode)
			.on('keyup', '.edit', editKeyup)
			.on('focusout', '.edit', update)
			.on('click', '.destroy', destroyTodo);
	}

	function render() {
		var todos = getFilteredTodos();
		$('#todo-list').html(App.todoTemplate(todos));
		$('#main').toggle(todos.length > 0);
		$('#toggle-all').prop('checked', getActiveTodos().length === 0);
		renderFooter();
		$('#new-todo').focus();
		store('todos-jquery', App.todos);
	}

	function renderFooter() {
		var todoCount = App.todos.length;
		var activeTodoCount = getActiveTodos().length;
		var template = App.footerTemplate({
			activeTodoCount: activeTodoCount,
			activeTodoWord: pluralize(activeTodoCount, 'item'),
			completedTodos: todoCount - activeTodoCount,
			filter: App.filter
		});

		$('#footer').toggle(todoCount > 0).html(template);
	}



	function create(e) {
		var $input = $(e.target);
		var val = $input.val().trim();

		if (e.which !== ENTER_KEY || !val) {
			return;
		}

		App.todos.push({
			id: uuid(),
			title: val,
			completed: false
		});

		$input.val('');

		render();
	}


	function getActiveTodos() {
		return App.todos.filter(function(todo) {
			return !todo.completed;
		});
	}

	function getCompletedTodos() {
		return App.todos.filter(todoObject => todoObject.completed);
	}

	function getFilteredTodos() {
		if (App.filter === 'active') {
			return getActiveTodos();
		}

		if (App.filter === 'completed') {
			return getCompletedTodos();
		}

		return App.todos;
	}


	function enterEditingMode(e) {
		var $input = $(e.target).closest('li').addClass('editing').find('.edit');
		$input.focus();
	}

	function editKeyup(e) {
		if (e.which === ENTER_KEY) {
			e.target.blur();
		}

		if (e.which === ESCAPE_KEY) {
			$(e.target).data('abort', true).blur();
		}
	}

	function update(e) {
		var el = e.target;
		var $el = $(el);
		var val = $el.val().trim();

		if (!val) {
			destroyTodo(e);
			return;
		}

		if ($el.data('abort')) {
			$el.data('abort', false);
		} else {
			App.todos[indexFromEl(el)].title = val;
		}
    render();
	}


	function toggleTodo(e) {
		var i = indexFromEl(e.target);
		App.todos[i].completed = !App.todos[i].completed;
		render();
	}

	function toggleAll(e) {
		var isChecked = $(e.target).prop('checked');

		App.todos.forEach(function(todo) {
			todo.completed = isChecked;
		});

		render();
	}

	function destroyCompleted() {
		App.todos = getActiveTodos();
		App.filter = 'all';
		render();
	}


	function destroyTodo(event) {
		App.todos.splice(indexFromEl(event.target), 1);
		render();
	}

	function indexFromEl(el) {
		var id = $(el).closest('li').data('id');
		var i = App.todos.length;

		while (i--) {
			if (App.todos[i].id === id) {
				return i;
			}
		}
	}

	function store(namespace, data) {
		if (arguments.length > 1) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}
	}



	function uuid() {
		/*jshint bitwise:false */
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
		}

		return uuid;
	}

	function pluralize(count, word) {
		return count === 1 ? word : word + 's';
	}

	initializeApp();
});
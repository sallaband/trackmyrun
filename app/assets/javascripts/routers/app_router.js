TrakMyRun.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.rootEl;
		console.log(this.$rootEl);
		Backbone.history.start();
	},

	routes: {
		"" : "currentUserShow",
		"posts/new":"newPost",
		"users/:id" : "userShow",
		"users/:id/edit": "editUser"
	},

	userShow: function(id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserShow({
			model: user
		});
		this.swapView(view);
	},

	editUser: function(id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserEdit({
			model: user
		});
		this.swapView(view);
	},

	currentUserShow: function() {
		var id = TrakMyRun.CurrentUser;
		var url ="/users/"+id;
		Backbone.history.navigate(url, { trigger: true });
	},

	newPost: function() {
		var user = TrakMyRun.Collections.users.getOrFetch(TrakMyRun.CurrentUser);
		var view = new TrakMyRun.Views.NewPost({
			model: user
		});
		this.swapView(view);
		view.setSliders();
	},

	swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		} 

		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	}	
	
});

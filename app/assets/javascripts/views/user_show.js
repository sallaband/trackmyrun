TrakMyRun.Views.UserShow = Backbone.CompositeView.extend({
	template: JST["users/show"],
	editTemplate: JST["users/basic_edit"],
	locationEditTemplate: JST["users/location_edit"],
	passwordEditTemplate: JST["users/password_edit"],
	photoChangeTemplate: JST["users/photo_edit"],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.posts(), "destroy", this.render)
	},

	render: function()  {
		var view = this;
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.model.posts().each(function(post) {
			var subview = new TrakMyRun.Views.PostShow({
				model: post
			});
			view.addSubview('.posts-container', subview);
		});
		return this;
	},

	events: {
		"click .changePhoto": "showPhotoEdit",
		"click .changePassword" : "showPasswordChange",
		"click .changeAddress" : "showAddressChange",
		"click .updateInfo": "showChangeInfo",
		"click #home": "goHome",
		"click .changePhoto": "displayPhotoForm",
		"submit #personal-stat-form": "updateUser",
		"click .carrot-animation": "animateCarrot",
		"keydown .search": "handleSearch",
		"blur .search": "hideSearch",
		"click .close": "goHome"
	},

	hideSearch: function () {
		$(".search-results").slideUp();
	},

	handleSearch: function(event) {
		var loading = $('<div class="loading"></div>');
		$(".search-results").slideDown();
		var text = $(event.currentTarget).val();
		console.log(TrakMyRun.Collections.users.get(41));
	},

	displayPhotoForm: function () {
		$('#filepicker-form').removeClass('hidden');
		$('#filepicker-form').slideDown('slow');
	},
	goHome: function() {
		this.render();
	},
	showChangeInfo: function () {
		var content = this.editTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	},

	createNewPassword: function (ev) {
		ev.preventDefault();
		var form_data = $('form').serializeJSON();
		this.model.save(form_data, {
			success: function(a,b) {
				debugger;
			}
		})
	},

	updateUser: function (ev) {
		ev.preventDefault();
		var data = $(ev.currentTarget).serializeJSON();
		this.model.save(data.user);
		TrakMyRun.Collections.users.set(this.model);
	},

	showPasswordChange: function(ev) {
		var content = this.passwordEditTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	},
	showAddressChange: function(ev) {
		var content = this.locationEditTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	}
});
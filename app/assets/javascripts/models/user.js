TrakMyRun.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	posts: function () {
		if(!this._posts) {
			this._posts = new TrakMyRun.Collections.Posts([],{ user:this });
		}
		return this._posts
	},

	maps: function () {
		if(!this._maps) {
			this._maps = new TrakMyRun.Collections.Maps([], {user:this})
		}
		return this._maps
	},

	parse: function(resp) {
		if(resp.posts) {
			this.posts().set(resp.posts, { parse: true });
			delete resp.posts;
		}
		if(resp.maps) {
			this.maps().set(resp.maps, { parse: true });
			delete resp.maps;	
		}
		return resp;
	}
});
var movie = undefined;
exports.configure = function(params) {
    movie = params;
}
exports.View=function(req,res,next){
	movie.getAllMovie(function(movie){
		console.log(movie);
		res.render('admin_movie',{movie:movie});
	})
}
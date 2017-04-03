var customer = undefined;
exports.configure = function(params) {
    customer = params;
}
exports.View=function(req,res,next){
	customer.getAllCustomer(function(data){
		res.render('admin_user',{data:data});
	})
}
exports.Insert=function(req,res,next){

	if(req.body.docreate =='create')
	{
		customer.create(req.body.fullname,req.body.email,req.body.username,req.body.password,req.body.birthday,req.body.gender,req.body.identitycard,req.body.phone,req.body.status,function(err){
			if(err){
				res.redirect('/quan-ly-khach-hang');
			}
			else{
				res.redirect('/quan-ly-khach-hang');
			}
		});
	}
	else{
		console.log(req.body.id);
		customer.update(req.body.id,req.body.fullname,req.body.email,req.body.username,req.body.password,
						req.body.birthday,req.body.gender,req.body.identitycard,req.body.phone, req.body.status, function(){
			res.redirect('/quan-ly-khach-hang');	
		});
	}
}
exports.Delete=function(req,res,next){
	customer.destroy(req.query.id, function(result){
		res.redirect('/quan-ly-khach-hang');
	});
}

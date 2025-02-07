const express=require('express');
const route=express.Router();//instead of creating new app,use router
const services=require('../services/render');
const controller=require('../controller/controller');
//Directing routes
route.get('/',services.homeRoutes);
route.get('/add-user',services.add_user);
route.get('/update-user',services.update_user);
//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
// adding input parameter for result filtering
route.get('/api/users/:name/:num',controller.findAndFilter)
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);
module.exports=route;
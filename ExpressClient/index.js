const soap = require('soap');
const express = require('express');
const app = express();

const port = 5000;
const url = "http://localhost:8081/?wsdl"; //put the wsdl url here


app.use(express.urlencoded())
app.use(express.json());

app.post("/product", (request, response) => {
    console.log('data', request.body)
    var {id , label, price} = request.body
    var data = {
        product:{
            id,label,price
        }
    }
    soap.createClient(url, (error, client) => {

        client.addProduct(data,(eror, result) => {
            response.json(["Resultat : ", result]);
            if (eror){
                console.log(eror)
            }

        });
        if (error){
            console.log(error)
        }
    });
});

app.get("/products", (request, response) => {

    soap.createClient(url, (error, client) => {
        client.getProducts(null,(eror, result) => {
            response.json(["Resultat : ", result]);
            if (eror){
                console.log(eror)
            }

        });
        if (error){
            console.log(error)
        }
    });
});

app.get("/deleteall", (request, response) => {
    soap.createClient(url, (error, client) => {
        client.deleteAllProducts(null,(eror, result) => {
            response.json(["Resultat : ", result]);
            if (eror){
                console.log(eror)
            }

        });
        if (error){
            console.log(error)
        }
    });
});

app.get("/product/:id", (request, response) => {
    var params = request.params.id
    console.log('params',params)
    soap.createClient(url, (error, client) => {
        var data = {productId:params}
        client.getProduct(data,(eror, result) => {
            response.json(["Resultat : ", result]);
            if (eror){
                console.log(eror)
            }

        });
        if (error){
            console.log(error)
        }
    });
});
app.post("/update", (request, response) => {
    console.log('data', request.body)
    var {id , label, price} = request.body
    var data = {
        product:{
            id,label,price
        }
    }
    soap.createClient(url, (error, client) => {

        client.updateProduct(data,(eror, result) => {
            response.json(["Resultat : ", result]);
            if (eror){
                console.log(eror)
            }

        });
        if (error){
            console.log(error)
        }
    });
});


app.get('/',(req,res)=>{
    res.send({
        'to add product' : 'POST : /product  --> request.body should have {id , label , price}',
        'to get all products' : 'GET : /products',
        'to get a specific product' : 'GET : /product/:id',
        'to delete all products' : 'GET : /deleteall',
        'to update a product' : 'POST : /update   --> request.body should have {id , label , price}'
    })
})


app.listen(port,()=>console.log('server is running on port',port));
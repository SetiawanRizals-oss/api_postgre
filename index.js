const express = require('express')
const bodyParser=require('body-parser'); // tambahan
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'',
	database:'productcrud'
});

conn.connect((err)=>{
	if (err) throw err;
	console.log('mysql connected...');
	
	
});

//show semua

app.get('/api/product',(req,res)=>{
	let sql="SELECT * FROM product";
	let query= conn.query(sql, (err,result)=>{
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response" : result}));
    })
})



app.post('/api/products',(req,res)=>{
let data = {name: req.body.name, price: req.body.price};
	let sql ="INSERT INTO product SET?";
	let query = conn.query(sql, data,(err,result)=>{
if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response" : result}));
    })
})

//show senagian

app.get('/api/product/:id',(req,res)=>{
	let sql = "SELECT * FROM product WHERE id="+req.params.id;
	let query = conn.query(sql, (err,results)=>{
     if(err)throw err;
res.send(JSON.stringify({"status":200, "error": null, "response": results}));	 
	});
});

app.put('/api/product/:id',(req,res)=>{
	let sql= "UPDATE product SET name='"+req.body.name+"', price='"+req.body.price+"' WHERE id="+req.params.id;
	let query = conn.query(sql,(err,results)=>{
    if(err) throw err;
	res.send(JSON.stringify({"status":200, "error": null, "response": results}));	
});
});

app.delete('/api/products/:id',(req,res)=>{
let sql ="DELETE FROM product WHERE id="+req.params.id;
	let query = conn.query(sql,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"status":200, "error": null, "response": results}));	
	});
});

app.listen(8000,()=>{
	console.log('Server is running at port 8000');
});	
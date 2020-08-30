import express = require('express')
import bodyParser = require('body-parser')
const app = express()
//静的ファイル
app.use(express.static('public'));

//request bodyがmiddlewareを指定しないと空になる
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
  res.send('hello world')
})
app.listen(3333,()=> {console.log('server running !!!')})

app.get('/add',(req,res)=>{
  var param = {"値":"これはサンプルAPIです",id:Math.random()};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

app.post('/add',(req,res)=>{
  var param = {"値":"これはサンプルAPIです",id:Math.random(),"body":req.body};
  console.log(req.body)
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
})

app.get('/error',(req,res)=>{
  var param = {"値":"これはサンプルAPIです",id:Math.random()};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
})

app.post('/test',(req,res)=>{
  var param = {"値":"これはサンプルAPIです",id:Math.random(),"body":req.body};
  console.log(req)
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
})
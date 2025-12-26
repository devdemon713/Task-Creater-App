const express = require('express');
 const fs=require('fs');
const app=express();
app.set('view engine', 'ejs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', (req, res) => {
    fs.readdir('./files',function(err,files){
         console.log(files);
          res.render("index",{files:files});
    })
   
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,'utf8',function(err,data){
          res.render("show",{filedata:data,filename:req.params.filename});
    })
   
});
   
   app.get('/edit/:filename', (req, res) => {
      res.render('edit',{filename:req.params.filename});
   
});


app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
           console.log(req.body);
              res.redirect('/');
    })
     
})

app.post('/edit',(req,res)=>{
       console.log(req.body);
       fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
              res.redirect('/');
       })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}   );
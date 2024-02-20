const fs = require('fs');
const express = require('express');
const app = express();

app.listen(8000,() => {
    console.log('Servidor levantado');
});

//Express por favor usa json para el transporte de datos.
app.use(express.json());

app.get("/home",(req, res) => {
    res.send('Este es mi primera ruta');
});

app.post("/home",(req,res) => {
    console.log();

    const texto = 'Esta es una variable procesada aqui';
    const textoPlus = texto + ' otra cosa';

    res.json({
        textoPlus: textoPlus,
        msg: 'Voy a retornar el cuerpo original',
        body: req.body
    });
});

app.put("/home",(req,res) => {
    res.send('Esta es mi ruta de actualización');
});

app.delete("/home",(req,res) => {
    res.send('Esta es mi ruta de delete');
});

app.get('/productos', (req,res) => {
    //data es string
    const data = fs.readFileSync('./productos.json','utf8');
    res.json(JSON.parse(data));
});

app.get('/usuarios',(req,res) => {
    //data es JSON
    const data = JSON.parse(fs.readFileSync('usuarios.json'));
    res.json(data);
})

app.post('/productos',(req,res) => {
    const data = fs.readFileSync('./productos.json','utf8');
    const productos = JSON.parse(data);
    
    productos.push(req.body);

    fs.writeFileSync('./productos.json',JSON.stringify(productos));

    res.json({ success: true });
});

app.put('/productos/:id', (req,res) => {
    console.log(req.params);

    const { id } = req.params

    res.json({ id: id });
});
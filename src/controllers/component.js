const fs = require('fs');
const ruta = require('path');


//definición de accesos
const fileJson=ruta.join(__dirname,'../../public/data/repertorio.json');
const principal  =ruta.join(__dirname,"../../public/index.html");

//Callback para visualizar index
const home=(req,res) =>{
  console.log(principal);
    res.status(200).sendFile(principal);
};

const leerCanciones= (req,res)=>{
   const articulos = JSON.parse(fs.readFileSync(fileJson));
   res.status(200).json(articulos);

}

const insertarCancion = (req,res)=>{
    const articulo =  req.body;
    const articulos = JSON.parse(fs.readFileSync(fileJson));
    articulos.push(articulo);
    fs.writeFileSync(fileJson,JSON.stringify(articulos,null,2));
    res.status(201).send(`Canción insertada de id: ${articulo.id} de título: ${articulo.titulo} y artista: ${articulo.artista}`);
}
const BorrarCancion=(req,res)=>{
     const {id} = req.params;
     const articulo = req.body;
     const articulos = JSON.parse(fs.readFileSync(fileJson));
     const index = articulos.findIndex(p=> p.id ==id);

     if (index===-1)
     {
        res.status(404).send(`Tema con id ${id} no existe en archivo.`);
        return;
     }

     articulos.splice(index,1);
     fs.writeFileSync(fileJson, JSON.stringify(articulos));
     res.status(200).send(`Canción elminada de id: ${articulo.id} titulo: ${articulo.titulo} artista: ${articulo.artista}`);
}

const editarCancion = (req,res) => {
    const {id} = req.params;
    const articulo = req.body;
   const articulos = JSON.parse(fs.readFileSync(fileJson));

   const index = articulos.findIndex(p=> p.id ==id)
   if (index===-1)
   {
      res.status(404).send(`Tema con id ${id} no existe en archivo.`);
      return;
   }
   articulos[index]=articulo;
   fs.writeFileSync(fileJson, JSON.stringify(articulos));
   res.status(200).send(`Canción elminada de id: ${articulo.id} titulo: ${articulo.titulo} artista: ${articulo.artista}`)


} 

module.exports={home,leerCanciones,insertarCancion,BorrarCancion,editarCancion};

import express from 'express';
const app = express();

app.get('/api/hello', (req,res)=>{
   
    res.send("Yello, Express API");

});

const port =  3000;
app.listen(port,() => {
    console.log('Server is running on port ${port}')
})

export default app;
const express = require('express');
const app = express();

app.get('/api/hello', (req,res)=>{
    res.send('Hello, Express API');

});

const port = process.env.port || 3000;
app.listen(port,() => {
    console.log('Server is running on port ${port}')
})
const https = require('https');

const ENDPOINT = "https://wttr.in/madrid?0&format=j1";

let request = https.get(ENDPOINT, (res) => { 
    if (res.statusCode !== 200 ) {
        console.error("Error");
        console.log("Código de respuesta: " + res.statusCode);
        res.resume();
        return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        console.log('Datos recibidos');

        //-- Obtener la variable con la informacion
        let tiempo = JSON.parse(data);

        let lugar = tiempo.nearest_area[0].areaName[0].value;
        let temp = tiempo.current_condition[0].temp_C;
        let desc = tiempo.current_condition[0].weatherDesc[0].value;

        console.log("Lugar: " + lugar);
        console.log("Temperatura: " + temp + " Grados");
        console.log("Descripción: " + desc);

        
    });
   
});
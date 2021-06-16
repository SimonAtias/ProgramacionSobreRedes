const axios = require('axios').default;
let promesas = [];
let segundosInicio;
segundosInicio=new Date().getTime;
promesas.push(
    axios.post('http://localhost:3000/reservar/4', {"usuario": "1","butacas_reservadas": ["b4"]}).then(res => {console.log("Tardo ",new Date().getTime()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "6","butacas_reservadas": ["c2"]}).then(res => {console.log("Tardo ",new Date().getTime()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "6","butacas_reservadas": ["c3"]}).then(res => {console.log("Tardo ",new Date().getTime()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "4","butacas_reservadas": ["c4"]}).then(res => {console.log("Tardo ",new Date().getTime()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "2","butacas_reservadas": ["f1"]}).then(res => {console.log("Tardo ",new Date().getTime()-segundosInicio)})
);


Promise.all(promesas).then(res => {console.log("termine")});
const axios = require('axios').default;
let promesas = [];
let segundosInicio;
promesas.push( 
    axios.post('http://localhost:3000/reservar/4', {"usuario": "1","butacas_reservadas": ["a3"]}).then(res => {console.log("Tardo ",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "2","butacas_reservadas": ["a4"]}).then(res => {console.log("Tardo ",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "4","butacas_reservadas": ["b1"]}).then(res => {console.log("Tardo ",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "3","butacas_reservadas": ["b2"]}).then(res => {console.log("Tardo ",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/reservar/4', {"usuario": "5","butacas_reservadas": ["b3"]}).then(res => {console.log("Tardo ",new Date()-segundosInicio)})
)
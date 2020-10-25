// const moment = require("moment");

export const formatDate = (date) => new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString();

export const formatCNPJ = (cnpj) => {
    const maskedCnpj = String(cnpj)
    if (maskedCnpj === "undefined") {
        return cnpj
    }
    return maskedCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5"); 
}

export const formatCellphone = (number) => {
    const maskedPhone = String(number);
    if (maskedPhone === "undefined") {
        return number
    }
    return maskedPhone.replace(/(\d{2})(\d{5})(\d{4})/g,"($1) $2-$3"); 
}

export const calculateTime = (tempo) => {
    const arr = String(tempo).split(":");
    const segundosEmMinutos = parseFloat((parseFloat(arr[2]) / 60));
    const segundosEmMinutosEmHoras = parseFloat(segundosEmMinutos / 60);
    const minutosEmHoras = (parseFloat(arr[1]) / 60);
    const horas = segundosEmMinutosEmHoras + minutosEmHoras + parseFloat(arr[0]);
    return horas;
}

export const calculateConsumption = (time, voltage, days) => {
    const kWh = (voltage * time * days) / 1000;
    return (isNaN(kWh)) ? 0 : kWh;
}

// export const calcularTempo = (dateStart, dateEnd) => {
//     const ms = moment(dateEnd).diff(moment(dateStart));
//     const d = moment.duration(ms);
//     const s = Math.floor(d.asHours()) + moment.utc(ms).format("YYYY-MM-DDThh:mm:ss");
//     return s;
// }

// export const calcularConsumo = (tempo, potencia, dias) => {
//     const arr = String(tempo).split(":");
//     const segundosEmMinutos = parseFloat((parseFloat(arr[2]) / 60));
//     const segundosEmMinutosEmHoras = parseFloat(segundosEmMinutos / 60);
//     const minutosEmHoras = (parseFloat(arr[1]) / 60);
//     const horas = segundosEmMinutosEmHoras + minutosEmHoras + parseFloat(arr[0]);
//     const kWh = (potencia * horas * dias) / 1000;
//     return (isNaN(kWh)) ? 0 : kWh
// }

// export const calcularValorConsumo = (consumo) => {
//     const finalValue = parseFloat(consumo* 0.28551);
//     console.log(finalValue.toFixed(2));
//     return finalValue.toFixed(2);
// }


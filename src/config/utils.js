import moment from "moment";

export const formatDate = (date) => new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString();

export const calcularTempo = (dateStart, dateEnd) => {
    const ms = moment(dateEnd).diff(moment(dateStart));
    const d = moment.duration(ms);
    const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    return s;
}

export const calcularConsumo = (tempo, potencia, dias) => {
    const arr = String(tempo).split(":");
    const segundosEmMinutos = parseFloat((parseFloat(arr[2]) / 60));
    const segundosEmMinutosEmHoras = parseFloat(segundosEmMinutos / 60);
    const minutosEmHoras = (parseFloat(arr[1]) / 60);
    const horas = segundosEmMinutosEmHoras + minutosEmHoras + parseFloat(arr[0]);
    const kWh = (potencia * horas * dias) / 1000;
    return (isNaN(kWh)) ? 0 : kWh;
}

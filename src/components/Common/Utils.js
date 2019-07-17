import Numeral from 'numeral';
import Moment from 'moment';
import {floor, ceil, round} from 'lodash';
import Swal from 'sweetalert2';
const Utils = {
    customerStatus: function(param1){
        switch(param1) {
        case true:
            return 'Yes';
        default:
            return 'No';
        }
    },
    helper1: function(){
        var n1 = '5555.4444';
        var n2 = 55;
        var number = Numeral(n1).add(n2);

        // number.format();
        // // '1,000'

        // numeral.defaultFormat('0,0[.]000 $');

        return number.value();
    },
    helper3: function(param1, param2){
        return Numeral('1,000');
    }
}

export default Utils;

export const SweetAlert = (title = null, type = "success", position = "center") => {
    return Swal.fire({
        position: position,
        type: type,
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}

export const notif = (value, precision = 0) => {
    //floorNumber(3.4453) => 3
    return alert('123');
}
export const floorNumber = (value, precision = 0) => {
    //floorNumber(3.4453) => 3
    return floor(value, precision);
}

export const ceilNumber = (value, precision = 0) => {
    //ceilNumber(3.4453) => 4
    return ceil(value, precision);
}

export const roundNumber = (value, precision = 0) => {
    //roundNumber(4.006) => 4
    return round(value, precision);
}

export const phoneNumber = (value) => {
    if (value) {
        return value.replace(/^(\d{2})(\d{3})(\d{4})/, '$1-$2-$3-');
    }
}

export const uppercase = (value) => {
    if (!!value) return ('' + value).toUpperCase();
    return '';
}

export const getPrecision = (value) => {
    return Numeral(value).format(".[00000000]");
}

export const getPrecisionNoDot = (value) => {
    return Numeral(value).format(".[00000000]").replace('.', '');
}

export const naturalPartOfNumber = (value) => {
    return Math.floor(value);
}

export const to2Precision = (value) => {
    return Numeral(value).format("0.00");
}

export const changedPercent = (value) => {
    return Numeral(value).format("0.00") + "%";
}

export const percentWithOneDecimal = (value) => {
    return Numeral(value).format("0.0") + "%";
}

export const toMillions = (value) => {
    return Numeral(value/1000000).format("0,0");
}

export const currentDateFormat = () => {
    return Moment().format('YYYY-MM-DD HH:mm:ss');
}

export const dateTimeFormat = (date) => {
    return Moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY.MM.DD HH:mm:ss');
}

export const dateFormat = (date) => {
    return Moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY.MM.DD');
}

export const timeFormat = (date) => {
    return Moment(date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
}

export const millisecondsDateTime = (timestamp) => {
    return Moment(timestamp, 'x').format('YYYY-MM-DD HH:mm:ss');
}

export const formatTimeStamp = (timestamp, format) => {
    return Moment(timestamp, 'x').format(format);
}

export const numberFormat = (value) => {
    let number = parseFloat(value);
    return Numeral(number).format("0");;
}

export const floatFormat = (value) => {
    return Numeral(value).format("0.00000000");;
}

export const addBigNumber = (number1, number2) => {
    return Numeral(floatFormat(number1)).add(floatFormat(number1)).value();
}

export const subtractBigNumber = (number1, number2) => {
    return Numeral(floatFormat(number1)).subtract(floatFormat(number1)).value();
}

export const multiplyBigNumber = (number1, number2) => {
    if (!number1 || !number2) return "0";
    return Numeral(floatFormat(number1)).multiply(floatFormat(number2)).value();
}

export const divideBigNumber = (number1, number2) => {
    if (!number1 || !number2 || numberFormat(number2) === "0") return "0";
    return Numeral(floatFormat(number1)).divide(floatFormat(number2)).format("0.00000000");
}

// import {func1,func2,func3} from 'path_to_fileA';
// func1(data);
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


export function calculateShipmentProgress(ct, ot, dt){
    return (ct.diff(ot) / dt.diff(ot)) * 100 ;
}

export function getShipmentStatus(p){
    if(p > 0 && p < 49)
        return 'Preparing'
    else if (p >=50 && p < 100)
        return "Shipped"
    else
        return "Delivered"
}
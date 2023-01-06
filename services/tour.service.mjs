import {pool} from "./postgres.service.mjs";
import {SqlError} from "../models/errors/sql-error.mjs";
import {TourDelivery} from "../models/tour-delivery.mjs";


const getCurrentTourByDelivery = (uuidDelivery) => {
    const request = {
        text: `select tor_id as id, tor_date as date
               from tour tor
                        join delivery_person dp on tor.dlp_id = dp.dlp_id and dp.dlp_uuid = $1
               where tor_date = cast(now() as date)`,
        values: [uuidDelivery],
    }
    return new Promise((resolve, reject) => {
        pool.query(request, (error, result) => {
            if (error) {
                reject(new SqlError("Une erreur SQL est survenue lors de la recherche des livraisons de la tournée", error));
                return;
            }

            let tour = null;
            if (result.rows != null && result.rows.length === 1) {
                tour = Object.assign(new TourDelivery(), result.rows[0]);
            }
            resolve(tour)
        });
    })
}

export default {getCurrentTourByDelivery}

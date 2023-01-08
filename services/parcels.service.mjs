import {pool} from "./postgres.service.mjs";
import {SqlError} from "../models/errors/sql-error.mjs";
import {Parcel} from "../models/parcel.mjs";


const getParcelsByTour = (idTour) => {
    const request = {
        text: `select par_uuid                as uuid,
                      par_address_street      as addressStreet,
                      par_address_town        as town,
                      par_zip_code            as zipCode,
                      par_country             as country,
                      par_is_delivered        as isDelivered,
                      par_date_delivered      as dateDelivered,
                      par_url_proof_delivered as urlProofDelivered
               from parcel
               where tor_id = $1`,
        values: [idTour],
    }
    return new Promise((resolve, reject) => {
        pool.query(request, (error, result) => {
            if (error) {
                reject(new SqlError("Une erreur SQL est survenue lors de la recherche de la tournée du livreur", error));
                return;
            }

            let parcels = [];
            if (result.rows != null) {
                result.rows.forEach(e => parcels.push(Object.assign(new Parcel(), e)));
            }
            resolve(parcels)
        });
    })
}

export default {getParcelsByTour}

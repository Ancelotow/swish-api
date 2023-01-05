import {pool} from "./postgres.service.mjs";
import {DeliveryPerson} from "../models/delivery-person.mjs";
import {SqlError} from "../models/errors/sql-error.mjs";


const getByLogins = (login, password) => {
    const request = {
        text: 'select dlp_uuid as uuid, dlp_name as name, dlp_firstname as firstname, dlp_email as email, dlp_birthday as birthday, dlp_url_photo as urlPhoto from delivery_person where dlp_login = $1 and dlp_password = sha256($2)',
        values: [login, password],
    }
    return new Promise((resolve, reject) => {
        pool.query(request, (error, result) => {
            if (error) {
                reject(new SqlError("Une erreur SQL est survenue lors de la recherche du compte livreur", error));
                return;
            }

            let deliveryPerson = null;
            if (result.rows != null && result.rows.length === 1) {
                deliveryPerson = Object.assign(new DeliveryPerson(), result.rows[0]);
            }
            resolve(deliveryPerson)
        });
    })
}

export default {getByLogins}

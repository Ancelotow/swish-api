import {BadRequestError} from "../models/errors/bad-request-error.mjs";
import tourService from "../services/tour.service.mjs";
import parcelsService from "../services/parcels.service.mjs";

const getCurrentTourByDeliveryPerson = async (uuidDeliveryPerson) => {
    let tour = await tourService.getCurrentTourByDelivery(uuidDeliveryPerson);
    if(tour === null) {
        return tour;
    }
    tour.parcels = await parcelsService.getParcelsByTour(tour.id);
    return tour;
}


export default {getCurrentTourByDeliveryPerson}

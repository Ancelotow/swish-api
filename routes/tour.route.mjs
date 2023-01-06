import express from "express"
import {routerLogin} from "./login.route.mjs";
import tourController from "../controllers/tour.controller.mjs";

const routerTour = express.Router()

routerLogin.get("/current-delivery-tour", async (req, res) => {
    /*
    #swagger.tags = ['Tour']
    #swagger.security = [{ "Bearer": [] }]
    #swagger.description = 'Récupération de la tournée de livraison du livreur connecté.'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Tour" },
        description: 'La tournée de livraison avec la liste des livraisons à effectuées'
    }
    */

    let statusCode = 200
    let data = null
    try {
        data = await tourController.getCurrentTourByDeliveryPerson(req.data.uuid);
    } catch (e) {
        data = e.message;
        statusCode = 500;
    } finally {
        res.status(statusCode).send(data)
    }
});

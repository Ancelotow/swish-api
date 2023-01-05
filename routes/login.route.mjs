import express from "express"
import loginController from "../controllers/login.controller.mjs";
import {BadRequestError} from "../models/errors/bad-request-error.mjs";

const routerLogin = express.Router()

routerLogin.post("/login", async (req, res) => {
    /*
    swagger.tags = ['Authentification']
    #swagger.description = 'Connexion à un compte livreur.'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.parameters['person'] = {
        in: 'body',
        description: 'Les informations de connection',
        schema: {$ref: '#/definitions/ConnectionInfo'}
    }
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/ConnectionSession" },
        description: 'Les informations concernant la session de connection'
    }
    */

    let statusCode = 200
    let data = null
    try {
        data = await loginController.getConnection(req.body.login, req.body.password);
    } catch (e) {
        data = e.message;
        if (e instanceof BadRequestError) {
            statusCode = 400;
        } else {
            statusCode = 500;
        }
    } finally {
        res.status(statusCode).send(data)
    }
});

export {routerLogin}

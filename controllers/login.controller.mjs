import deliveryPersonService from "../services/delivery-person.service.mjs"
import jwt from "jsonwebtoken";
import {Connection} from "../models/connection.mjs";
import {BadRequestError} from "../models/errors/bad-request-error.mjs";

const getConnection = async (login, password) => {
    let deliveryPerson = await deliveryPersonService.getByLogins(login, password);
    if(deliveryPerson === null) {
        throw new BadRequestError("L'identifiant et/ou le mot de passe sont incorrects");
    }
    let connectionInfo = new Connection();
    connectionInfo.deliveryPerson = deliveryPerson;
    connectionInfo.token = GenerateToken(login, deliveryPerson.uuid)
    return connectionInfo
}

const GenerateToken = (login, uuid) => {
    try{
        return jwt.sign({login: login, uuid: uuid}, process.env.TOKEN, { expiresIn: "2h" })
    } catch(e) {
        throw e
    }
}

export default {getConnection}

import deliveryPersonService from "../services/delevery-person.service.mjs"
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
    connectionInfo.token = GenerateToken(login)
    return connectionInfo
}

const GenerateToken = (login) => {
    if(!login) {
        return null
    }
    try{
        return jwt.sign({login: login}, process.env.TOKEN, { expiresIn: "2h" })
    } catch(e) {
        console.log(e)
        throw e
    }
}

export default {getConnection}

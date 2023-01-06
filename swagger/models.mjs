export default {

    DeliveryPerson: {
        uuid: "00000000-0000-0000-0000-000000000000",
        name: "string",
        firstname: "string",
        email: "string",
        birthday: "2000-01-01",
        urlPhoto: "string"
    },

    ConnectionSession: {
        token: "string",
        deliveryPerson: {
            uuid: "00000000-0000-0000-0000-000000000000",
            name: "string",
            firstname: "string",
            email: "string",
            birthday: "2000-01-01",
            urlPhoto: "string"
        }
    },

    ConnectionInfo: {
        login: "string",
        password: "string"
    },

    Tour: {
        id: "0",
        date: "2000-01-01",
        parcels: [{
            uuid: "00000000-0000-0000-0000-000000000000",
            addressStreet: "string",
            town: "string",
            zipCode: "string",
            country: "string",
            isDelivered: true,
            dateDelivered: "2000-01-01",
            urlProofDelivered: "string"
        }]
    }

}

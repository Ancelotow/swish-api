class SqlError extends Error {
    error

    constructor(message, error) {
        super(message);
        this.error = error;
    }
}

export {SqlError}

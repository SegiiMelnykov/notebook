class ApiError extends Error {
    constructor(public status: number, public message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static forbidden(message: string) {
        return new ApiError(403, message);
    }

    static badRequest(message: string) {
        console.log(new ApiError(404, message))
        return new ApiError(404, message);
    }

    static internal(message: string) {
        return new ApiError(500, message);
    }


}

export default ApiError;
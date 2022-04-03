

export class HTTPError extends Error {
    constructor(
        private _statusCode: number,
        message: string,
        private _context?: string) {
            super(message)
        }

    get statusCode() {return this._statusCode}
    get context() {return this._context}
}
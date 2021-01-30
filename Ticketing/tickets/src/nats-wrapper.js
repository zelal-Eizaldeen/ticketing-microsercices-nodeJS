"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var NatsWrapper = /** @class */ (function () {
    function NatsWrapper() {
    }
    Object.defineProperty(NatsWrapper.prototype, "client", {
        get: function () {
            if (!this._client) {
                throw new Error('Cannot access NATS client before connecting');
            }
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    NatsWrapper.prototype.connect = function (clusterId, clientId, url) {
        var _this = this;
        this._client = node_nats_streaming_1.default.connect(clusterId, clientId, { url: url });
        return new Promise(function (resolve, reject) {
            _this._client.on('connect', function () {
                console.log('Connected to NATS');
                resolve();
            });
            _this._client.on('error', function (err) {
                reject(err);
            });
        });
    };
    return NatsWrapper;
}());
exports.natsWrapper = new NatsWrapper();

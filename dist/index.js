"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbxGraphqlClient = void 0;
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var core_1 = require("@apollo/client/core");
var context_1 = require("@apollo/client/link/context");
var queries_1 = require("./queries");
var types_1 = require("./types");
var stringify = require('json-stringify-safe');
// export const defaultPbxQueryContext: PbxQueryContext = {
//     args: {},
//     locale: 'en',
//     country: 'US',
//     currency: 'USD',
//     appUrl: 'http://localhost:3000'
// }
var PbxGraphqlClient = /** @class */ (function (_super) {
    __extends(PbxGraphqlClient, _super);
    function PbxGraphqlClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getGraphqlClient = function (context) {
            var self = _this;
            var httpLink = core_1.createHttpLink({ uri: _this.url, fetch: cross_fetch_1.default });
            var x = {
                'x-pbx-backend-key': self.key,
                'x-pbx-locale': context.locale,
                'x-pbx-language': context.language,
                'x-pbx-country': context.country,
                'x-pbx-currency': context.currency,
                'x-pbx-app-url': context.appUrl,
                'x-pbx-segment': context.segment
            };
            var authLink = context_1.setContext(function (_, _a) {
                var headers = _a.headers;
                return ({
                    headers: __assign(__assign({}, headers), x)
                });
            });
            var client = new core_1.ApolloClient({
                link: authLink.concat(httpLink),
                cache: new core_1.InMemoryCache()
            });
            return {
                query: function (query) {
                    return client.query({ query: query, variables: context.args });
                }
            };
        };
        _this.getProduct = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var client, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = this.getGraphqlClient(context);
                            return [4 /*yield*/, client.query(queries_1.productQuery)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data.product];
                    }
                });
            });
        };
        _this.getProducts = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var client, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = this.getGraphqlClient(context);
                            return [4 /*yield*/, client.query(queries_1.productsQuery)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data.products.results];
                    }
                });
            });
        };
        _this.getCategories = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var client, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = this.getGraphqlClient(context);
                            return [4 /*yield*/, client.query(queries_1.categoryHierarchyQuery)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data.categoryHierarchy];
                    }
                });
            });
        };
        _this.getCategory = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var client, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = this.getGraphqlClient(context);
                            return [4 /*yield*/, client.query(queries_1.categoryQuery)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data.category];
                    }
                });
            });
        };
        return _this;
    }
    return PbxGraphqlClient;
}(types_1.PbxClient));
exports.PbxGraphqlClient = PbxGraphqlClient;
__exportStar(require("./types"), exports);

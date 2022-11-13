export var Languages = {
    'en-CA': 'English',
    'fr-CA': 'French',
};
export var toIsoGmtDateString = function (date) { var _a; return (_a = date === null || date === void 0 ? void 0 : date.toISOString().substring(0, 10)) !== null && _a !== void 0 ? _a : ''; };
// Support typed object iteration.  Hack fix to address: https://effectivetypescript.com/2020/05/26/iterate-objects/
export function iterateObject(obj, iteratorFunction) {
    Object.entries(obj).forEach(function (_a) {
        var key = _a[0], val = _a[1];
        iteratorFunction(key, val, obj);
    });
}
export var getTypeMap = function (obj) {
    var typeMap = Object.keys(obj).reduce(function (typeMap, key) {
        var value = obj[key];
        if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0) {
            typeMap[key] = typeof value;
        }
        else if ((value === null || value === void 0 ? void 0 : value.constructor) === Date) {
            typeMap[key] = 'date';
        }
        else if ((value === null || value === void 0 ? void 0 : value.constructor) === File) {
            typeMap[key] = 'file';
        }
        else if (Array.isArray(value)) {
            if (value.length === 0) {
                typeMap[key] = 'array';
            }
            else
                typeMap[key] = getTypeMap(value);
        }
        else
            typeMap[key] = getTypeMap(value);
        return typeMap;
    }, {});
    return typeMap;
};
export function getUnique(items) {
    return Array.from(new Set(items));
}
export var Config = {
    DeploymentDirectory: process.env.REACT_APP_DEPLOYMENT_DIRECTORY
};
export var BYTES_PER_KILOBYTE = 1024;
export var convertBytesToKB = function (bytes) {
    return Math.round(bytes / BYTES_PER_KILOBYTE);
};

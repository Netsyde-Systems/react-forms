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

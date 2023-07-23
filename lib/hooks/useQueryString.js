import { useState, useEffect } from 'react';
export function useQueryParam(paramName, defaultParamValue) {
    var _a;
    var _b = useState(window.location.search), queryString = _b[0], setQueryString = _b[1];
    var searchParams = new URLSearchParams(queryString);
    var paramValue = ((_a = searchParams.get(paramName)) !== null && _a !== void 0 ? _a : defaultParamValue);
    var setQueryParam = function (paramValue) {
        searchParams.set(paramName, paramValue);
        document.location.search = searchParams.toString();
    };
    useEffect(function () {
        window.addEventListener('popstate', function () {
            setQueryString(window.location.search);
        });
    }, []);
    return [paramValue, setQueryParam];
}

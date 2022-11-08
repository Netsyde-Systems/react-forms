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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8
import React from 'react';
import { getInputEnvelopeClass } from './inputs';
import { ErrorMessage } from './ErrorMessage';
import './FileInput.scss';
var BYTES_PER_KILOBYTE = 1024;
var DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5 * Math.pow(BYTES_PER_KILOBYTE, 2); // 5 MB
var objectToArray = function (obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
};
function arrayToObject(arr, keySelector) {
    var dic = arr.reduce(function (obj, item) {
        var key = keySelector(item);
        obj[key] = item;
        return obj;
    }, {});
    return dic;
}
var convertBytesToKB = function (bytes) {
    return Math.round(bytes / BYTES_PER_KILOBYTE);
};
export function FileInput(props) {
    var fileInputField = React.useRef(null);
    var fileLookup = arrayToObject(props.value || [], function (file) { return file.name; });
    var className = getInputEnvelopeClass(props, 'file', 'input');
    var id = props.id, disabled = props.disabled, required = props.required, _a = props.multiple, multiple = _a === void 0 ? true : _a, _b = props.maxFileSizeInBytes, maxFileSizeInBytes = _b === void 0 ? DEFAULT_MAX_FILE_SIZE_IN_BYTES : _b;
    var handleUploadBtnClick = function () {
        var _a;
        (_a = fileInputField.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var addNewFiles = function (newFiles) {
        for (var _i = 0, newFiles_1 = newFiles; _i < newFiles_1.length; _i++) {
            var file = newFiles_1[_i];
            if (file.size < maxFileSizeInBytes) {
                if (!multiple) {
                    return { file: file };
                }
                fileLookup[file.name] = file;
            }
        }
        return __assign({}, fileLookup);
    };
    var handleFileUpdate = function (files) {
        var filesAsArray = objectToArray(files);
        props.onChange(filesAsArray);
    };
    var handleNewFileUpload = function (e) {
        var newFiles = e.target.files;
        if (newFiles.length) {
            var updatedFiles = addNewFiles(newFiles);
            handleFileUpdate(updatedFiles);
        }
    };
    var removeFile = function (fileName) {
        var newValue = Object.assign({}, fileLookup);
        delete newValue[fileName];
        handleFileUpdate(__assign({}, newValue));
    };
    return (_jsxs("div", __assign({ className: className }, { children: [_jsxs("section", __assign({ className: 'upload' }, { children: [_jsx("label", { children: props.label }), _jsx("p", { children: "Drag and drop or" }), _jsxs("button", __assign({ type: "button", onClick: handleUploadBtnClick }, { children: [_jsx("i", { className: "fas fa-file-upload" }), _jsxs("span", { children: [" Upload ", multiple ? "files" : "a file"] })] })), _jsxs("div", __assign({ className: className }, { children: [_jsx("input", __assign({ ref: fileInputField, type: 'file', title: '', value: '', onChange: handleNewFileUpload, multiple: multiple }, { id: id, disabled: disabled, required: required })), _jsx(ErrorMessage, __assign({}, props))] }))] })), _jsx("article", __assign({ className: 'preview' }, { children: _jsx("section", __assign({ className: 'file-list' }, { children: Object.keys(fileLookup).map(function (fileName, index) {
                        var file = fileLookup[fileName];
                        var isImageFile = file.type.split("/")[0] === "image";
                        return (_jsx("section", __assign({ className: 'file' }, { children: _jsxs("div", { children: [isImageFile && (_jsx("img", { src: URL.createObjectURL(file), alt: "file preview ".concat(index) })), _jsxs("div", __assign({ "data-isimagefile": isImageFile, className: 'meta-data' }, { children: [_jsx("span", __assign({ className: 'filename' }, { children: file.name })), _jsxs("aside", { children: [_jsxs("span", { children: [convertBytesToKB(file.size), " kb"] }), _jsx("i", { className: "fas fa-trash-alt", onClick: function () { return removeFile(fileName); } })] })] }))] }) }), fileName));
                    }) })) }))] })));
}
export default FileInput;

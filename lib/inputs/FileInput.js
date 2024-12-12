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
import { BYTES_PER_KILOBYTE, convertBytesToKB } from '../utilities';
import { getInputEnvelopeClass } from './inputs';
import { ErrorMessage } from './ErrorMessage';
import { InputLabel } from './InputLabel';
var DEFAULT_MAX_FILE_SIZE_IN_BYTES = 25 * Math.pow(BYTES_PER_KILOBYTE, 2); // 25 MB
var DEFAULT_EXCLUDED_FILE_EXTENSIONS = ['exe', 'bat'];
var fileLookupToArray = function (lookup) {
    return Object.keys(lookup).map(function (key) { return lookup[key]; });
};
function arrayToFileLookup(arr, keySelector) {
    var lookup = arr.reduce(function (dic, item) {
        var key = keySelector(item);
        dic[key] = item;
        return dic;
    }, {});
    return lookup;
}
// Note: File Input does not support standard controlProps like the other inputs do (at this time)
export function FileInput(props) {
    var _a, _b, _c;
    var fileInputField = React.useRef(null);
    var fileLookup = arrayToFileLookup(props.value || [], function (file) { return file.name; });
    var className = getInputEnvelopeClass(props, 'file', 'input');
    var id = props.id, disabled = props.disabled, readOnly = props.readOnly, required = props.required, multiple = props.multiple, showFileList = props.showFileList, placeholder = props.placeholder, maxFileSizeInBytes = props.maxFileSizeInBytes, maxTotalFileSizeInBytes = props.maxTotalFileSizeInBytes, excludedFileExtensions = props.excludedFileExtensions, acceptedFileExtensions = props.acceptedFileExtensions;
    var filledMaxFileSizeInBytes = Object.assign({}, maxFileSizeInBytes, { criteria: (_a = maxFileSizeInBytes === null || maxFileSizeInBytes === void 0 ? void 0 : maxFileSizeInBytes.criteria) !== null && _a !== void 0 ? _a : DEFAULT_MAX_FILE_SIZE_IN_BYTES });
    var filledMaxTotalFileSizeInBytes = Object.assign({}, maxTotalFileSizeInBytes, { criteria: (_b = maxTotalFileSizeInBytes === null || maxTotalFileSizeInBytes === void 0 ? void 0 : maxTotalFileSizeInBytes.criteria) !== null && _b !== void 0 ? _b : DEFAULT_MAX_FILE_SIZE_IN_BYTES });
    var filledExcludedFileExtensions = Object.assign({}, excludedFileExtensions, { criteria: (_c = excludedFileExtensions === null || excludedFileExtensions === void 0 ? void 0 : excludedFileExtensions.criteria) !== null && _c !== void 0 ? _c : DEFAULT_EXCLUDED_FILE_EXTENSIONS });
    var handleUploadBtnClick = function () {
        var _a;
        (_a = fileInputField.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var addNewFiles = function (newFiles) {
        var _a, _b, _c, _d, _e;
        var totalFileSize = fileLookupToArray(fileLookup).reduce(function (acc, file) { return acc + file.size; }, 0);
        var _loop_1 = function (file) {
            if (file.size > filledMaxFileSizeInBytes.criteria) {
                (_a = filledMaxFileSizeInBytes.onRejected) === null || _a === void 0 ? void 0 : _a.call(filledMaxFileSizeInBytes, file);
                return "continue";
            }
            if (totalFileSize + file.size > filledMaxTotalFileSizeInBytes.criteria) {
                (_b = filledMaxTotalFileSizeInBytes.onRejected) === null || _b === void 0 ? void 0 : _b.call(filledMaxTotalFileSizeInBytes, file);
                return "continue";
            }
            if (filledExcludedFileExtensions.criteria.some(function (ext) { return file.name.toLowerCase().endsWith(ext); })) {
                (_c = filledExcludedFileExtensions.onRejected) === null || _c === void 0 ? void 0 : _c.call(filledExcludedFileExtensions, file);
                return "continue";
            }
            if (((_d = acceptedFileExtensions === null || acceptedFileExtensions === void 0 ? void 0 : acceptedFileExtensions.criteria) === null || _d === void 0 ? void 0 : _d.length) && !acceptedFileExtensions.criteria.some(function (ext) { return file.name.toLowerCase().endsWith(ext); })) {
                (_e = acceptedFileExtensions.onRejected) === null || _e === void 0 ? void 0 : _e.call(acceptedFileExtensions, file);
                return "continue";
            }
            if (!multiple) {
                return { value: { file: file } };
            }
            fileLookup[file.name] = file;
        };
        for (var _i = 0, newFiles_1 = newFiles; _i < newFiles_1.length; _i++) {
            var file = newFiles_1[_i];
            var state_1 = _loop_1(file);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return __assign({}, fileLookup);
    };
    var handleFileUpdate = function (files) {
        var filesAsArray = fileLookupToArray(files);
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
    var uploadClassName = getInputEnvelopeClass(props, 'upload');
    var uploadSection = readOnly ? null : (_jsxs("section", __assign({ className: uploadClassName }, { children: [_jsxs("button", __assign({ type: "button", onClick: handleUploadBtnClick, disabled: disabled || readOnly }, { children: [_jsx("i", { className: "folder" }), _jsx("span", { children: placeholder !== null && placeholder !== void 0 ? placeholder : '🡅' })] })), _jsx("div", __assign({ className: className }, { children: _jsx("input", __assign({ ref: fileInputField, type: 'file', title: '', value: '', onChange: handleNewFileUpload, multiple: multiple }, { id: id, disabled: disabled, readOnly: readOnly, required: required })) }))] })));
    var fileList = !showFileList ? null : (_jsx("article", __assign({ className: 'preview' }, { children: _jsx("section", __assign({ className: 'file-list' }, { children: Object.keys(fileLookup).map(function (fileName, index) {
                var file = fileLookup[fileName];
                var isImageFile = file.type.split("/")[0] === "image";
                var deleteIcon = disabled || readOnly ? null :
                    _jsx("i", { className: "trash", onClick: function () { return removeFile(fileName); } });
                return (_jsx("section", __assign({ className: 'file' }, { children: _jsxs("div", { children: [isImageFile && (_jsx("img", { src: URL.createObjectURL(file), alt: "file preview ".concat(index) })), _jsxs("div", __assign({ "data-isimagefile": isImageFile, className: 'meta-data' }, { children: [_jsx("span", __assign({ className: 'filename' }, { children: file.name })), _jsxs("aside", { children: [_jsxs("span", { children: [convertBytesToKB(file.size), " kB"] }), deleteIcon] })] }))] }) }), fileName));
            }) })) })));
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), uploadSection, fileList, _jsx(ErrorMessage, __assign({}, props))] })));
}
export default FileInput;

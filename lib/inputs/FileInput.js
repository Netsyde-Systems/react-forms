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
// Note: File Input does not support standard controlProps like the other inputs do (at this time)
export function FileInput(props) {
    var fileInputField = React.useRef(null);
    var fileLookup = arrayToObject(props.value || [], function (file) { return file.name; });
    var className = getInputEnvelopeClass(props, 'file', 'input');
    var id = props.id, disabled = props.disabled, readOnly = props.readOnly, required = props.required, multiple = props.multiple, showFileList = props.showFileList, _a = props.maxFileSizeInBytes, maxFileSizeInBytes = _a === void 0 ? DEFAULT_MAX_FILE_SIZE_IN_BYTES : _a, placeholder = props.placeholder;
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

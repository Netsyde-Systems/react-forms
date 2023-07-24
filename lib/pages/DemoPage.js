import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
import Controls from './Controls';
import Forms from './Forms';
import Validation from './Validation';
import Localization from './Localization';
import SubForms from './SubForms';
import { assertNever } from "../utilities";
export var DemoPageButton = function (_a) {
    var page = _a.page, selectedPage = _a.selectedPage, setPage = _a.setPage;
    var className = classNames('page-button', { active: page === selectedPage });
    return _jsx("button", { className: className, onClick: function () { return setPage(page); }, children: page });
};
export var DemoPage = function (_a) {
    var pageType = _a.pageType;
    var demoPage = null;
    switch (pageType) {
        case 'controls':
            demoPage = _jsx(Controls, {});
            break;
        case 'forms':
            demoPage = _jsx(Forms, {});
            break;
        case 'validation':
            demoPage = _jsx(Validation, {});
            break;
        case 'localization':
            demoPage = _jsx(Localization, {});
            break;
        case 'subforms':
            demoPage = _jsx(SubForms, {});
            break;
        default:
            assertNever(pageType);
    }
    return demoPage;
};

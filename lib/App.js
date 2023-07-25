import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQueryParam } from './hooks/useQueryString';
import { DemoPageButton, DemoPage } from './pages/DemoPage';
import Header from './header/Header';
import './App.scss';
import './styles/react-forms.scss';
function App() {
    var _a = useQueryParam('page', 'controls'), demoPageType = _a[0], setDemoPageType = _a[1];
    return (_jsxs("div", { className: "app", children: [_jsx(Header, {}), _jsxs("nav", { children: [_jsx(DemoPageButton, { page: 'controls', selectedPage: demoPageType, setPage: setDemoPageType }), _jsx(DemoPageButton, { page: 'forms', selectedPage: demoPageType, setPage: setDemoPageType }), _jsx(DemoPageButton, { page: 'validation', selectedPage: demoPageType, setPage: setDemoPageType }), _jsx(DemoPageButton, { page: 'localization', selectedPage: demoPageType, setPage: setDemoPageType }), _jsx(DemoPageButton, { page: 'subforms', selectedPage: demoPageType, setPage: setDemoPageType })] }), _jsx(DemoPage, { pageType: demoPageType })] }));
}
export default App;

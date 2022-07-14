import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import App from './App';
it('renders page name', function () {
    render(_jsx(App, {}));
    var pageNameElement = screen.getByText(/^Test Page$/i);
    expect(pageNameElement).toBeInTheDocument();
});

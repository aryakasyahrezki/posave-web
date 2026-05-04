/* prettier-ignore */
import {
createInertiaApp

} from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            import.meta.glob('./features/**/pages/**/*.tsx', {
                eager: true,
            });
            const [feature, ...rest] = name.split('/');
            const pageName = rest.join('/');
            return pages[`./features/${feature}/pages/${pageName}.tsx`];
        },
        // prettier-ignore
        setup: ({ App, props }) => <App {...props} />,
    }),
);

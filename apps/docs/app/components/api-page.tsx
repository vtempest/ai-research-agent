import { openapi } from '@/lib/openapi';
import { createAPIPage } from 'fumadocs-openapi/ui';

export const APIPage = createAPIPage(openapi, {
    generateCodeSamples(endpoint) {
        return [
            {
                id: 'js',
                lang: 'js',
                label: 'JavaScript SDK',
                source: "console.log('hello')",
            },
            // or to disable the default code samples
            // set `source: false`
            {
                id: 'curl',
                lang: 'bash',
                source: false,
            },
        ];
    },
});
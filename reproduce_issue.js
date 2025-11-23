
import { parseHTML } from 'linkedom';

function test(html) {
    console.log(`Testing HTML: "${html}"`);
    try {
        const { document } = parseHTML(html);
        console.log('document:', !!document);
        if (document) {
            console.log('document.documentElement:', !!document.documentElement);
            console.log('document.title:', document.title);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
    console.log('---');
}

test('');
test('   ');
test('<div></div>');
test('<html></html>');

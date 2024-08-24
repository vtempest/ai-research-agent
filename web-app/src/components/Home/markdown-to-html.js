
export function convertMarkdownToHtml(markdown) {
    // Helper function to escape HTML special characters
    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Convert headers
    markdown = markdown.replace(/^(#{1,6})\s(.+)$/gm, (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
    });

    // Convert bold text
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Convert italic text
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Convert unordered lists
    markdown = markdown.replace(/^\s*\*\s(.+)$/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Convert ordered lists
    markdown = markdown.replace(/^\s*\d+\.\s(.+)$/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

    // Convert paragraphs
    markdown = markdown.split('\n\n').map(para => {
        if (!para.startsWith('<')) {
            return `<p>${para.trim()}</p>`;
        }
        return para;
    }).join('\n');

    return markdown;
}
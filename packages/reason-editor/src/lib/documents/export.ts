// Document export utilities stub
// In a full app context, replace with actual export implementations

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportAsMarkdown(title: string, htmlContent: string): Promise<void> {
  // Simple HTML to markdown conversion
  const markdown = htmlContent
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<li><p>(.*?)<\/p><\/li>/gi, '- $1\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  const fullMarkdown = `# ${title}\n\n${markdown}`;
  downloadFile(fullMarkdown, `${title}.md`, 'text/markdown');
}

export async function exportAsHTML(title: string, htmlContent: string): Promise<void> {
  const fullHTML = `<!DOCTYPE html>\n<html>\n<head><title>${title}</title></head>\n<body>\n${htmlContent}\n</body>\n</html>`;
  downloadFile(fullHTML, `${title}.html`, 'text/html');
}

export async function exportAsText(title: string, htmlContent: string): Promise<void> {
  const text = htmlContent.replace(/<[^>]+>/g, '').trim();
  downloadFile(text, `${title}.txt`, 'text/plain');
}

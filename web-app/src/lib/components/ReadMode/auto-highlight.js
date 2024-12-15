export function toggleHighlight(color = 'yellow') {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    if (selectedText.length === 0) return;

    const isWithinHighlight = checkWithinHighlight(range);

    if (isWithinHighlight) {
        removeHighlight(range);
    } else {
        const isHighlighted = checkHighlighted(range);
        if (isHighlighted) {
            removeHighlight(range);
        } else {
            applyHighlight(range, color);
        }
    }

    selection.removeAllRanges();
}

function checkWithinHighlight(range) {
    let node = range.commonAncestorContainer;
    while (node && node !== document.body) {
        if (node.nodeType === Node.ELEMENT_NODE &&
            node.tagName === 'SPAN' &&
            node.style.backgroundColor) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function applyHighlight(range, color) {
    const iterator = document.createNodeIterator(
        range.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        (node) => range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    );

    const nodesToWrap = [];
    let node;
    while ((node = iterator.nextNode())) {
        nodesToWrap.push(node);
    }

    nodesToWrap.forEach((node) => {
        const nodeRange = document.createRange();
        nodeRange.selectNodeContents(node);

        const intersectionRange = rangeIntersection(range, nodeRange);
        if (intersectionRange) {
            wrapRangeWithSpan(intersectionRange, color);
        }
    });

    mergeAdjacentHighlights(range.commonAncestorContainer);
}

function wrapRangeWithSpan(range, color) {
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    range.surroundContents(span);
}

function rangeIntersection(range1, range2) {
    const start = range1.compareBoundaryPoints(Range.START_TO_START, range2) < 0
        ? range2.startContainer
        : range1.startContainer;
    const startOffset = range1.compareBoundaryPoints(Range.START_TO_START, range2) < 0
        ? range2.startOffset
        : range1.startOffset;
    const end = range1.compareBoundaryPoints(Range.END_TO_END, range2) > 0
        ? range2.endContainer
        : range1.endContainer;
    const endOffset = range1.compareBoundaryPoints(Range.END_TO_END, range2) > 0
        ? range2.endOffset
        : range1.endOffset;

    const intersectionRange = document.createRange();
    intersectionRange.setStart(start, startOffset);
    intersectionRange.setEnd(end, endOffset);

    return intersectionRange;
}

function removeHighlight(range) {
    const highlightedSpans = getHighlightedSpansInRange(range);
    
    highlightedSpans.forEach(span => {
        removeHighlightFromSpan(span);
    });
}

function removeHighlightFromSpan(span) {
    const parent = span.parentNode;
    while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
}

function getHighlightedSpansInRange(range) {
    const spans = [];
    const iterator = document.createNodeIterator(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        { acceptNode: node => node.tagName === 'SPAN' && node.style.backgroundColor ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
    );

    let node;
    while (node = iterator.nextNode()) {
        if (range.intersectsNode(node)) {
            spans.push(node);
        }
    }

    return spans;
}

function checkHighlighted(range) {
    const highlightedSpans = getHighlightedSpansInRange(range);
    return highlightedSpans.length > 0;
}

function mergeAdjacentHighlights(container) {
    const highlights = container.querySelectorAll('span[style*="background-color"]');
    for (let i = 0; i < highlights.length; i++) {
        const current = highlights[i];
        const next = current.nextElementSibling;

        if (next && next.tagName === 'SPAN' && next.style.backgroundColor === current.style.backgroundColor) {
            while (next.firstChild) {
                current.appendChild(next.firstChild);
            }
            next.parentNode.removeChild(next);
            i--; // Recheck this index
        }
    }
}
export function getStyleNameByXml(elXmlName) {
  const predicate = ({ xmlName = null }) => elXmlName === xmlName;
  return findKey(styleMap, predicate) ?? "text";
}

export function getOutlineLvlName(outlineLvl) {
  const predicate = ({ docxStyles = null }) => outlineLvl === docxStyles?.outlineLevel;
  return findKey(styleMap, predicate) ?? "text";
}

export function getStyles() {
  return Object.keys(styleMap);
}

export function getHeadingStyles() {
  return Object.keys(styleMap).filter(
    (key) => styleMap[key].heading
  );
}

export function getDocxStyles(styles) {
  const mergedStyles = Object.keys(styles).reduce((acc, key) => {
    return {
      ...acc,
      ...styleMap[key]?.docxStyles,
    };
  }, {});
  return mergedStyles;
}

export function tokensToMarkup(textBlocks, plainTextOnly = false) {
  let dom = "";
  const state = { underline: false, strong: false, mark: false };

  textBlocks.forEach(({ format, tokens }) => {
    if (!tokens.length) return;
    const { domElement } = styleMap[format];

    if (!plainTextOnly) 
      dom += ` <${domElement}>`;
    tokens.forEach(({ text, format }) => {
      if (!text || text.trim().length < 1) return;
      let tags = "";
      for (const style in state) {
        if (state[style] !== format[style]) {
          const elName = styleMap[style]?.domElement;
          tags += format[style] ?  ` <${elName}>` : `</${elName}> `;
          state[style] = format[style];
        }
      }

      if (plainTextOnly) dom += text;
      else dom += tags + text;
    });

    if (plainTextOnly) dom += " \n";
    else dom += ` </${domElement}> `;
  });

  if (!plainTextOnly)
    for (const style in state)
      if (state[style])
        dom += `</${styleMap[style]?.domElement}> `;
  dom = dom.replace(/ \n/, " ").replace(/\s+/, " ");

  return dom;
}

export function simplifyTokens(block) {
  const simplifiedTokens = block.tokens.reduce((acc, { format, text }) => {
    if (!acc.length) return [{ format, text }];
    const prev = acc[acc.length - 1];
    const { format: prevFormat, text: prevText } = prev;
    // If same format just combine text
    isSameFormat(format, prevFormat)
      ? (prev.text = prevText + text)
      : acc.push({ text, format });
    return acc;
  }, []);
  return { format: block.format, tokens: simplifiedTokens };
}

function isSameFormat(a, b) {
  return a.mark === b.mark && a.strong === b.strong && a.underline === b.underline;
}

function findKey(object, predicate) {
  if (object == null) {
    return undefined;
  }
  const keys = Object.keys(object);
  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    const value = object[key];
    if (predicate(value, key, object)) {
      return key;
    }
  }
  return undefined;
}

export const styleMap = {
  pocket: {
    block: true,
    heading: true,
    domSelector: ["h1"],
    domElement: "h1",
    xmlName: "Heading1",
    docxStyles: {
      heading: 1,
      outlineLevel: 1,
    },
  },
  hat: {
    block: true,
    heading: true,
    domSelector: ["h2"],
    domElement: "h2",
    xmlName: "Heading2",
    docxStyles: {
      heading: 2,
      outlineLevel: 2,
    },
  },
  block: {
    block: true,
    heading: true,
    domSelector: ["h3"],
    domElement: "h3",
    xmlName: "Heading3",
    docxStyles: {
      heading: 3,
      outlineLevel: 3,
    },
  },
  tag: {
    block: true,
    heading: true,
    domSelector: ["h4"],
    domElement: "h4",
    xmlName: "Heading4",
    docxStyles: {
      heading: 4,
      outlineLevel: 4,
    },
  },
  text: {
    block: true,
    heading: false,
    domSelector: ["p"],
    domElement: "p",
  },
  underline: {
    block: false,
    heading: false,
    domSelector: ["span", "u"],
    domElement: "u",
    docxStyles: {
      underline: {},
    },
  },
  strong: {
    block: false,
    heading: false,
    domSelector: ["strong"],
    domElement: "b",
    docxStyles: {
      bold: true,
    },
  },
  mark: {
    block: false,
    heading: false,
    domSelector: ["mark"],
    domElement: "mark",
    docxStyles: {
      highlight: "cyan",
    },
  },
};
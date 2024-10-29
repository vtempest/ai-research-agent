async function fetchCurrentEventsHTML() {
    const response = await fetch('https://en.wikipedia.org/wiki/Portal:Current_events');
    const htmlString = await response.text(); // Get HTML as string
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const container = doc.querySelector('.p-current-events-headlines');
  
    if (!container) return null;
    const extractLinks = (element) => {
      return Array.from(element.querySelectorAll('a')).map(link => ({
        title: link.textContent.trim(),
        url: link.getAttribute('href')
      }));
    };
    const mainNews = Array.from(container.querySelectorAll('ul > li')).map(item => {
      const links = extractLinks(item);
      return {
        headline: item.textContent.trim(),
        relatedTopics: links
      };
    });
    const ongoingEvents = Array.from(container.querySelectorAll('.itn-footer > div:nth-child(1) .hlist.inline li')).map(item => {
      const link = item.querySelector('a');
      const subItems = Array.from(item.querySelectorAll('ul li a')).map(subLink => ({
        title: subLink.textContent.trim(),
        url: subLink.getAttribute('href')
      }));
      return {
        title: link.textContent.trim(),
        url: link.getAttribute('href'),
        subItems: subItems.length > 0 ? subItems : undefined
      };
    });
    const recentDeaths = extractLinks(container.querySelector('.itn-footer > div:nth-child(2) .hlist.inline'));
    const featuredImage = container.querySelector('.itn-img img');
    const imageInfo = featuredImage ? {
      src: featuredImage.getAttribute('src'),
      alt: featuredImage.getAttribute('alt'),
      caption: container.querySelector('.itn-img .thumbcaption').textContent.trim()
    } : null;
    return {
      mainNews,
      ongoingEvents,
      recentDeaths,
      featuredImage: imageInfo
    };
  };
  // Example usage:
    
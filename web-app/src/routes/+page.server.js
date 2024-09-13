export function load({ url }) {
    const query = url.searchParams.get('q') || '';
    const category = url.searchParams.get('c') || '';
    const time = url.searchParams.get('t') || '';
    return {
      query,
      category,
      time
    };
  }  
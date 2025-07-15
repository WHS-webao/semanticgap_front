const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL;
const TOKEN       = process.env.REACT_APP_TOKEN;

/**
 * 페이지 목록을 GraphQL로부터 가져옵니다.
 * CRA proxy를 사용 중이라면 GRAPHQL_URL 대신 "/graphql"로 바꿔도 됩니다.
 */
export async function fetchPages() {
  const resp = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:   `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        {
          pages {
            list(limit: 5000, orderBy: PATH) {
              path
              title
            }
          }
        }
      `
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`GraphQL fetch failed: ${resp.status} ${errText}`);
  }

  const { data, errors } = await resp.json();
  if (errors && errors.length) {
    throw new Error(`GraphQL errors: ${errors.map(e => e.message).join(', ')}`);
  }

  return data.pages.list;  // [{ path: "...", title: "..." }, …]
}
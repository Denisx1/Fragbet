// fetchMatches.ts

export async function fetchMatches(): Promise<any[]> {
  const query = `
 query GetAllSeriesInNext24Hours {
    allSeries(
        filter: {
            startTimeScheduled: {
                gte: "2025-06-16T00:00:00Z"
                lte: "2025-06-16T23:59:59Z"
            }
            type: ESPORTS
        }
        first: 50
    ) {
        totalCount
        edges {
            node {
                id
                teams {
                    baseInfo {
                        name
                        nameShortened
                    }
                }
                startTimeScheduled
              
            }
        
        }
    
    }
}`;

  const response = await fetch("http://api-op.grid.gg/central-data/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "HQZ6dIVfOZ4GXCLynyjmsbdLj3Q1movUCKRNieJN",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("GraphQL error");
  }

  return json.data.allSeries.edges;
}

export async function getMatchById(id: string) {
  const response = await fetch(
    `http://localhost:7095/upcomingMatchById/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

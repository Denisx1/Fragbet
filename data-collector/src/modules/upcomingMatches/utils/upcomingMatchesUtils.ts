export function extractMatchSlug(slug: string): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const matchRegex = new RegExp(
    `^[a-z0-9-]+-vs-[a-z0-9-]+-${year}-${month}-\\d{2}$`
  );
  return slug.includes("-vs-") && matchRegex.test(slug) ? slug : "";
}
export function extractUniqueTeamNames(slug: string): string[] | null {

  // 1. Найдём индекс 'vs' (с пробелами и без)
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) {
    console.warn(`No "vs" found in slug: ${slug}`);
    return [];
  }

  // 2. Извлечём левую часть (team1)
  const team1Raw = slug.slice(0, vsIndex);

  // 3. Извлечём правую часть (team2 + дата)
  const rightPart = slug.slice(vsIndex + 4); // 4 — длина "-vs-"

  // 4. Найдём дату в конце rightPart (формат DD-MM-YYYY)
  const dateRegex = /\d{2}-\d{2}-\d{4}$/;
  const dateMatch = rightPart.match(dateRegex);

  if (!dateMatch) {
    console.warn(`Date not found in slug: ${slug}`);
    return [];
  }
  

  // 5. Извлечём team2 — это часть rightPart без даты (и дефиса перед датой)
  const team2Raw = rightPart.slice(0, dateMatch.index!).replace(/-+$/, ""); // убираем дефисы в конце

  // 6. Функция для чистки команды — оставляем дефисы, убираем лишние пробелы
  const clean = (str: string) => str.trim();

  const team1 = clean(team1Raw);
  const team2 = clean(team2Raw)
  const isValidTeamName = (name: string) => {
    const hasLetters = /[a-zA-Z]{1,}/.test(name); // хотя бы 2 буквы подряд
    return hasLetters;
  };

  if (!team1 || !team2 || !isValidTeamName(team1) || !isValidTeamName(team2)) {
    return null;
  }

  // 7. Уникальные имена команд (в нижнем регистре)
  const teams = [team1, team2].filter(Boolean);
  const uniqueTeams = [...new Set(teams.map((t) => t.toLowerCase()))]

  return uniqueTeams;
}

// export function extractTeamName(slug: string): [string, string] {

//   const parts = slug.split("-");
//   // Ищем дату (DD-MM-YYYY)
//   let dateStartIndex = -1;
//   for (let i = parts.length - 3; i >= 0; i--) {
//     const possibleDate = parts.slice(i, i + 3).join("-");
//     if (/^\d{2}-\d{2}-\d{4}$/.test(possibleDate)) {
//       dateStartIndex = i;
//       break;
//     }
//   }

//   if (dateStartIndex === -1) {
//     console.warn(`Could not find date in slug: ${slug}`);
//     return ["", ""];
//   }

//   const teamsPart = parts.slice(0, dateStartIndex).join("-");
//   const [team1WithPrefix, team2WithPrefix] = teamsPart.split("vs");

//   if (!team1WithPrefix || !team2WithPrefix) {
//     console.warn(`Invalid slug format (missing 'vs'): ${slug}`);
//     return ["", ""];
//   }

//   // Обрабатываем team1
//   let cleanTeam1: string;
//   if (team1WithPrefix.startsWith("-") && !team1WithPrefix.startsWith("--")) {
//     // Если один дефис в начале, сохраняем его
//     cleanTeam1 = team1WithPrefix.replace(/-+$/g, "").trim();
//   } else {
//     // Убираем все лишние дефисы
//     cleanTeam1 = team1WithPrefix.replace(/^-+|-+$/g, "").trim();
//   }

//   // Обрабатываем team2
//   let cleanTeam2: string;
//   if (team2WithPrefix.startsWith("--")) {
//     // Если два дефиса, оставляем один
//     cleanTeam2 =
//       "-" + team2WithPrefix.replace(/^--+/, "").replace(/-+$/g, "").trim();
//   } else {
//     // Убираем все лишние дефисы
//     cleanTeam2 = team2WithPrefix.replace(/^-+|-+$/g, "").trim();
//   }

//   return [cleanTeam1, cleanTeam2];
// }

export function getSlugWithoutDate(slug: string): string {
  // Удаляем дату в формате YYYY-MM-DD или DD-MM-YYYY + тире
  
  return slug.replace(/[-_]?(\d{2}-\d{2}-\d{4}|\d{4}-\d{2}-\d{2})$/, '');
}
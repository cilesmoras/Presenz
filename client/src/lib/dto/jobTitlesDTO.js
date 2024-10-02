export function jobTitlesForSelectDropdownDTO(data) {
  return data.map((d) => ({
    id: d.id,
    name: d.title,
  }));
}

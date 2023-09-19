export default function searchTable(rows: any[], searchTerm: string) {
  searchTerm = searchTerm?.toLowerCase();

  return rows.filter((row: any) => {
    for (let prop in row) {
      if (row[prop]?.toString()?.toLowerCase()?.includes(searchTerm))
        return true;
    }

    return false;
  });
}

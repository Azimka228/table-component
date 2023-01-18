export function tableSort<T, K extends keyof T>(
  array: Array<T>,
  order: 'asc' | 'desc',
  orderBy: K,
): Array<T> {
  const stabilizedThis = array.map(el => ({...el}));
  let sortedArray: Array<T> = [];
  if (order === 'asc') {
    if (stabilizedThis.find(x => typeof x[orderBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        a[orderBy].localeCompare(b[orderBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => a[orderBy] - b[orderBy],
      );
  }
  if (order === 'desc') {
    if (stabilizedThis.find(x => typeof x[orderBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        b[orderBy].localeCompare(a[orderBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => b[orderBy] - a[orderBy],
      );
  }
  return sortedArray;
}

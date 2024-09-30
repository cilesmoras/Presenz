export function concatArrayItems(array, separator) {
  return array.filter((element) => Boolean(element)).join(separator);
}

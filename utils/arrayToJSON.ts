const arrayToJSON = (array: any): object[] => {
  const keys = array[0];
  const result: object[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < array.length; i++) {
    const obj: any = {};
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < keys.length; j++) {
      const value = j === 0 && array[i][j] ? BigInt(array[i][j]) : array[i][j];
      obj[keys[j]] = value;
    }
    result.push(obj);
  }

  return result;
};

export default arrayToJSON;

export const getCleanUrl = (url: string) => {
  const urlObject = new URL(url);
  return `${urlObject.protocol}//${urlObject.hostname}`;
};

export const removeFirstSlash = (str: string) => {
  return str.replace(/^\//, '');
};

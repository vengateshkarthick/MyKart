const getRedableText = (text: string) =>
  `${text[0].toUpperCase() + text.slice(1).toLocaleLowerCase()}`;


export const conjuctStrings = (text: string[]) => {
 const readabLeText = text.map(getRedableText);
 return `${readabLeText.slice(0, readabLeText.length - 1).join(",")} and ${readabLeText[readabLeText.length - 1]}`
}
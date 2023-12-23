/**
 * Slices a given text to a specified maximum length and appends ellipsis if needed.
 *
 * @param {string} txt - The input text to be sliced.
 * @param {number} [maxLength=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} - The sliced text, potentially appended with ellipsis.
 */
export function txtSlicer(txt : string , maxLength : number = 50){
    if(txt.length >= maxLength) return `${txt.slice(0,maxLength) }...`;
    return txt;
}
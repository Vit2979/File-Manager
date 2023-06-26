import * as path from 'path';

export const getPath = pathArr => {
    return (pathArr.length > 1) ? path.join(...pathArr) : `${pathArr[0]}${path.sep}`;
}
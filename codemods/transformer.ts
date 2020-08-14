import {FileInfo, API, Options} from 'jscodeshift';

export default (fileInfo: FileInfo, api: API, options: Options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);
  
    return root.toSource();
}
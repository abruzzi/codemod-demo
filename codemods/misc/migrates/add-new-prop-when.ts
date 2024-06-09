import { addPropWhen } from '../utils';

export default addPropWhen('@thoughtworks/button', 'title', '', (j, element) => {
    const attrs = j(element)
        .find(j.JSXOpeningElement)
        .find(j.JSXAttribute)

    if(attrs.length == 0) {
        return false;
    }

    const loadingAttrs = attrs
        .filter(attr => {
            const matches = j(attr)
                .find(j.JSXIdentifier)
                .filter(identifier => identifier.value.name === 'loading')
            return Boolean(matches.length)
        })

    return Boolean(loadingAttrs.length);
});
import React from 'react';
import FrosmoPlacement from './components/frosmo-placement';

const RawHtmlComponent = ({frosmoMessage}) => {
    const html = frosmoMessage.content;
    return <div dangerouslySetInnerHTML={{__html: html}}></div>;
}

export {
    FrosmoPlacement,
    RawHtmlComponent,
};

# Recipes

## Setup true display tracking for fragment component

```js
import React, { useRef, useEffect } from React;

const Comp = props => {
    // setup ref and effect hooks
    const elementRef = useRef(null);
    useEffect(() => {
        // get frosmo MessageInstance
        const instance = props.frosmoPositionData.getMessageInstance();

        // get dom element reference
        const el = elementRef.current;
        instance.setTrackableElements(el);
        instance.startTracking();
    });

    return
        <div ref={elementRef}>
            <h1>My title</h1>
            <p>Personalized message.</p>
        <div>;
}

<FrosmoPlacement id="my-placement" useFragment>
  <Comp/>
</FrosmoPlacement>
```

## A/B test

```js
const ComponentA = props => <h1>I'm content A</h1>;
const ComponentB = props => <h1>I'm content B</h1>;

const FrosmoVariation = props =>
    +props.frosmoMessage.revision === +props.id
        ? React.createElement(props.component, props)
        : null;

<FrosmoPlacement>
    <FrosmoVariation id="1" comonent={ComponentA}/>
    <FrosmoVariation id="2" comonent={ComponentB}/>
</FrosmoPlacement>
```

# Recipes

## Setup true display tracking for fragment component

```js
import React, { useRef, useEffect } from React;

const Comp = props => {
    // setup ref and effect hooks
    const elementRef = useRef(null);
    useEffect(() => {
        // get dom element reference
        const el = elementRef.current;
        props.setTrackableElements(el);
        props.startTracking();
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
    Number(props.frosmoMessage.revision) === Number(props.id)
        ? React.createElement(props.component, props)
        : null;

<FrosmoPlacement>
    <FrosmoVariation id="1" component={ComponentA}/>
    <FrosmoVariation id="2" component={ComponentB}/>
</FrosmoPlacement>
```

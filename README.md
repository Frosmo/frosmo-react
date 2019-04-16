# frosmo-react

Frosmo React connector component.

## Documentation

### `<FrosmoPlacement>` component

`FrosmoPlacement` is a base wrapper component to Frosmo display, optimization and testing logic. Children components
will receive _template default_ parameters as props. Components will also receive property `frosmoModificationContext`
object that provides access to modification content and tracking functions. Render prop `component` can be used instead
child components and will override rendering of children if used.

```js
<FrosmoPlacement id="fcp-placement-id" defaultComponent={DefaultContent}>
  <PersonalizedContent/>
</FrosmoPlacement>
```

**Component properties:**

| Property         | Description                 |
|------------------|-----------------------------|
| id               | **String** Placement id.    |
| defaultComponent | _Optional._ **React.Component** This is rendered initially. If Frosmo server responds with empty placement. |
| component        | _Optional._ **React.Component** This is rendered on successul Frosmo placement fetch. If defined children components won't be rendered. |
| useFragment      | _Optional._ **Boolean** Render children in _fragment_ rather than inside div. Note, with `useFragment` true display tracking must be implemented by child component. |

### `frosmoModificationContext` object

| Property              | Description                 |
|-----------------------|-----------------------------|
| variation             | `number` Modification variation number. |
| params                | `object` Modification parameters |
| content               | `string` Modification string body. |
| setClicked            | `function` Click tracking function. |
| setDisplayed          | `function` Display tracking function.|
| setTrueDisplayed      | `function` True display tracking function.|
| setTrackableElements  | `function` argument `HTMLElement` or Array of `HTMLElement`s |
| startTracking         | `function` Start Frosmo default tracking on elements set by function `setTrackableElements` |

## Development
### `npm run build`

Build library.

### `npm run watch`

Start in watch mode.

### `npm test`

Run test suite.


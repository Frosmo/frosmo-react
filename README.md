# frosmo

Frosmo React connector component.

## `npm run build`

Build library.

## `npm run watch`

Start in watch mode.

## `npm test`

Run test suite.

## Documentation

### `FrosmoPlacement`

`FrosmoPlacement` is a base wrapper component to Frosmo display, optimization and testing logic. Children components
will receive _template default_ parameters as props. Components will also receive properties `frosmoMessage` and
`frosmoPositionData` that contain all modification and placement data. Render prop `component` can be used instead
child components and will override rendering of children if used.

```js
<FrosmoPlacement loadComponent={FallbackContent}>
  <PersonalizedContent/>
</FrosmoPlacement>
```

Properties:

|------------------|-----------------------------|
| Property         | Description                 |
|------------------|-----------------------------|
| id               | **String** Placement id.    |
| loadComponent    | _Optional._ **React.Component** This is rendered initially. If Frosmo server responds with empty placement. |
| component        | _Optional._ **React.Component** This is rendered on successul Frosmo placement fetch. If defined children components won't be rendered. |
| errorComponent   |  _Optional._ **React.Component** This is rendered if placement fetch fails. |
| useFragment      | _Optional._ **Boolean** Render children in _fragment_ rather than inside div. Note, with `useFragment` true display tracking must be implemented by child component. |

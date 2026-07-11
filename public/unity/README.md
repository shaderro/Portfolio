# Unity WebGL builds

Place exported Unity WebGL files here:

```
public/unity/{id}/Build/
  {buildName}.loader.js
  {buildName}.data
  {buildName}.framework.js
  {buildName}.wasm
```

Example for the default demo (`interaction-demo`):

```
public/unity/interaction-demo/Build/
  interaction-demo.loader.js
  interaction-demo.data
  interaction-demo.framework.js
  interaction-demo.wasm
```

Register each build in `src/data/unity-builds.ts`.

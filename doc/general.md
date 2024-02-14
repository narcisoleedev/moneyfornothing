## Setting config files

### Prettier 

installing
```
npm i -D prettier 
```

add to package.json on scripts: 

```
"format": "prettier --write \"./**/*.{js,jsx}\"",
```

run
```
npm run prettier
```

### Eslint

installing
```
npm i -D eslint eslint-config-prettier
```

add to package.json on scripts: 

```
"lint": "eslint \"backend/**/*.{js,jsx}\" --quiet & eslint \"frontend/**/*.{js,jsx}\" --quiet",
```

run
```
npm run lint -- --quiet
```

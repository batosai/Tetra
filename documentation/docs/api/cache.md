---
id: cache
title: Cache
---

## Introduction

## Command

Use command for clear cache
```
npx tetra cache:clear [ cache_name1 cache_name2 ]
```

## Use in modules

```js
const { cache } = require('@tetrajs/core')
```

## Create cache

```js
cache.set('name', 'value')
```

## Getter cache

```js
cache.get('name')
```

## Exist cache

```js
cache.exist('name')
```

## Clear all cache

```js
cache.clear()
```

## Clear specify cache

```js
cache.clear('name')
```

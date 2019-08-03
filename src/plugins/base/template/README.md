# create-monorepo-app

This project was created with the intent of helping with the setup of Yarn Workspace for Frontend Monorepos.

## Main features

### `@your-app/ui` Package

The idea behind the `@your-app/ui` package is to allow you to share your generic components between two or more projects (a common usecase is when you have a customer and an admin page). It's by default imported by all projects, and can easily be used by a simple import:

```js
import { Button } from '@your-app/ui';
```

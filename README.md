# 💀 RIP Todos

REST In Peace Todos is a dead simple Todos API

## Install

Install using NPM

```js
npm install -g rip-todos
```

## Options

```
-p, --port <port>  the port in which the server will run
```

## Usage

After installing, just run `rip-todos` in your terminal and start to code your mad todo skills!

## Endpoints

| Method | URI | Body | Description |
| --- | --- | --- | --- |
| GET | `/todo/all` | _none_ | Return all Todos
| GET | `/todo/:id` | _none_ | Return a single Todo
| PATCH | `/todo` | `id` | Toggle completed status of a Todo
| POST | `/todo` | `id` | Creates a Todo
| DELETE | `/todo/:id` | _none_ | Delete a Todo

## LICENSE

MIT
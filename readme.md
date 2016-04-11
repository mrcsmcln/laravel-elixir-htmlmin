# Laravel Elixir htmlmin

This Laravel Elixir extension allows you to minify HTML.

## Installation

```
npm install laravel-elixir-htmlmin
```

## Usage

Assuming you write...

```js
elixir(function(mix) {
    mix.html('public');
});
```

...this will render your `resources/assets/html/public` folder to `public`. 

If you'd like to set a different output directory, you may pass a second argument to the html() method, like so:

```js
mix.html('public', 'resources/views')
```

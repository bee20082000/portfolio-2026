# Custom Fonts (Statically Served)

Place your custom `.otf`, `.ttf`, `.woff`, or `.woff2` font files in this folder to serve them statically.

## How to use in CSS (`src/style.css`):

To use a font placed here, define a `@font-face` rule in your CSS file using an absolute path relative to the public root:

```css
@font-face {
  font-family: 'YourFontName';
  src: url('/asset/fonts/your-font-file.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'YourFontName', sans-serif;
}
```

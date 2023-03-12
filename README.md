# Viewed Indicator

Display when a page has been visited using browser-local storage.

<img src="./screenshots/viewed.png" width="600px">

This demo takes advantage of React hooks in conjunction with the JavaScript
[storage module](https://developer.mozilla.org/en-US/docs/Web/API/Storage).

## Getting Started

Try out the demo on [CodeSandbox](https://codesandbox.io/p/github/jocmp/viewed-indicator/main)

Or run it locally:

1. Clone this repo
2. Install the dependencies
   ```
   npm install
   ```
3. Run the server
   ```
   npm run start
   ```
4. Open your browser and navigate to http://localhost:3000

## Appendix

My initial approach was to use the `visited` pseudo-selector. However, the pseudo-selector is limited to only a few stylings
to avoid hacking the `getComputedStyle` function to track users without consent.

- https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/
- https://joelcalifa.com/blog/revisiting-visited/

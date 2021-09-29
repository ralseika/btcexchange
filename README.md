# Bitcoin exchange

Application to calculate exchange rates for BTC, USD, GBP and EUR

### How does it run?

Type in Bitcoin amount and the app will convert it to other currencies with current exchange rates using Coindesk API:
https://api.coindesk.com/v1/bpi/currentprice.json

### How it was implemented?

Key features:

- Built from scratch (no create-react-app used)
- React + TS + SCSS + Webpack 5
- No 3rd party UI libraries.
- Custom, reusable form controls (input and select)
- Custom icon font containing only required icons. Implemented with [Fontello](https://fontello.com/)
- ESlint for code check
- Deployed to [Netlify](https://btcexchange.netlify.app/)

Solution explained:

- 3rd party library would be overkill for such a small app
- SCSS chosen over CSS in JS or other technologiese because of it's flexibility and personal familiarity
- create-react-app was not used because of it's difficulty to configure and unnecessary dependencies.
- To match overall UI, Select component was built from scracth to replace regular dropdown
- useState was enough to manage internal states. No need to use 3rd party state management libs.

### Obstacles

#### CoinBase API

Issue:
API itself delays to update values. Sometime the delays is up to 5 seconds.
If we fetch API every whole minute, it does not mean we will get updated API values.

Proposed solution:
We need to compare local time minutes to API respone updateISO value minutes until they match.
If minutes does not match, we initialize repeatFetch() function with 3s timeout until they do.
3 seconds were chosen just as an average.

More thoughts on that:
Sometimes API does not update "time" values, but currency rates are updated. Would need to better understand
API technology to implement ultimate solution

# Cochlear Web Quiz

## Features
- Web app built with jQuery
- Tested on a local Apache web server
- jQuery library fetched from the jQuery domain
- JSON data fetched from RAW Labs’ mock API service

## Testing
The responsiveness of the app has been tested with the dev tools in Chrome.

## Limitations
The background image is taken from the internet and is not optimized for a webpage.

## Data Structure

The application fetches JSON data from RAW Labs mock API service (https://www.raw-labs.com/). Here's an example of how the data looks like when fetched from the service:

```json
{
  "questions": [
    {
      "question": "Where is the HQ of Cochlear company located??",
      "options": [
        "London",
        "Paris",
        "Sydney",
        "Berlin"
      ],
      "correctIndex": 2
    },
    {
      ...
    }
    ...
  ]
}
```

## Installation

```bash
git clone https://github.com/dbeijer/cochlear-test.git
cd cochlear-test
```

## Usage
Put all the files in your www-root directory and browse to .../index.html in your browser.

# Free Music Ninja website

This README outlines the details of collaborating on this Ember application.

## Requirements

This project requires [Node.js][].

The following global Node packages are required for development:

* [bower][]
* [ember-cli][]

Install the global dependencies like this:

```bash
$ sudo npm install -g bower ember-cli grunt-cli
```


## Installation

* `git clone` this repository
* `npm install`

If you run into trouble, try this magical command and then start over:

  npm clear cache

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Deployment

The following environment variables are required to deploy this website to Amazon S3:

* AWS_KEY
* AWS_SECRET

To build the website:

* `ember build --environment production`

To deploy the website to S3:

* `grunt`


[bower]: http://bower.io/
[ember-cli]: http://ember-cli.com/
[gulp]: http://gulpjs.com/
[node.js]: http://nodejs.org/

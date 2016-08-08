# Documentation

Built with [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux) and [Material-UI](https://github.com/callemall/material-ui)

The current application is a set of components, that allows you to create a simple application, completely based on schemas, provided by user.

There are three type of schemas that are currently supported:

 * Routing schema (for creating application navigation)
 * List schema (for rendering a list of different entities)
 * Edit schema (for performing HTTP request against provided endpoint)


### Usage:

In the [example folder](https://github.com/infradash/dashboard/tree/master/app/json) you can find json schemas.
On the login screen user is asked to provide a URL for app's routes. It can be a local url from example folder (`json/routes.json`) and also a URL to external resource with the valid json file. See below for json structure.


### JSON structure:

#### Routing:

```js
Array<Object>

{
  "path": "/accounts",
  "name": "Accounts",
  "props": {
    "location": "PATH_TO_SCHEMA"
  }
}
```

**path** - A route in your app, e.g. https://your-app-domain.com/#/**route**

**name** - A text for left menu item

**props.location** - A path to the json schema, that will be rendered on the that specific page. Path might lead to the local or external resource.

#### List

```js
{
  "actions": {
    "initial": {
      "method": "GET",
      "url": "https://api-url.com"
    }
  },
  "type": "list",
  "schema": "PATH_TO_SCHEMA",
  "fields": {
    "name": "primary.username",
    "value": "id"
  }
}
```

**actions** - An object that contains different endpoints. `initial` endpoint is being called immediately after the page will be loaded

**type** - has two values, `list` or `edit`

**fields** - A mapping from the response to the UI. Value should be a unique string.

**fields.location** - A path to the schema for details view, that will be rendered on the details screen. Path might lead to the local or external resource.

#### Edit

```js
{
  "actions": {
    "initial": {
      "method": "GET",
      "url": "https://api-url.com/v1/account/{{id}}"
    },
    "delete": {
      "method": "DELETE",
      "url": "https://api-url.com/v1/account/{{id}}",
      "label": "Delete",
      "callback": {
        "fail": {
          "message": "The item has not been deleted",
          "redirect": "/accounts"
        },
        "success": {
          "message": "The item has been successfuly deleted",
          "redirect": "/accounts"
        }
      }
    },
    "post": {
      "method": "POST",
      "url": "https://api-url.com/v1/account/{{id}}",
      "callback": {
        "fail": {
          "message": "The item has not been updated",
          "redirect": "/accounts"
        },
        "success": {
          "message": "The item has been successfuly updated",
          "redirect": "/accounts"
        }
      }
    }
  },
  "type": "edit",
  "fields": {
    ...
  }
}

```

**actions** - An object that contains different endpoints. `initial` endpoint is being called immediately after the page will be loaded. This is the only one reserved keyword. `ACTION_TYPE` property could have any name.

**actions[ACTION_TYPE].label** - An optional string for mapping it to the button text.

**actions[ACTION_TYPE].callback** - An object that has two optional properties. `fail` and `success`. Each of them is an object with two properties.

**actions[ACTION_TYPE].callback[CALLBACK_TYPE].message** - A string that will be shown in the modal window after successful or failed request. If no string presents, modal window will not be shown.

**actions[ACTION_TYPE].callback[CALLBACK_TYPE].redirect** - A path for a redirect after closing the modal window with the message. Path must be local and presents in routes json schema, otherwise it will redirect to 404 page.


**fields** - A standard json-schema. The manual can be found [here](http://json-schema.org)


### Customization:
Currently there is no support for customization the app through json. App is based on [Material-UI](https://github.com/callemall/material-ui) and all visual changes can be done only by changing the source code.

### Deployment:
Please note, if you would like to change API url - you need to modify `app/config.js` file. To create a build, run `npm run build`. It will create a `dist` folder, that has three files - js, css and html. The folder can be deployed to any location.


### Development:
To start the development server
```
npm install && npm run start
```
and then open [http://localhost:3000](http://localhost:3000)

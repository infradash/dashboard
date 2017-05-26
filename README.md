Built with [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux) and [Material-UI](https://github.com/callemall/material-ui)

A frontend framework for building UI by providing json configuration.


## Usage:

In order to create a UI, user needs to provide an absolute path to json configuration file. It could an external url or internal. In case of internal, file should be placed within folder `public/json` and it will be accessible by `/json/$JSON_FILE_NAME` path.
In the [example folder](https://github.com/infradash/dashboard/tree/master/public/json) you can find some examples.


## JSON configuration:
Configuration has the following structure

```
{
  "authentication": [
    ...
  ],
  "routing": [
    ...
  ],
  "templates": {
    ...
  },
  "registeredComponents" : {
    ...
  },
  "appearance": {
    ...
  }
}

```

`routing`, `templates`, and `registeredComponents` are mandatory properties


### Authentication

An array of objects with authentication provider configuration.
- `type`: Type of the auth provider, currently supports `jwt`, `google`, `microsoft`.
- `title`: A name of the tab with authentication.
- `label`: A label of sign-in button.
- `enabled`: A boolean indicates if provided is enabled or not.
- `config`: A configation object, fields are different per provider.
  - `header`: A string template, that will be generated after succesful login and used for every following request when user is signed-in.

Example:
```js
"authentication": [
  {
    "type": "jwt",
    "title": "Login/password",
    "label": "Sign in",
    "enabled": false,
    "config": {
      "header": "{\"Authorization\": \"Bearer {{token}}\"}",
      "endpoint": "https://..."
    }
  }
]
```

### Routing

A route configuration
- `path`: A relative url path, should be unique
- `name`: A label for link
- `template`: A unique name of the template that should be rendered for selected route. Template should be defined in `templates`.

Example:
```js
"routing": [
  {
    "path": "/page1",
    "name": "Page one",
    "template": "page1Template"
  },
  {
    "path": "/page2",
    "name": "Page two",
    "template": "page2Template"
  }
],
```

### Templates
A map of templates

`key`: A unique name of the template

Each template might contains the following properties
- `events`: A map of components that could publish events and their subscribers components. They have to be mentioned in layout property.
- `layout`: An array of components that will be rendered on the page in the same order.
  - `name`: A unique name of component from `registeredComponents` map.
  - `style`: An object with CSS styles that will be applied to component wrapper


Example:
```js
"templates": {
  "page1Template": {
    "events": {
      "list": {
        "onSelect": [
          "edit"
        ]
      }
    },
    "layout": [
      {
        "name": "list",
        "style": {
          "width": "50%",
          "float": "left"
        }
      },
      {
        "name": "edit",
        "style": {
          "width": "50%",
          "float": "left"
        }
      }
    ]      
  }
}
```


### Registered components
A map of components.
- `key`: A unique name of the component
- `value`: A path to component configuration, could be internal or external.

Example:
```js
"registeredComponents" : {
  "component1" : "/json/..../file.json",
  "component2" : "http://url.com/json/..../file.json",
},
```
#### Component JSON
Each component json has the following structure
- `type`: A component type. Currently supports `visualization`, `crud` and `events`
- `viewConfig`: A component specific configuration.

For examples of component configation, please check [components folder](https://github.com/infradash/dashboard/tree/master/public/json/components)

```js
{
  "type": "visualization",
  "viewConfig": {
    "template": "tree",
    "dataSrc": "/json/data/tree-data.json"
  }
}
```


### Appearance
A basic customization for UI.
- `logo`: An absolute path to the image for logo
- `title`: A string for title

```js
"appearance": {}
  "logo": "http://cdn.eteknix.com/wp-content/uploads/2014/05/google-logo-transparent-69328.png",
  "title": "Cool stuff"
},
```


## Deployment:
`npm run build`

## Development:
`npm install && npm start`

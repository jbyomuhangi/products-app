# Submission notes

# The solution:

- I've created an app with 2 pages:
  - `/products`
  - `/attributes`
- Each page will list out data about the objects in a table style fashion, and users can sort, search filter and paginate these tables in different ways.
- Information about the sort, search filter and pagination are all stored in the URL, so users can effectively "save" these views by copying the URL link and saving it somewhere, they can also share this link with other people who will then be taken to the same view.
- This application makes use of environment variables, so please be aware of that if you try to run or build it. The list of required variables can be found in `env_template.txt`, you will just need to make sure these variables get loaded in when you try to build/run the app.
  - `NEXT_PUBLIC_BACKEND_URL=http://localhost:3000` is the minimum you will need to run the app.
  - To enable logging with Sentry, you will need to create a project in Sentry and set the `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` and `NEXT_PUBLIC_SENTRY_DSN` environment variables.

# Assumptions

- I assumed we wanted to make 2 pages one to list out products and another for attributes.
- I saw the `Product` object had a property called `attributes`, but there was no way to fetch attributes belonging to a product in an efficient manner using the `/attributes` endpoint, so I didn't implement a product details page. The `attributes` property on the `Product` object is an array that can potentially be very long, and there was no way to paginate it, so I omitted it from the response we get from the `/products` endpoint.

# Fixes

- There was an issue with the mock data, I was getting errors about there being invalid JSON, this was caused by some characters that were not correctly escaped.
- The HTTP verbs used for querying data in the api routes were wrong, they were `POST` requests before, I changed them to the correct verb, `GET`.
- I wasn't a fan of the file structure the project had initially, so I reorganised things to make more sense to me, grouping relevant things closer together, for example, api related things should be under the `/app/api` folder.
- I modified some the `attribute` and `product` types to include types for data I was planning on returning in my APIs.
- I changed the data returned by the APIs to fall more in line with what you would get from a typical REST endpoint.

# Application dependancies / tools:

- **mui** - Used this because they have a rich, pre-built component library, styling solutions, and is easy to work with.
- **clsx** - I've used this before to conditionally add classes to html elements, I didn't end up using it much here, but that's what its really good for.
- **sentry -** Used this to add comprehensive logging and monitoring for the application. It's really nice for diagnosing any issues users may have with your production app and gives you useful data (like stack traces, breadcrumbs, OS/environment information, session replays etc..) to solve them.
- **knip** - Used to help keep your code clean and lean by identifying any unused code like files, exports, variables, deps and so on, then you can remove them and clean up your code as needed.
- **nextjs-toploader -** Used to add some loading indication during route changes, or when we do things like set URL search params.
- **react-select -** A very versatile select component used anywhere we need one, like for some of the filters.
- **react-use -** A library of some useful pre-built react hooks you may need to do a variety of things.
- **eslint -** Used to enforce code style rules and find potential issues in how we write our code.
- **prettier -** Used to automatically format code so it makes it easily readable and consistent.
- **playwright** - Used to write and run some automated E2E tests for the application.

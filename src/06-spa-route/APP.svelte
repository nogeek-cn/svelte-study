
<script>
    import {link} from 'svelte-spa-router'
    // Import the router componento
    // Normally, this would be: `import Router from 'svelte-spa-router'`
    import Router from 'svelte-spa-router'

    // Import the list of routes
    import routes from '../route.js'
</script>

<h1>svelte-spa-router sample</h1>
<h2>Dynamic imports</h2>

<!-- Navigation links -->
<ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/hello/svelte">Say hi!</a> (dynamically imported route)</li>
    <li><a use:link={'/hello/svelte'}>Say hi!</a> (dynamically imported route)</li>
    <li><a href="#/wild/card">Wildcard route </a> (dynamically imported route, with a 5 seconds artificial delay)</li>
    <li><a href="#/does/not/exist">Not found</a></li>
</ul>

<!-- Show the router -->
<Router {routes} />

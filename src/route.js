import Home from '../src/06-spa-route/routes/Home.svelte'
import Name from '../src/06-spa-route/routes/Name.svelte'
import Wild from '../src/06-spa-route/routes/Wild.svelte'
import NotFound from '../src/06-spa-route/routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/hello/:first/:last?': Name,

    // Wildcard parameter
    // Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
    '/wild': Wild,
    '/wild/*': Wild,

    // Catch-all, must be last
    '*': NotFound,
}
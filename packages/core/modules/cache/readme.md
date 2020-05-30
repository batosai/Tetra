const cache = require('@tetrajs/cache')

async function a() {
    if ((await cache.exist('name'))) {
        // await cache.clean()

        const b = await cache.get('name')
        console.log(b)
    }
    else {
        cache.set('name', 'value')
    }
}
a()

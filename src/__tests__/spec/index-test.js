import test from 'ava'

test('first test',t => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    t.is(document.querySelector('div'),div)
})
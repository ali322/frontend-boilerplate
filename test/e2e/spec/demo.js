import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture('get started').page('http://127.0.0.1:9090/')

// eslint-disable-next-line no-undef
test('my first test', async t => {
  await t.expect(Selector('.event').count).gt(0)
})

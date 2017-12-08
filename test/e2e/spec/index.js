import { Selector } from 'testcafe'

/* eslint-disable no-undef */
fixture('get started').page('http://127.0.0.1:9000/index/')

test('find anwser', async t => {
  let link = Selector('.event').nth(1)
  let back = Selector('.btn')

  await t
  .click(link)
  .expect(back.exists).ok()
  .click(back)
  .expect(link.exists).ok()
})

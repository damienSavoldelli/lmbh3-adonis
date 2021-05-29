import test from 'japa'
import supertest from 'supertest'

import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import { JSDOM } from 'jsdom'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const superagent = supertest.agent(BASE_URL)

// describe
test.group('User', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Users page should exist', async () => {
    // When send a GET request to user
    await supertest(BASE_URL).get('/users').expect(200)
  })

  test('there should be no users on the users page', async (assert) => {
    // Given we have 0 account

    // When we send a GET request to users
    const { text } = await supertest(BASE_URL).get('/users').expect(200)

    // We should find 0 email user created
    const { document } = new JSDOM(text).window
    const test: HTMLAnchorElement = document.querySelector('a')!

    assert.isEmpty(test)
  })

  test('An user should be exist in users page', async (assert) => {
    // Given we have 1 account
    const user = await UserFactory.create()
    const { id, email } = user

    // When we send a GET request to users
    const { text } = await supertest(BASE_URL).get('/users').expect(200)

    // We should find email user created
    const { document } = new JSDOM(text).window
    const test = document.querySelector(`#user-${id}`)

    assert.exists(test)
    assert.equal(test!.textContent!.trim(), email)
  })

  test('An user is created when wee send POST data', async (assert) => {
    const data = {
      email: 'foo@mail.com',
      password: 'barwithmoreof5char',
    }

    await superagent
      .post('/users')
      .field('email', data.email)
      .field('password', data.password)
      .expect(302)

    const count = await Database.from('users').andWhere('email', data.email).count('* as total')

    assert.equal(count[0].total, 1)
  })

  test('An alert is created when wee send POST with 0 data', async (assert) => {
    const data = {
      email: '',
      password: '',
    }

    await superagent
      .post('/users')
      .field('email', data.email)
      .field('password', data.password)
      .expect(302)

    const count = await Database.from('users').andWhere('email', data.email).count('* as total')

    assert.equal(count[0].total, 0)
  })
})

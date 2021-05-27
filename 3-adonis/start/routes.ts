/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.on('/ex-users').render('form')

Route.post('/ex-users', async ({ request, response }) => {
  const paylod = await request.validate(UserValidator)
  console.log('toto')

  await User.create(paylod)

  response.redirect().back()
})

Route.get('/users', 'UsersController.index')
Route.get('/users/create', 'UsersController.create')
Route.post('/users', 'UsersController.store').as('users.create')
Route.get('/users/:id', 'UsersController.show').where('id', '^[0-9]+$').as('users.show')
Route.get('/users/:id/edit', 'UsersController.edit').where('id', '^[0-9]+$').as('users.edit')
Route.put('/posts/:id', 'UsersController.update').where('id', '^[0-9]+$').as('users.update')
Route.delete('/posts/:id', 'UsersController.destroy').where('id', '^[0-9]+$').as('users.destroy')

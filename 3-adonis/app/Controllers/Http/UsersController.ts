import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Users/StoreValidator'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('Users/index', { users })
  }

  public async create({ view }: HttpContextContract) {
    return await view.render('Users/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    // exec Stor validator
    const payload = await request.validate(StoreValidator)

    console.log('data paylod', payload)

    await User.create(payload)

    return response.redirect().toRoute('UsersController.index')
  }

  public async show({}: HttpContextContract) {
    return 'test'
  }

  public async edit({}: HttpContextContract) {
    return 'test'
  }

  public async update({}: HttpContextContract) {
    return 'test'
  }

  public async destroy({}: HttpContextContract) {
    return 'test'
  }
}

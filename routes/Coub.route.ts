import { Router } from 'express'
import 'reflect-metadata'
import { autoInjectable, container } from 'tsyringe'
import CoubController from '../controllers/Coub.controller'

/*
  path: /coub
*/

@autoInjectable()
class Coub {
  router: Router = Router()

  constructor(private coubController: CoubController) {
    this.router.get('/download', this.coubController.download())
    this.router.post('/fetch_videos', this.coubController.fetchVideos())
  }
}

export default container.resolve(Coub)

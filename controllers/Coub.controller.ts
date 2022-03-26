import { RequestHandler } from 'express'
import { Logger } from 'tslog'
import { autoInjectable } from 'tsyringe'
import CoubService from '../services/Coub.service'

@autoInjectable()
export default class CoubController {
  private logger = new Logger()

  constructor(private coubService: CoubService) {}

  download(): RequestHandler {
    return async (req, res) => {
      try {
        await this.coubService.download()
      } catch (err) {
        this.logger.error(err)
        return res.sendStatus(500)
      }

      return res.json({ message: 'Coubs were downloaded' })
    }
  }

  fetchVideos(): RequestHandler {
    return async (req, res) => {
      const { _coub_session_2, remember_token } = req.body

      if (_coub_session_2 && remember_token) {
        try {
          await this.coubService.fetchVideos(_coub_session_2, remember_token)
        } catch (err) {
          this.logger.error(err)
          return res.sendStatus(500)
        }

        return res.json({ message: 'Coubs were saved' })
      }

      return res.status(500).json({ message: 'Invalid query' })
    }
  }
}

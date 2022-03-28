import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { Logger } from 'tslog'
import { autoInjectable } from 'tsyringe'
import CoubLinks from '../coub_data/links.json'
import { EServiceUrls } from '../tools/enums/Services.enum'
import { IFavourites } from '../tools/interfaces/Coub.interface'
import UtilsService from './shared/Utils.service'

@autoInjectable()
export default class CoubService {
  private $axios = axios.create({
    baseURL: EServiceUrls.COUB
  })
  private logger = new Logger()

  private downloadUrl = 'https://9xbuddy.com/process?url=https://coub.com/view'
  private favoriteUrl =
    'https://coub.com/api/v2/timeline/favourites?order_by=date&per_page=25'

  constructor(private utils: UtilsService) {}

  async download(): Promise<void> {
    const [page, browser] = await this.utils.getPuppeeter()

    for (let i = 0; i < CoubLinks.length; i++) {
      const coubId = CoubLinks[i]
      const url = `${this.downloadUrl}/${coubId}`
      await page.goto(url, {
        waitUntil: 'networkidle2'
      })
      await page.content()

      const isLinkExist = await page
        .waitForSelector('a[href^="https://coub-anubis-a.akamaized.net"]', {
          timeout: 10000
        })
        .then(res => {
          return res
        })
        .catch(err => {
          this.logger.error(err)
        })

      if (isLinkExist) {
        await page.click('a[href^="https://coub-anubis-a.akamaized.net"]')
      }
    }

    await new Promise(res => {
      setTimeout(res, 15000)
    })

    await browser.close().catch(err => {
      throw new Error(`Couldn't close browser properly. ERR: ${err}`)
    })
  }

  async fetchVideos(
    _coub_session_2: string,
    remember_token: string
  ): Promise<void> {
    let page = 1
    let total_pages = 0
    let isOver = false
    const coubIds: string[] = []

    while (!isOver) {
      const response = await this.$axios
        .get<IFavourites>(`${this.favoriteUrl}&page=${page}`, {
          headers: {
            Cookie: `_coub_session_2=${_coub_session_2}; remember_token=${remember_token}`
          }
        })
        .then(res => res.data)
        .catch(err => {
          throw new Error(`Couldn't fetch coub data. ERR: ${err}`)
        })

      response.coubs.forEach(el => {
        coubIds.push(el.permalink)
      })

      if (!total_pages) {
        total_pages = response.total_pages
      }

      if (page === total_pages) {
        isOver = true
      } else {
        page++
      }
    }

    this.logger.info('Coub ids: ', coubIds.join(', '))

    this.saveVideoIds(coubIds)
  }

  async saveVideoIds(ids: string[]): Promise<void> {
    const filePath = path.join(__dirname, '../coub_data/links.json')
    fs.writeFileSync(filePath, JSON.stringify(ids))
  }
}

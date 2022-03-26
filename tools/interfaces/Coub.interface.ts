export interface IFavourites {
  page: number
  per_page: number
  total_pages: number
  coubs: Coub[]
}

interface Coub {
  flag: boolean
  abuses: null
  recoubs_by_users_channels: number[]
  favourite: boolean
  promoted_id: null
  recoub: boolean
  like: boolean
  dislike: boolean
  reaction: Reaction
  in_my_best2015: boolean
  id: number
  type: Type
  permalink: string
  title: string
  visibility_type: VisibilityType
  original_visibility_type: VisibilityType
  channel_id: number
  created_at: string
  updated_at: string
  is_done: boolean
  views_count: number
  cotd: null
  cotd_at: null
  visible_on_explore_root: boolean
  visible_on_explore: boolean
  featured: boolean
  published: boolean
  published_at: string
  reversed: boolean
  from_editor_v2: boolean
  is_editable: boolean
  original_sound: boolean
  has_sound: boolean
  recoub_to: null
  file_versions: FileVersions
  audio_versions: Versions
  image_versions: Versions
  first_frame_versions: Versions
  dimensions: Dimensions
  site_w_h: number[]
  page_w_h: number[]
  site_w_h_small: number[]
  size: number[]
  age_restricted: boolean
  age_restricted_by_admin: boolean
  not_safe_for_work: boolean | null
  allow_reuse: boolean
  dont_crop: boolean
  banned: boolean
  global_safe: boolean | null
  audio_file_url: null | string
  external_download: boolean | ExternalDownloadClass
  application: null
  channel: Channel
  file: null
  picture: string
  timeline_picture: string
  small_picture: string
  sharing_picture: null
  percent_done: number
  tags: Tag[]
  categories: Category[]
  communities: Community[]
  recoubs_count: number
  remixes_count: number
  likes_count: number
  dislikes_count: number
  raw_video_id: number
  uploaded_by_ios_app: boolean
  uploaded_by_android_app: boolean
  media_blocks: MediaBlocks
  raw_video_thumbnail_url: string
  raw_video_title: null | string
  video_block_banned: boolean
  duration: number
  promo_winner: boolean
  promo_winner_recoubers: null
  editorial_info: EditorialInfo
  promo_hint: null
  beeline_best_2014: null
  from_web_editor: boolean
  normalize_sound: boolean
  normalize_change_allowed: boolean
  best2015_addable: boolean
  ahmad_promo: null
  promo_data: null
  audio_copyright_claim: null
  ads_disabled: boolean | null
  is_safe_for_ads: boolean
  megafon_contents: any[]
  position_on_page: number
}

interface Versions {
  template?: string
  versions?: string[]
}

interface Category {
  id: number
  title: string
  permalink: string
  subscriptions_count: number
  big_image_url: string
  small_image_url: string
  med_image_url: string
  visible: boolean
}

interface Channel {
  id: number
  permalink: string
  title: string
  description: null | string
  i_follow_him: boolean
  follows_by_users_channels: number[]
  followers_count: number
  following_count: number
  avatar_versions: Versions
}

interface Community {
  id: number
  title: string
  permalink: string
  subscriptions_count: number
  big_image_url: string
  small_image_url: string
  med_image_url: string
  i_subscribed: boolean
  community_notifications_enabled: boolean
  description: Description
}

interface Description {
  id: number
  description: string
  rules: string[]
  description_html: string
  rules_html: string[]
}

interface Dimensions {
  big: number[]
  med: number[]
}

interface EditorialInfo extends Object {}

interface ExternalDownloadClass {
  type: string
  service_name: string
  url: string
  has_embed: boolean
}

interface FileVersions {
  html5: Html5
  mobile: Mobile
  share: Share
}

interface Html5 {
  video: Video
  audio: Audio
}

interface Audio {
  high: High
  med: High
  sample_duration?: number
}

interface High {
  url: string
  size: number
}

interface Video {
  higher: High
  high: High
  med: High
}

interface Mobile {
  video: string
  audio: string[]
}

interface Share {
  default: string
}

interface MediaBlocks {
  uploaded_raw_videos: any[]
  external_raw_videos: ExternalVideo[]
  remixed_from_coubs: any[]
  external_video?: ExternalVideo
}

interface ExternalVideo {
  id: number
  title: string
  url: string
  image: string
  image_retina: string
  meta: Meta
  duration: number
  raw_video_id: number
  has_embed: boolean
}

interface Meta {
  service: string
  duration: string
}

enum VisibilityType {
  Public = 'public'
}

enum Reaction {
  Heart = 'heart'
}

interface Tag {
  id: number
  title: string
  value: string
}

enum Type {
  CoubSimple = 'Coub::Simple'
}

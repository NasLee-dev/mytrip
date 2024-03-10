export interface Hotel {
  comment: string
  contents: string
  id: string
  image: string[]
  location: {
    direction: string
    pointGeolocation: {
      x: number
      y: number
    }
  }
  name: string
  mainImageUrl: string
  price: number
  startRating: number
  events?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}

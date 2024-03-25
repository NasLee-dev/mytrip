export interface Reservation {
  userId: string
  roomId: string
  hotelId: string
  startDate: string
  endDate: string
  price: number
  formValues: { [key: string]: string }
}

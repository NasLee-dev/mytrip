import Button from '../shared/Button'
import { HOTEL_NAMES, IMAGES, HOTEL, EVENTS, ROOMS } from '@/mock/data'
import { COLLECTIONS } from '@/constants/index'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'

export default function HotelListAddBtn() {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const handleBtnClick = () => {
    const batch = writeBatch(store)
    const hotels = HOTEL_NAMES.map((hotelName, index) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: random(130000, 200000),
        startRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[index] != null && { events: EVENTS[index] }),
      }
    })
    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))
      batch.set(hotelDocRef, hotel)
      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM)) //  호텔 문서 안에 방 문서를 추가 => 계층 구조
        batch.set(subDocRef, room)
      })
    })
    batch
      .commit()
      .then(() => {
        console.log('성공적으로 추가되었습니다.')
      })
      .catch((error) => {
        console.error('추가 실패:', error)
      })
  }
  return <Button onClick={handleBtnClick}>호텔리스트 추가</Button>
}

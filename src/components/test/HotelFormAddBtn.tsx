import Button from '../shared/Button'
import { FORMS } from '@/mock/data'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

export default function HotelFormAddBtn() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))
    snapshot.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })
    await batch.commit()
    alert('폼 데이터 추가 완료')
  }
  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}

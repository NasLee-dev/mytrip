import Form from '@/components/reservation/Form'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import useUser from '@/hooks/auth/useUser'
import addDelimiter from '@/utils/addDelimiter'
import { parse } from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ReservationPage() {
  const user = useUser()
  const navigate = useNavigate()
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }
  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [startDate, endDate, nights, roomId, hotelId, user])
  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })
  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data
  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      formValues,
      userId: user?.uid as string,
      roomId,
      startDate,
      endDate,
      hotelId,
      price: room.price * Number(nights),
    }
    await makeReservation(newReservation)
    //  TODO: 예약 완료 페이지로 이동
    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights), ',')}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        onSubmit={handleSubmit}
        forms={hotel.forms}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

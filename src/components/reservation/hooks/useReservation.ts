import { useAlertContext } from '@/contexts/AlertContext'
import { Reservation } from '@/models/reservation'
import { getHotelWithRoom } from '@/remote/hotel'
import makeReservation from '@/remote/reservation'
import { useMutation, useQuery } from 'react-query'

export default function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', { hotelId, roomId }],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.avaliableCount === 0) {
          open({
            title: '객실이 매진 되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )
  const { mutateAsync } = useMutation(
    (newReservation: Reservation) => makeReservation(newReservation),
    {
      onError: () => {
        open({
          title: '예약 실패',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )
  return { data, isLoading, makeReservation: mutateAsync }
}

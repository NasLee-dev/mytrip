import useUser from '@/hooks/auth/useUser'
import getRiviews, { removeReview, writeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export default function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getRiviews({ hotelId }),
  )
  const user = useUser()
  const client = useQueryClient()
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }
      await writeReview(newReview)
      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )
  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )
  return { data, isLoading, write, remove }
}

import useLike from '@/components/hotelList/hooks/like/useLike'
import { useAlertContext } from '@/contexts/AlertContext'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useCallback, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

export default function useEditLike() {
  const { data = [] } = useLike()
  const [isEdit, setIsEdit] = useState(false)
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const { open } = useAlertContext()
  const client = useQueryClient()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])
  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prev) => {
      const newItems = [...prev]
      const [fromItem] = newItems.splice(from, 1)
      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }
      newItems.forEach((like, index) => {
        like.order = index + 1
      })
      return newItems
    })
  }, [])
  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueryData(['likes'], updatedLikes)
      setUpdatedLikes([])
      setIsEdit(false)
    } catch (error) {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          setUpdatedLikes([])
        },
      })
    }
  }
  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}

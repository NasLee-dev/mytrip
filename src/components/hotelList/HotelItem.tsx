import { Hotel as IHotel } from '@/models/hotel'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRow'
import Spacing from '../shared/Spacing'
import Tag from '../shared/Tag'
import Text from '../shared/Text'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HotelItem({ hotel }: { hotel: IHotel }) {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }
    const { promoEndTime } = hotel.events

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )
      if (남은초 < 0) {
        clearInterval(timer)
        return
      }
      setRemainedTime(남은초)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])
  const tagComponent = () => {
    if (hotel.events == null) {
      return null
    }
    const { name, tagThemeStyle } = hotel.events
    const promotionTxt =
      remainedTime > 0 ? `핫딜  - ${formatTime(remainedTime)} 남음` : ''
    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }
  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {/* 태그 */}
              {tagComponent()}
              <ListRow.Texts
                title={hotel.name}
                subtitle={hotel.comment}
              ></ListRow.Texts>
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {hotel.startRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex direction="column" align="flex-end">
              <img src={hotel.mainImageUrl} alt="" css={imageStyles} />
              <Spacing size={8} />
              <Text bold={true}>{addDelimiter(hotel.price, ',')}원</Text>
            </Flex>
          }
          style={ContainerStyles}
        />
      </Link>
    </div>
  )
}

const ContainerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

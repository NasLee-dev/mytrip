import ListRow from '@/components/shared/ListRow'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="찜하기" subtitle="찜한 호텔 변경" />
              }
            />
          </Link>
        </li>
        <li>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="예약목록" subtitle="예약목록 보러가기" />
              }
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

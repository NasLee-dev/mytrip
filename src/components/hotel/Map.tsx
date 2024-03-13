import { Hotel } from '@/models/hotel'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

export default function Map({ location }: { location: Hotel['location'] }) {
  const {
    pointGeolocation: { x, y },
    directions,
  } = location
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API as string,
  })
  return (
    <Flex
      direction="column"
      style={{
        padding: '24px',
      }}
    >
      <Text typography="t4" bold={true}></Text>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '250px',
            margin: '16px 0',
            boxSizing: 'border-box',
          }}
          center={{ lat: y, lng: x }}
          zoom={15}
        >
          <Marker position={{ lat: y, lng: x }} />
        </GoogleMap>
      ) : (
        <Text>로딩중</Text>
      )}
      <Text typography="t6">{directions}</Text>
    </Flex>
  )
}

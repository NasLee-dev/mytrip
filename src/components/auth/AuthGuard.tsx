import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user == null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    }
    setInitialize(true)
  })
  if (!initialize) {
    return null
  }
  return <>{children}</>
}

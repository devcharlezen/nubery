import { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/router'

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/')
  //     return null
  //   }
  // }, [user])

  useEffect(() => {
    if (user) {
      axios
        .post(`/api/get-account-status`)
        .then((res) => {
          // console.log(res);
          dispatch({
            type: 'LOGIN',
            payload: res.data,
          })
          window.localStorage.setItem('user', JSON.stringify(res.data))
          window.location.href = '/instructor/dashboard'
        })
    }
  }, [user])

  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-danger p-5"
    />
  )
}

export default StripeCallback
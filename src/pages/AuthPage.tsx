import { AuthRequest } from '@/api/@types'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { ConditionalComponent } from '@/components'
import { AuthForm } from '@/components/forms'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { authAction } from '@/store/auth'
import { BaseHeading } from '@/ui/text'
import { useNavigate } from 'react-router-dom'

export const AuthPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status, error } = useAppSelector((state) => state.auth)

  const initialValues: AuthRequest = { email: '', password: '' }

  const handleSubmit = async (values: AuthRequest) => {
    try {
      await dispatch(authAction({ withToken: false, authData: values }))
      navigate(NAVIGATE_ROUTES.APP)
    } catch (e) {}
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black">
      <BaseHeading type={1} text="EM Heaven" className="mb-4 text-main" />
      <div className="w-[500px] rounded bg-inherit p-8">
        <ConditionalComponent show={!!error}>
          <p className="mb-4 w-full rounded-half bg-white p-3 text-center text-error">
            {error}
          </p>
        </ConditionalComponent>
        <AuthForm
          initialValues={initialValues}
          submit={handleSubmit}
          loading={status === 'loading'}
        />
      </div>
    </div>
  )
}

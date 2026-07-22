import { useQuery } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getRegions } from '../api/auth'
import { getApiErrorMessage } from '../api/errors'
import { Logo } from '../components/common/Logo'
import { ROUTES } from '../constants/routes'
import {
  useEmailVerificationConfirmMutation,
  useEmailVerificationRequestMutation,
  useLoginMutation,
  useNicknameAvailabilityMutation,
  useSignupMutation,
} from '../hooks/useAuthMutations'
import { isAuthenticated, saveAuthToken } from '../utils/authToken'

type AuthMode = 'login' | 'signup'

export function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [nickname, setNickname] = useState('')
  const [region, setRegion] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [notice, setNotice] = useState('')

  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: Infinity,
  })
  const loginMutation = useLoginMutation()
  const signupMutation = useSignupMutation()
  const emailRequestMutation = useEmailVerificationRequestMutation()
  const emailConfirmMutation = useEmailVerificationConfirmMutation()
  const nicknameMutation = useNicknameAvailabilityMutation()

  if (isAuthenticated()) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setNotice('')
    loginMutation.reset()
    signupMutation.reset()
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          saveAuthToken(response)
          navigate(ROUTES.dashboard, { replace: true })
        },
      },
    )
  }

  const handleEmailRequest = () => {
    setNotice('')
    setEmailVerified(false)
    emailRequestMutation.mutate(email, {
      onSuccess: (response) => setNotice(response.message),
    })
  }

  const handleEmailConfirm = () => {
    setNotice('')
    emailConfirmMutation.mutate(
      { email, code: verificationCode },
      {
        onSuccess: (response) => {
          setEmailVerified(true)
          setNotice(response.message)
        },
      },
    )
  }

  const handleNicknameCheck = () => {
    setNotice('')
    nicknameMutation.mutate(nickname, {
      onSuccess: (response) => {
        setNicknameChecked(response.available)
        setNotice(
          response.available
            ? '사용할 수 있는 닉네임입니다.'
            : '이미 사용 중인 닉네임입니다.',
        )
      },
    })
  }

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('')

    if (!emailVerified) {
      setNotice('이메일 인증을 먼저 완료해 주세요.')
      return
    }
    if (!nicknameChecked) {
      setNotice('닉네임 중복 확인을 완료해 주세요.')
      return
    }
    if (password !== passwordConfirm) {
      setNotice('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    signupMutation.mutate(
      { email, password, passwordConfirm, nickname, region },
      {
        onSuccess: () => {
          setPassword('')
          setPasswordConfirm('')
          switchMode('login')
          setNotice('회원가입이 완료되었습니다. 로그인해 주세요.')
        },
      },
    )
  }

  const currentError =
    loginMutation.error ??
    signupMutation.error ??
    emailRequestMutation.error ??
    emailConfirmMutation.error ??
    nicknameMutation.error ??
    regionsQuery.error

  return (
    <div className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <a href={ROUTES.dashboard} className="auth-card__brand" aria-label="프레시닥터 홈">
          <Logo />
        </a>
        <div className="auth-tabs" role="tablist" aria-label="인증 메뉴">
          <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>로그인</button>
          <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'active' : ''} onClick={() => switchMode('signup')}>회원가입</button>
        </div>

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div>
              <h1 id="auth-title">안전한 발주를 시작하세요</h1>
              <p>오늘의 식자재 위험 정보를 확인하고 발주를 관리하세요.</p>
            </div>
            <label>이메일<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
            <label>비밀번호<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" minLength={8} maxLength={64} required /></label>
            <button className="button button--primary auth-submit" type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? '로그인 중...' : '로그인'}</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <div>
              <h1 id="auth-title">사장님 정보를 등록해 주세요</h1>
              <p>가입 후 관심 품목과 맞춤 알림을 설정할 수 있어요.</p>
            </div>
            <label>이메일<div className="auth-inline"><input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setEmailVerified(false) }} autoComplete="email" required /><button type="button" onClick={handleEmailRequest} disabled={!email || emailRequestMutation.isPending}>{emailRequestMutation.isPending ? '전송 중' : '인증번호 받기'}</button></div></label>
            <label>인증번호<div className="auth-inline"><input inputMode="numeric" value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} maxLength={6} placeholder="6자리 숫자" required /><button type="button" onClick={handleEmailConfirm} disabled={!verificationCode || emailConfirmMutation.isPending}>{emailVerified ? '인증 완료' : '인증 확인'}</button></div></label>
            <label>비밀번호<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} maxLength={64} required /></label>
            <label>비밀번호 확인<input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} autoComplete="new-password" minLength={8} maxLength={64} required /></label>
            <label>닉네임<div className="auth-inline"><input value={nickname} onChange={(event) => { setNickname(event.target.value); setNicknameChecked(false) }} minLength={2} maxLength={20} required /><button type="button" onClick={handleNicknameCheck} disabled={nickname.length < 2 || nicknameMutation.isPending}>{nicknameChecked ? '확인 완료' : '중복 확인'}</button></div></label>
            <label>지역<select value={region} onChange={(event) => setRegion(event.target.value)} required><option value="">지역을 선택해 주세요</option>{regionsQuery.data?.map((item) => <option key={item.code} value={item.name}>{item.name}</option>)}</select></label>
            <button className="button button--primary auth-submit" type="submit" disabled={signupMutation.isPending}>{signupMutation.isPending ? '가입 중...' : '회원가입'}</button>
          </form>
        )}

        {(notice || currentError) && (
          <p className={currentError ? 'auth-message auth-message--error' : 'auth-message'} role="status">
            {currentError ? getApiErrorMessage(currentError) : notice}
          </p>
        )}
      </section>
    </div>
  )
}

'use client'

import {cn} from '@/lib/utils'
import {useState} from 'react'
import {usePathname} from 'next/navigation'
import {useForm} from 'react-hook-form'

import Link from 'next/link'
import {SPAN} from '~/UI/Typography'

import {TFormFields} from '@/app/api/email/route'

export default function ContactsForm() {
  const {register, handleSubmit, reset} = useForm<TFormFields>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState('Отправить')

  const pathname = usePathname()
  const isEuroclear = pathname.includes('euroclear') || pathname.includes('czennye-bumagi')

  const onSubmit = async (data: TFormFields) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      await response.json()
      setButtonText('Форма отправлена')
      reset()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setButtonText('Отправить')
      }, 1500)
    }
  }

  const boxInputClasses = 'grid w-full px-9 xl:px-7 sm:px-5 pt-7 pb-8 xl:py-6 sm:py-4 sm:pb-5 place-items-start border border-gray'
  const inputClasses = 'block w-full text-2xl xl:text-[22px] sm:text-lg text-foreground text-gray-light placeholder:text-gray-light bg-transparent border-foreground !outline-none'

  return (
    <form className="flex flex-col justify-between gap-7 xl:gap-6 sm:gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className={boxInputClasses}>
        <input type="text" className={inputClasses} placeholder="Имя" {...register('name', {required: true})} />
      </div>

      <div className={boxInputClasses}>
        <input type="email" className={inputClasses} placeholder="E-mail" {...register('email', {required: true})} />
      </div>

      {isEuroclear && (
        <div className={boxInputClasses}>
          <input type="text" className={inputClasses} placeholder="Номер телефона" {...register('phone')} />
        </div>
      )}

      {isEuroclear ? (
        <>
          <div className={`h-full sm:space-y-3.5 ${boxInputClasses}`}>
            <textarea id="broker_blocker" className={inputClasses} placeholder="В каких российских брокерах заблокированы Ваши активы?" {...register('broker_blocker')} rows={2} />
          </div>

          <div className={`h-full sm:space-y-3.5 ${boxInputClasses}`}>
            <textarea id="blocked_volume" className={inputClasses} placeholder="Примерная стоимость портфеля" {...register('blocked_volume')} rows={2} />
          </div>
        </>
      ) : (
        <div className={`h-full sm:space-y-3.5 ${boxInputClasses}`}>
          <textarea className={inputClasses} placeholder="Ваш вопрос" {...register('message')} rows={3} />
        </div>
      )}

      <div className="space-y-3">
        <button type="submit" disabled={isSubmitting} className={cn('grid place-items-center w-full pt-3.5 pb-4 xl:px-8 sm:pb-4 text-white bg-blue hover:bg-blue/85 duration-500', isSubmitting ? 'bg-blue/85' : '')}>
          {isSubmitting ? (
            <div className="s-6 animate-spin rounded-full border-2 border-white border-t-blue" />
          ) : (
            <>
              <SPAN className="text-2xl leading-none normal-case xl:text-xl">{buttonText}</SPAN>
            </>
          )}
        </button>

        <SPAN className="normal-case !leading-[1.3] block">
          Нажимая на кнопку «Отправить», вы соглашаетесь с условиями{' '}
          <Link className="underline hover:no-underline underline-offset-2" href="/privacy-policy">
            политики конфиденциальности
          </Link>{' '}
          и даёте согласие на обработку персональных данных.
        </SPAN>
      </div>
    </form>
  )
}

'use client'

import {cn} from '@/lib/utils'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import Link from 'next/link'
import {SPAN} from '~/UI/Typography'

export type TFormFields = {
  name: string
  email: string
  message: string
}

export default function ContactsForm() {
  const {register, handleSubmit, reset} = useForm<TFormFields>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState('Отправить')

  const onSubmit = async (data: TFormFields) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
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
        setButtonText('Отправить форму')
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

      <div className={`h-full sm:space-y-3.5 ${boxInputClasses}`}>
        <textarea className={inputClasses} placeholder="Ваш вопрос" {...register('message')} rows={3} />
      </div>

      <div className="space-y-3">
        <button type="submit" disabled={isSubmitting} className={cn('block w-full py-3.5 xl:px-8 sm:pb-4 text-white bg-blue hover:bg-blue/85 duration-500', isSubmitting ? 'bg-blue/85' : '')}>
          <SPAN className="text-2xl leading-none normal-case xl:text-xl">{buttonText}</SPAN>
        </button>

        <SPAN className="normal-case !leading-[1.3] block">
          Нажимая на кнопку «Отправить», вы соглашаетесь с условиями{' '}
          <Link className="underline hover:no-underline underline-offset-2" href="/privacy-policy">
            политики конфиденциальности
          </Link>
        </SPAN>
      </div>
    </form>
  )
}

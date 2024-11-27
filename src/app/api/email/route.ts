import {NextRequest, NextResponse} from 'next/server'
import {Resend} from 'resend'

import {EmailTemplate} from '@/app/api/email/Template'
import {TFormFields} from '~~/index/ContactsForm'

export type TEmailFields = TFormFields & {
  subject: string
}

const resend = new Resend(process.env.RESEND_API_KEY)
const emailsList = {
  from: 'notifications@muellerwagner.ru',
  to: 'info@muellerwagner.ru',
}

export async function POST(req: NextRequest) {
  const body: TEmailFields = await req.json()
  const {email, message} = body

  if (!message || !email) {
    return NextResponse.json({error: 'Missing required fields'}, {status: 400})
  }

  try {
    const {data, error} = await resend.emails.send({
      from: `MUELLER WAGNER <${emailsList.from}>`,
      to: emailsList.to,
      subject: 'Новое заполнение формы на сайте muellerwagner.ru',
      react: EmailTemplate({
        subject: body.subject,
        name: body.name,
        email: body.email,
        message: body.message,
      }),
    })

    if (error) {
      return NextResponse.json({message: 'Email sending failed', error}, {status: 400})
    }

    return NextResponse.json({message: 'Email sent successfully', data}, {status: 200})
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({message: 'Failed to send email', error}, {status: 500})
  }
}

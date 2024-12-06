import * as React from 'react'
import {Body, Container, Column, Head, Heading, Html, Preview, Row, Section, Text} from '@react-email/components'
import {TEmailFields} from '@/app/api/email/route'

export const EmailTemplate = ({subject = 'Новое заполнение формы', name, email, message, phone, broker_blocker, blocked_volume}: TEmailFields) => {
  return (
    <Html>
      <Head />
      <Preview>Оставили новую заявку на сайте muellerwagner.ru</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row style={{paddingBottom: '0'}}>
              <Column>
                <Heading as="h2" style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#878686'}}>
                  {subject}
                </Heading>

                {name && (
                  <Text style={paragraph}>
                    <b>Имя:</b> {name}
                  </Text>
                )}
                {email && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>E-mail:</b> {email}
                  </Text>
                )}
                {message && (
                  <Text style={paragraph}>
                    <b>Комментарий:</b> {message}
                  </Text>
                )}

                <>
                  {phone && (
                    <Text style={paragraph}>
                      <b>Номер телефона:</b> {phone}
                    </Text>
                  )}
                  {broker_blocker && (
                    <Text style={paragraph}>
                      <b>Брокер, где заблокированы средства:</b> {broker_blocker}
                    </Text>
                  )}
                  {blocked_volume && (
                    <Text style={paragraph}>
                      <b>Объем заблокированных средств:</b> {blocked_volume}
                    </Text>
                  )}
                </>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplate

const main = {
  backgroundColor: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: 16,
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '5px',
  overflow: 'hidden',
}

import ActionModule from '~/UI/ActionModule'

export default function Blog() {
  return (
    <ActionModule
      caption="Блог"
      title="Подпишитесь на наш телеграм-канал «Санкционный дозор»"
      link="https://t.me/sanctionsexplained"
      actionText="Telegram" // big square button
      actionButtonText="Подписаться на канал" // blue button
    />
  )
}

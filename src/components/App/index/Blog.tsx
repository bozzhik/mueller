import ActionModule from '~/UI/ActionModule'

export default function Blog() {
  return (
    <ActionModule
      caption="Блог"
      title="Подпишитесь на наш телеграм-канал «Санкционный дозор»"
      link="https://t.me/sanctionsexplained"
      showActionButton={true} // blue button
      actionButtonText="Подписаться на канал"
    />
  )
}

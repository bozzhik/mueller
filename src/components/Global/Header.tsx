import {DesktopHeader} from '~/Global/Header/DesktopHeader'
import {MobileHeader} from '~/Global/Header/MobileHeader'

export default function Header() {
  return (
    <div>
      <DesktopHeader />
      <MobileHeader />
    </div>
  )
}

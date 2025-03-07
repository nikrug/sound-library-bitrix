import { CustomSelectController } from '@shared/ui/fieldSelect/controller'
import { PopupController } from '@shared/ui/popup/controller'
import { initBlockClass } from '@shared/lib/helpers/initBlockClass'

initBlockClass('.j-popup', PopupController)
initBlockClass('.j-custom-select', CustomSelectController)

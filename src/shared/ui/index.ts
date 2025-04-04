import { CustomSelectController } from '@shared/ui/fieldSelect/controller'
import { PopupController } from '@shared/ui/popup/controller'
import { initBlockClass } from '@shared/lib/helpers/initBlockClass'
import "@shared/ui/slider-filter/slider-filter"

initBlockClass('.j-popup', PopupController)
initBlockClass('.j-custom-select', CustomSelectController)

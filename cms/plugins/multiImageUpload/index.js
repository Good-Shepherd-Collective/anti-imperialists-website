import {definePlugin} from 'sanity'
import {ImagesIcon} from '@sanity/icons'
import {MultiImageInput} from '../../components/MultiImageInput'

export const multiImageUpload = definePlugin({
  name: 'multi-image-upload',
  tools: [
    {
      name: 'multi-image-upload',
      title: 'Batch Upload Photos',
      icon: ImagesIcon,
      component: MultiImageInput
    }
  ]
}) 
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import stlSerializer from '@jscad/stl-serializer'

export const useDownloadGeom = (geometry: Geom3, name: string) => {
  const rawData = stlSerializer.serialize({ binary: true }, geometry)
  const blob = new Blob(rawData)
  const data = window.URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = data
  link.download = `${name}.stl`

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data)
    link.remove()
  }, 100)
}

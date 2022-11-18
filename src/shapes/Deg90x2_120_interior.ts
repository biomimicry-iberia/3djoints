import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union, subtract } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import {
  rotateZ,
  translateX,
  translateY,
  translateZ,
} from '@jscad/modeling/src/operations/transforms'
import { rectangle } from '@jscad/modeling/src/primitives'
import { degToRad } from '@jscad/modeling/src/utils'

export class Deg90x2_120_interior {
  woodThickness: number
  thickness: number
  height: number
  horizontal: Geom3
  vertical: Geom3
  tilted: Geom3
  subtract: Geom3[]

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.horizontal = this.setHorizontal()
    this.vertical = this.setVertical()
    this.tilted = this.setTilted()
    this.subtract = this.setSubtract()
  }

  private setHorizontal() {
    const length = 3 * this.woodThickness + this.thickness * 2
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [0, 0]

    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setVertical() {
    const length = this.woodThickness * 2.5 + this.thickness
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [0, 0]

    const rotated = rotateZ(
      degToRad(90),
      extrudeLinear({ height: this.height }, rectangle({ size, center }))
    )

    const translatedX = translateX(
      -((3 * this.woodThickness + this.thickness * 2) / 2) + width / 2,
      rotated
    )
    const translatedY = translateY(
      (length - (this.woodThickness + this.thickness * 2)) / 2,
      translatedX
    )
    return translatedY
  }

  private setTilted() {
    const length = this.woodThickness * 2 + this.thickness
    const width = this.woodThickness + this.thickness * 2
    const widthToRemove = this.woodThickness
    const size: [number, number] = [length, width]
    const sizeToRemove: [number, number] = [length - 2, widthToRemove]
    const center: [number, number] = [0, 0]

    const rect = extrudeLinear(
      { height: this.height },
      rectangle({ size, center })
    )
    const rectToRemove = translateX(
      this.thickness,
      extrudeLinear(
        { height: this.height },
        rectangle({ size: sizeToRemove, center })
      )
    )
    const rectWithout = subtract(rect, rectToRemove)

    const rotated = rotateZ(degToRad(30), rectWithout)

    const hip = Math.sqrt(Math.pow(length / 2, 2) + Math.pow(width / 2, 2))
    const arcot = Math.atan(width / length)
    const ang = degToRad(30) + arcot
    const Y = Math.sin(ang) * hip
    const translatedY = translateY(Y + this.woodThickness / 2, rotated)

    const ang2 = arcot - degToRad(30)
    const X = Math.cos(ang2) * hip
    const xDist =
      (3 * this.woodThickness + this.thickness * 2) / 2 -
      (this.woodThickness + this.thickness)

    const XTO_TRANSLATE = X - xDist

    const translatedX = translateX(XTO_TRANSLATE, translatedY)

    return translatedX
  }

  private setSubtract() {
    const length = 2 * this.woodThickness
    const width = this.woodThickness
    const size: [number, number] = [length, width]

    const rect = extrudeLinear(
      { height: this.height },
      rectangle({ size, center: [0, 0] })
    )

    // First
    const first = translateX(
      (3 * this.woodThickness + this.thickness * 2) / 2 - this.woodThickness,
      rect
    )

    // Second
    const rect2 = extrudeLinear(
      { height: this.height },
      rectangle({
        size: [this.woodThickness * 2.5, this.woodThickness],
        center: [0, 0],
      })
    )
    const secondRotated = rotateZ(degToRad(90), rect2)
    const secondTranslatedX = translateX(
      -((3 * this.woodThickness + 2 * this.thickness) / 2) +
        this.woodThickness / 2 +
        this.thickness,
      secondRotated
    )

    const second = translateY(
      (this.woodThickness * 2.5 - this.woodThickness) / 2,
      secondTranslatedX
    )

    // Third

    return [first, second]
  }

  public getUnion() {
    const mainBlock = union(this.horizontal, this.vertical, this.tilted)
    const without = subtract(mainBlock, this.subtract)
    return without
  }
}

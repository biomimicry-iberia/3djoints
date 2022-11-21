import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union, subtract } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import {
  translate,
  rotateZ,
  translateX,
  translateY,
  translateZ,
} from '@jscad/modeling/src/operations/transforms'
import { rectangle, triangle } from '@jscad/modeling/src/primitives'
import { degToRad } from '@jscad/modeling/src/utils'

export class Hinge {
  woodThickness: number
  thickness: number
  height: number
  base: Geom3

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.base = this.setBase()
  }

  private setBase() {
    const s = this.woodThickness + this.thickness * 2
    const t2d = triangle({ type: 'SSS', values: [s, s, s] })
    const t3d = extrudeLinear({ height: this.height }, t2d)

    const s2 = this.woodThickness
    const t2d2 = triangle({ type: 'SSS', values: [s2, s2, s2] })
    const t3d2 = extrudeLinear({ height: this.height }, t2d2)
    return subtract(t3d, translate([2, 1], t3d2))
  }

  public getUnion() {
    const mainBlock = union(
      this.triangle,
      this.rectangle1,
      this.rectangle2,
      this.rectangle3
    )
    // const without = subtract(mainBlock, this.subtract)
    return mainBlock
  }
}

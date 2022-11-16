import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import { rectangle } from '@jscad/modeling/src/primitives'

export class Deg90 {
  woodThickness: number
  thickness: number
  height: number
  topBar: Geom3
  rightBar: Geom3
  bottomBar: Geom3
  leftBar: Geom3

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.topBar = this.setTopBar()
    this.rightBar = this.setRightBar()
    this.leftBar = this.setLeftBar()
    this.bottomBar = this.setBottomBar()
  }

  private setTopBar() {
    const length = 3 * this.woodThickness + this.thickness * 2
    const center: [number, number] = [length / 2, this.thickness / 2]
    const size: [number, number] = [length, this.thickness]
    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setRightBar() {
    const length = 2 * this.woodThickness + this.thickness
    const center: [number, number] = [this.thickness / 2, length / 2]
    const size: [number, number] = [this.thickness, length]
    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setLeftBar() {
    const length = 2 * this.woodThickness + this.thickness
    const size: [number, number] = [this.thickness, length]
    const center: [number, number] = [length / 2 + this.thickness, length / 2]

    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setBottomBar() {
    const length = 2 * this.woodThickness
    const size: [number, number] = [length, this.thickness]
    const center: [number, number] = [
      length + this.thickness * 2,
      length / 2 + this.thickness + this.thickness / 2,
    ]
    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  public getUnion() {
    return union(this.topBar, this.rightBar, this.leftBar, this.bottomBar)
  }
}

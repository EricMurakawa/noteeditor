import { DecoratorNode } from 'lexical'

export default class ImageNode extends DecoratorNode {
  __src
  __alt

  static getType() {
    return 'image'
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__key)
  }

  constructor(src = '', alt = '', key) {
    super(key)
    this.__src = src
    this.__alt = alt
  }

  static importJSON(serializedNode) {
    const { src, alt } = serializedNode
    return new ImageNode(src, alt)
  }

  exportJSON() {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt
    }
  }

  createDOM() {
    const div = document.createElement("div")
    const img = document.createElement("img")
    img.src = this.__src
    img.alt = this.__alt
    div.appendChild(img)

    return div
  }

  updateDOM() {
    return false
  }
}

export function $createImageNode(src, alt = '') {
  return new ImageNode(src, alt)
}

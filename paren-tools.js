module.exports = core => {
  core.repl.keyEaters['('] = [
    function (key) {
      this.insertAtCursor(key)
      this.insertAtCursor(')')
      this.clear()
      this.x--
      this.preprint()
      this.print()
    }
  ]
  core.repl.keyEaters[core.keys.backspace] = [
    function (key) {
      const index = this.y * this.size() + this.x
      const currChar = this.currentInput[index - 1]
      const nextChar = this.currentInput[index]
      if ((currChar == '(') && (nextChar == ')')) {
        this.x++
        this.insertAtCursor(key)
      }
      this.insertAtCursor(key)
    }
  ]
  core.onBeforeProcess.push(function (src) {
    if (!src.startsWith('(') && !src.endsWith(')')) {
      return `(${src})`
    }
    return src
  })
}
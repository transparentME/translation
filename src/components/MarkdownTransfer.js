import showdown from 'showdown'
function MarkdownTransfer (content) {
  let converter = new showdown.Converter()
  let html = converter.makeHtml(content)
  return html
}
export default MarkdownTransfer

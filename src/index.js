
let result = `
/*你好，我是陈行雨
 *我将以动画的形式介绍我自己

 *只用文字介绍太单调了
 *我就用代码来介绍吧

 *首先我准备了一些样式
 */


*{
  transition: all 1s;
}
body{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 2px solid grey;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.function{
  color: #DD4A68;
}

/* 加点动画效果 */
#code{
  transform: rotate(360deg)
}

/* 我需要一张白纸 */
`

var result2 = `
#code{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
#paper{
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  background: grey;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#paper .content{
  background: white;
  height: 100%;
  width: 100%;
}
  `

var result3 =`
/* 
 * 接下来把Markdown 变成 HTML
 */
/* 
 * 这就是我的会动的简历，谢谢
 */
`


var md = `
# 自我介绍

我叫 陈行雨
浙江大学毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1.苹果风格轮播
2.会动的简历
3.Canvas画板

# 联系方式

wechat: phlvance
email: stanleychenxingyu@gmail.com
phone: 15857176621

`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2, () =>{
      writeMarkdown(md, () =>{
        writeCode(result+result2, result3, () =>{
          markdownToHtml(md)
        })   
      })
    })
  })
})

function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}

//把code写到code和Style标签里
function writeCode(prefix, code, fn){
  let n = 0;
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = code.substring(0, n)
    domCode.innerHTML = Prism.highlight(prefix + domCode.innerHTML, Prism.languages.css, 'css')
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}

function writeMarkdown(markdown, fn){
  let n = 0;
  let domPaper = document.querySelector('#paper > .content')
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}

function markdownToHtml(markdown){
  let domPaper = document.querySelector('#paper > .content')
  domPaper.innerHTML = marked(markdown)
}





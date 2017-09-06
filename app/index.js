import _ from 'lodash'
import $ from 'jquery'
//import bar from './bar'
import foo from './foo'

function component () {
  //var element = document.createElement('div');
  var element = $('<h2></h2>')

  /* lodash is required for the next line to work */
  //element.innerHTML = _.join(['Hello','webpack'], ' ');
  element.html(_.join(['Hello','webpack'], ' '))

  //return element;
  return element.get(0)
}

document.body.appendChild(component());
console.log(foo)
console.log(foo())
var html = '<div style="color:red;">'+foo()+'</div>'
$('body').append($(html))

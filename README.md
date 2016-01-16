## DraggableJS

### Description
Make javascript object become draggable and control another object with it.

### Install
Install directly from npm using command-line.
> npm install --save draggablejs

Or clone from github
> git clone https://github.com/nquangtrung/draggablejs

### Usage
First, prepare HTML and CSS documents, make sure you pay attention to `data-draggable-target` attribute.
```html
<div class="container" >
    <div class="windows" id="windows-1" >
        <div class="windows-top-bar" id="windows-draggable-1" data-draggable-target="windows-1" >
            Window
        </div>
        <div class="windows-content" >
            <!-- You windows content here -->
        </div>
    </div>
    <div class="windows" id="windows-2" >
        <div class="windows-top-bar" id="windows-draggable-2" data-draggable-target="windows-2" >
            Window
        </div>
        <div class="windows-content" >
            <!-- You windows content here -->
        </div>
    </div>
</div>
```
```css
.container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.windows {
    width: 300px;
    position: absolute;
}
.windows-top-bar {
    cursor: move;
    width: 100%;
    height: 20px;
}
.windows-content {
    width: 100%;
    height: 300px;
}
```
And then you only have to initialize the object
```javascript
var Draggable = require('draggable');
...
Draggable.init("windows-draggable-1", {
    onDragStart: function() {
        console.log("onDragStart");
    },
    onDrag: function() {
        console.log("onDrag");
    },
    onDrop: function() {
        console.log("onDrop");
    }
});
```
(function(exports, document) {
    var DraggableObj = function(el, listeners) {
            this.element = el;
            var targetId = this.element.getAttribute("data-draggable-target");
            if (targetId) {
                this.target = document.getElementById(targetId);
            } else {
                this.target = el;
            }

            this.listeners = listeners;
            this.init();
        };

    DraggableObj.prototype = {
        element : null,
        target : null,
        dragging : false,
        listeners : null,
        x_pos : 0,
        y_pos : 0,
        top : 0,
        left : 0,
        init : function() {
            this.element.onmousedown = (function(draggable) {
                return function() { draggable.dragInit() };
            })(this);
        },
        dragInit : function(ev) {
            //console.log("dragInit", this.target.offsetLeft, this.target.offsetTop);
            this.dragging = true;

            // Initial state
            this.left = this.target.offsetLeft;
            this.top = this.target.offsetTop;
            this.x_pos = window.event.clientX;
            this.y_pos = window.event.clientY;

            if (this.listeners && this.listeners.onDragStart) {
                this.listeners.onDragStart(this);
            }

            //console.log("dragInit window.event", window.event.clientX, window.event.clientY);
            //console.log("dragInit ev", ev.pageX, ev.pageY);
            //console.log("dragInit", this.left, this.top);
            //console.log("dragInit this.target.style", this.target.style.left, this.target.style.top);
            return false;
        },
        onMouseMove : function(ev) {
            //console.log("onMouseMove window.event", window.event.clientX, window.event.clientY);
            //console.log("onMouseMove ev", ev.pageX, ev.pageY);
            if (!this.dragging) {
                return;
            }

            var x_pos = document.all ? window.event.clientX : ev.pageX;
            var y_pos = document.all ? window.event.clientY : ev.pageY;

            this.target.style.left = (-this.x_pos + x_pos + this.left) + 'px';
            this.target.style.top = (-this.y_pos + y_pos + this.top) + 'px';
            //console.log("this.target.style", this.target.style.left, this.target.style.top);
            if (this.listeners && this.listeners.onDrag) {
                this.listeners.onDrag(this);
            }
        },
        onMouseUp : function(ev) {
            //console.log("onMouseUp");
            this.dragging = false;

            if (this.listeners && this.listeners.onDrop) {
                this.listeners.onDrop(this);
            }
        }
    };

    var _draggables = [];
    var _onmousemove = function(ev) {
        _draggables.forEach(function(obj, index, ary) {
            if (obj.dragging) {
                obj.onMouseMove(ev);
            }
        });
    };
    var _onmouseup = function(ev) {
        _draggables.forEach(function(obj, index, ary) {
            if (obj.dragging) {
                obj.onMouseUp(ev);
            }
        });
    };

    // Setup callback to catch mouse movements on the whole document
    document.onmousemove = _onmousemove;
    document.onmouseup = _onmouseup;

    exports.init = function(id, listeners) {
            var el = document.getElementById(id);
            _draggables.push(new DraggableObj(el, listeners));
        }
})(typeof module.exports === 'undefined'? this.Draggable = {} : module.exports, document);
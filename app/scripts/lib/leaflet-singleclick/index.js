// Source and license here: https://github.com/MazeMap/Leaflet.singleclick/tree/master
// NOTE: the default timeout value has been change for the project's needs
L.Evented.addInitHook( function () {
  this._singleClickTimeout = null;
  this.on( 'click', this._scheduleSingleClick, this );
  this.on( 'dblclick dragstart zoomstart', this._cancelSingleClick, this );
});

L.Evented.include({
  _cancelSingleClick : function(){
    // This timeout is key to workaround an issue where double-click events
    // are fired in this order on some touch browsers: ['click', 'dblclick', 'click']
    // instead of ['click', 'click', 'dblclick']
    setTimeout( this._clearSingleClickTimeout.bind(this), 0 );
  },

  _scheduleSingleClick: function(e) {
    this._clearSingleClickTimeout();

    this._singleClickTimeout = setTimeout(
        this._fireSingleClick.bind(this, e),
        (this.options.singleClickTimeout || 250)
    );
  },

  _fireSingleClick: function(e){
    if ( !e.originalEvent._stopped ) {
        this.fire( 'singleclick', L.Util.extend( e, { type : 'singleclick' } ) );
    }
  },

  _clearSingleClickTimeout: function(){
    if (this._singleClickTimeout != null) {
        clearTimeout( this._singleClickTimeout );
        this._singleClickTimeout = null;
    }
  }
});

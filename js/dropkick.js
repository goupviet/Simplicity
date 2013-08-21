
function hasClass( e, c ) { var r = new RegExp('(^|\\s+)' + c + '(\\s+|$)'); return r.test( e.className ) }
function addClass( e, c ) { if( !hasClass( e, c ) ) { e.className = e.className + ' ' + c } }
function removeClass( e, c ) { var r = new RegExp('(^|\\s+)' + c + '(\\s+|$)'); e.className = e.className.replace( r, '' ) }
function toggleClass( e, c ) { var fn = hasClass( e, c ) ? removeClass : addClass; fn( e, c ) }

function Select( elem ) {
	var select = elem,
		isOpen = false,
		selection = select.querySelector('.selected-option'),
		currentOption = select.querySelector('.option-selected'),
		optionsContainer = select.querySelector('.select-options'),
		options = Array.prototype.slice.call(select.querySelectorAll('.option')),
		searchString = '', searchTimeout,
		keys = {
			tab: 9,
			enter: 13,
			esc: 27,
			space: 32,
			up: 38,
			down: 40
		},
		doSelect = function( elem ) {
			removeClass( currentOption, 'option-selected');
			addClass( elem, 'option-selected' );
			selection.innerHTML = elem.innerHTML;
			currentOption = elem;
		},
		hijackKeys = function( e ) {
			var key = e.keyCode,
				curOptPos, nextOptPos;
			switch( key ) {
				case keys.up:
				case keys.down:
					e.preventDefault();
					curOptPos = options.indexOf(currentOption);
					d = key === keys.up ? -1 : 1;
					nextOptPos = curOptPos + d < 0 ? curOptPos : curOptPos + d;
					doSelect( options[nextOptPos] );
					break;
				case keys.tab:
				case keys.enter:
				case keys.esc:
					if( isOpen ) { 
						e.preventDefault();
						removeClass( select, 'select-open' );
						isOpen = hasClass( select, 'select-open' );
					}
					break;
				case keys.space:
					e.preventDefault();
					searchString = searchString + ' ';
					break;
				default:
					break;
			}
		},
		searchOptions = function( e ) {
			var keyChar = String.fromCharCode(e.keyCode),
				curOptPos = options.indexOf(currentOption),
				opts = options.slice(),
				regexp, i,
				waitToReset = function() {
					if( searchTimeout ) window.clearTimeout( searchTimeout );
					searchTimeout = window.setTimeout( function() { searchString = '' }, 1000);
				};
			if( keyChar !== undefined ) { 
				e.preventDefault
				waitToReset();
				searchString = searchString + keyChar;
				regexp = new RegExp('^' + searchString, 'i' );
				opts.splice(curOptPos, 1);
				for( i = 0; i < opts.length; i++ ) {
					if( regexp.test(opts[i].innerText) ) { doSelect( opts[i] ) }
				}
			}
		};

	select.addEventListener( 'click', function ( e ) {
		if( !isOpen ) { select.focus() }
		toggleClass( select, 'select-open' );
		isOpen = hasClass( select, 'select-open' );
		if( hasClass( e.target, 'option' ) ) { doSelect( e.target ) }
	});
	select.addEventListener( 'focus', function(){
		document.addEventListener( 'keydown', hijackKeys );
		document.addEventListener( 'keypress', searchOptions );
	});
	select.addEventListener( 'blur', function () {
		removeClass( select, 'select-open' );
		isOpen = hasClass( select, 'select-open' );
		document.removeEventListener( 'keydown', hijackKeys );
		document.removeEventListener( 'keypress', searchOptions );
	});
}
# Simplicity Framework

This "framework" just includes a basic grid structure, a nice set of typographic defaults, and a nice starting point for styling HTML Form Elements (which is a *bitch*).

I've made this framework modular and customizable (if you're using **SCSS**).

Just want the grid? `@import 'simplicity/grid';`

Just want the typography? `@import 'simplicity/typography';`

How about just the form stylings? `@import 'simplicity/forms';`

Or just import the whole thing! `@import 'simplicity';`

Take a look at the source files (under 'css/scss/') to find out what variables you can customize.

## Using the Grid

### CSS (SCSS)

I'd definitely recommend using the included SCSS mixins for the grid to avoid *stylesheet bloat*.

Whenever you need a certain sized grid or padding just do:

	@include col(1, 3);

\- or \-

	@include pad(1, 3);

That will compile into:

	.col-1-3 { 
		width: 33.3333333%;
	}

\- or \-

	.pad-1-3 {
		margin-left: 33.3333333%;
	}

To use the grids (and padding) in developement, where you don't really care about *stylesheet bloat* yet, do:

	@include dev-grid;

### HTML

To use your newly crafted grids just create some HTML with the appropriate classes.

	<div class='grid'>
		<div class='col-2-3'>...</div>
		<div class='col-1-3'>...</div>
		<div class='col-1-4 pad-1-4'>...</div>
		<div class='col-1-2'>...</div>
	</div>

*Note: It is recommended that you include another wrapper `div` within the columns so later when you're padding the content within the columns, you don't accidentally screw up the gutters.

[Check out the example page.](http://wwilsman.github.io/Simplicity)

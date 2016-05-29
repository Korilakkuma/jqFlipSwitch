jqFlipSwitch
=========
  
[![Build Status](https://travis-ci.org/Korilakkuma/jqFlipSwitch.svg?branch=master)](https://travis-ci.org/Korilakkuma/jqFlipSwitch)
  
jQuery Plugin for Flip-Switch
  
## Installation
  
    $ npm install jq-flip-switch
  
or,
  
    $ bower install jq-flip-switch
  
## Usage

This plugin requires jQuery (**greater than or equal to version 1.7**).
  
    <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.jqflipswitch.js"></script>
  
The CSS file is optional.
  
    <link rel="stylesheet" href="jqflipswitch.default.style.css" type="text/css" media="all" />
  
Of course, the style of flip-switch can be customized by creating the original CSS !!
  
In the case of using by default settings,
  
HTML
  
    <div id="flipswitch"></div>
  
JavaScript
  
    $(function() {
        $("#flipswitch").flipswitch();
    });
  
This plugin can also apply to checkbox.
  
HTML
  
    <input type="checkbox" id="flipswitch-checkbox" />
  
JavaScript
  
    $(function() {
        $("#flipswitch-checkbox").flipswitch();
    });
  
## API
  
* [API Document](https://korilakkuma.github.io/jqFlipSwitch/)
  
## License
  
Copyright (c) 2014 Tomohiro IKEDA (Korilakkuma)  
Released under the MIT license
  

watchmark
=========

watchmark is a small command line tool to watch a markdown file, parse and compile it to html and reflect the changes to a browser in real time using [socket.io](http://http://socket.io/)

The output uses the same stylesheet as readme files on github.

Installation
============
Pretty soon:

	npm install watchmark


Usage
=====
	watchmark README.md && open http://localhost:3000/README.md
	
Multifile support
-----------------
	watchmark *.md

Then open a browser on http://localhost:3000/filename.md 




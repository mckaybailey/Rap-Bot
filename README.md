# Rap-Bot

If you are here, then that means you are interested in my portfolio project. Like most software, 
this is not a finished product. It is a showcase of my knowledge as a programmer for potential employers. I am aware
that it is not particularly pretty, but I tried. I am not an aesthetically gifted individual.
 
## Description

The Concept of this web app is to make it easier for people to write any kind of literature. Upon signing in, you are 
presented with a list of the different "songs" you have saved, with the default title being "new song". If you click on the
title, you are brought to a page with the actual song loaded into the textbox, as well as a bunch of usefull information 
about the words in the textbox. If you are typing, it will show information about the word closest to the end of the textbox.
Otherwise, you can hover your mouse over the words, and whatever word you are hovering over is the word it will show 
information about. It shows you a list of words with a relationship to the word in focus. The relationship can be any of the 
radio buttons on the page from rhymes to synonims.

## Future Plans

Though the program is usable, there are many things that can be improved upon. One problem is that my hover function requires
html elements to be rendered over the textbox, directly over the words in the text box. When the app is loaded on a monitor
of a different size, the words do not line up perfect, so there is a copy of the words you typed, slightly above or below
their position in the textbox. To line them up properly, I have to either change the zoom of the webpage, or make the textbox a 
different height. I have tested this on three monitors, and at 160% zoom, the layout has stayed consistant across all three.
Plans for expansion include adding security precautions, largly reducing the amount of times it makes a query to the datamuse API so I can release it to the public, and potentially using it as a platform to teach people about the english language.

# "UX-Map" project
Practicing my UX/UI and React skills with a map. 

## Purpose of code
- To display points-of-interests on an interactive map
- To display information connected to the point of interests
- To have user friendly UI
- Possibility to choose between light and dark mode
- Responsive interface of web-app for desktop and mobile 

### To do: 

- edit get-request for marker to display all markers - currently only showing last index of array. 

## Design choices & inspiration 

- Semantic UI because it's compatible with all/most browsers and is mostly/can be made responsive. ~ less of a great choice in hindsight due to increased complexity when using a dark/light mode switch. 
- Centralized information looks better when screensizes vary - personal opinion. 
- Larger map to show surrounding areas/more of the nearby markers as well - limits clicking/scrolling for the user - gives information in an instance.
- Specific information shows up above map - to limit the amount of click/scroll for the user. 
- Specific information already compact - looks cleaner with less "extra fluff" - personal opinion. 
- Icons - looks more friendly/fun and easier to understand/remember what it is. 
- emotion-themeing package: found a up-to-date and relevant [quick walkthrough](https://levelup.gitconnected.com/adding-dark-mode-to-your-react-app-with-emotion-css-in-js-fc5c0f926838).
- Google Maps React [documentation](https://www.npmjs.com/package/google-maps-react)
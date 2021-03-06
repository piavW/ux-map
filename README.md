# "UX-Map" project
Practicing my UX/UI and React skills with a map. 

## Purpose of code
- To display points-of-interests on an interactive map
- To display information connected to the point of interests
- To have user friendly UI
- Possibility to choose between light and dark mode
- Responsive interface of web-app for desktop and mobile 

### Improvements which I chose to not prioritize due to "what is the MVP" and time-boxing:  
- have comments to functional code as well if necessary
- refactor mapComponent to functional component
- refactor mapComponent to smaller components
- add dark/light-theme styling to operatorInformation box. 
- could have more tests for what one sees. 
- sadpath error-message

## Design choices
- Semantic UI because it's compatible with all/most browsers and is mostly/can be made responsive. ~ less of a great choice in hindsight due to increased complexity when using a dark/light mode switch, might have been better with another package or only CSS. 
- Centralized information looks better when screensizes vary - personal opinion. 
- Larger map to show surrounding areas/more of the nearby markers as well - limits clicking/scrolling for the user - gives information in an instance. ~ Map could cover full with of window if on a smaller screen(like mobile or pad).
- Specific information shows up above map - to limit the amount of click/scroll for the user. 
- Specific information already compact - looks cleaner with less "extra fluff" - personal opinion. 
- Icons - looks more friendly/fun and easier to understand/remember what it is. 

## New/improved knowledge
- The need to define keys when listing in array using .map function [React documentation](https://reactjs.org/docs/lists-and-keys.html).
- How to create "dark-mode"[see walktrough](https://levelup.gitconnected.com/adding-dark-mode-to-your-react-app-with-emotion-css-in-js-fc5c0f926838).   
- *Improved knowledge of:*
  - How to use hooks and useState

## Inspiration/documentation used
- emotion-themeing & [emotion-core package](https://emotion.sh/docs/@emotion/core): found a up-to-date and relevant [quick walkthrough](https://levelup.gitconnected.com/adding-dark-mode-to-your-react-app-with-emotion-css-in-js-fc5c0f926838).
- Google Maps React [documentation](https://www.npmjs.com/package/google-maps-react)
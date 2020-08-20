## Overview

During the development of this application, I focused a lot on design.<br/>
To me, design in an application makes all the difference and is what defines a great app.<br/>
Most of the development time was spent working on the 'Carousel' component,<br/>
which makes up most of the UI. My goal was to create a simple yet attractive UI that is<br />
easily scalable across different devices, and that is why I went with the Carousel approach.

## Possible Improvements

### ViewPort Resizing Approach

I would use an 'AppContext' in the APP component and rather than passing the prop<br/>
'isMobile' in every component I needed it, I would have it exposed throughout my entire application.

### Proper Handling For Empty Results

Rather than simply closing the search widget and showing the user the regular lobby,<br/>
I could possibly dispatch a notification so as to make it clear to the user that no results were found.

### Single Responsibility For App Component

I would decouple the search logic from the App component. The App component should be<br/>
nothing more than a shell component and should not contain any unrelated logic.<br/>
I would possibly move this logic inside the 'useSearch'

### Better Component Structuring

Some components are to granular. An example of this is the 'CarouselButton' component.<br/>
This was created early on in the application and eventually I started splitting in a<br/>
more sensical way.

### Proper Error Handling

I would implement proper error feedback whenever an error is returned from API rather<br/>
than just logging said error.

### Mobile Styling Defect

When testing on the dev emulator, intermittently there seems to be some sort of overflow on the X-axis of the body,<br/>
even though I have overflow-x set to hidden. I tested it with multiple devices on which I could not replicate.<br/>
I tried investigating it but unfortunately I discovered It quite late.

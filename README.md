<!-- README Template thanks to: https://github.com/othneildrew/Best-README-Template -->

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

## weather_app (WIP)

<div>
    <details>
      <summary>Table of Contents</summary>
      <ul>
        <li><a href="#about-the-project">About The Project</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
      </ul>
    </details>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

-   My first independent project, not tied to assignments or exercises
-   To prioritise implementation over product intricacies and thus deepen my knowledge, I decided to go for a common web app idea, rather than diving into a more unique project right away
-   The creative side of things is still important for me, so I thought to customise my app by offering clothing and accessory recommendations based on weather parameters, which can be customised in the user preferences

### Built With

<!-- BADGES -->
<!-- https://ileriayo.github.io/markdown-badges/ -->

-   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
-   [![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
-   [![MUI](https://img.shields.io/badge/Material_UI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
-   [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   ```sh
    npm install npm@latest -g
    ```

### Installation

-   ```sh
    git clone https://github.com/nikogenix/weather_app.git
    ```
-   ```sh
    npm install
    ```

### Starting the project

-   ```sh
    npm run dev
    ```

    ...or to access the project on mobile

-   ```sh
    npm run dev -- --host
    ```

    ...or build and preview the project

-   ```sh
    npm run build
    npm run preview
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage (WIP)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [ ] app bar
    -   [x] nav buttons / menu for mobile
    -   [ ] search
        -   [x] autocomplete location with API data
            -   [x] debounce requests
        -   [ ] option to select location on map
        -   [ ] option to search based on user's location
        -   [x] date & time selection
            -   [x] choose current time by default
            -   [x] integrate date into API request
            -   [x] limit date range based on API availability
        -   [ ] display country flags
        -   [ ] search history
        -   [ ] bookmarked locations - save & remove
        -   [ ] improve UX
            -   [ ] allow search when user presses enter
            -   [ ] disable search when there is no location selected/no input
    -   [x] dark/light mode
    -   [x] unit preference (metric/imperial)
        -   [x] refetch API data upon changing the preference
    -   [ ] user menu
        -   [x] menu UI
        -   [ ] login/signup UI
        -   [ ] auth functionality
        -   [ ] settings UI
            -   [ ] dark/light mode
            -   [ ] unit preference
            -   [ ] slider based options for clothing/accessory
            -   [ ] customise the c/a items
            -   [ ] reset settings
        -   [ ] persist settings data
            -   [ ] guest mode (local storage)
            -   [ ] user settings (DB)
            -   [ ] carry over guest settings upon account creation
-   [ ] weather content & clothing/accessory recommendation
    -   [ ] home page
        -   [ ] current time
            -   [x] weather panel
                -   [x] wind direction icon
            -   [ ] c/a panel
        -   [ ] hourly/daily
            -   [x] daily timeline
            -   [x] hourly weather
                -   [x] graph
                -   [x] timeline
            -   [ ] c/a recommendations in the details section for each day
        -   [ ] warnings for severe weather conditions
    -   [ ] trip page
        -   [ ] store multiple search results
        -   [ ] option to remove one/all
        -   [ ] display weather & c/a next to each trip location
        -   [ ] c/a overview panel for the whole trip
    -   [ ] others
        -   [x] tooltips
            -   [x] aqi ranges
            -   [x] uv
-   [x] footer
    -   [x] scroll animation
-   [ ] others
    -   [ ] improve style and responsiveness
    -   [ ] verify accessibility
        -   [x] icon descriptions
    -   [ ] error handling
        -   [x] displaying "n/a" when no data is available
    -   [ ] testing
    -   [ ] performance
-   [ ] bugs
    -   [ ] "Maximum update depth exceeded" warning [1] in the clock from the date picker, when holding down the mouse and dragging for an extended amount of time and [2] in the weather graphs, when hovering

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU AGPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

-   Open-Meteo
    -   [Weather Forecast API](https://open-meteo.com/en/docs)
    -   [Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
    -   [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
-   [Weather Icons](https://erikflowers.github.io/weather-icons/)
-   [README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

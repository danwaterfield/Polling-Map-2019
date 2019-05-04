# Polling Map 2019
Poll Aggregation

- The Election Results are taken from [the Government record](https://data.gov.uk/dataset/b77fcedb-4792-4de4-935f-4f344ed4c2c6/general-election-results-2017) and put into a [Google Sheet](https://docs.google.com/spreadsheets/d/1wRoYhZjzj4RU9mStNORmWgbA1kdOr229c0S_eWJU2Hs/edit#gid=1511842994)
- Polling is taken from [Wikipedia collation](https://en.wikipedia.org/wiki/Opinion_polling_for_the_next_United_Kingdom_general_election) and put into a [Google Sheet](https://docs.google.com/spreadsheets/d/1SGSY9PxrHFAft206UQSHMleqam7-qEhiqCXsFXgRYt8/edit#gid=0)
- Map is a modified version of the Leeds site [version](https://odileeds.org/projects/hexmaps/constituencies/) (2px borders are added, background is removed, gaps are made to be #d3d3d3)
- Charts handled by [chart.js](https://www.chartjs.org/)
- Darkening colours is handled by a [library](https://github.com/shybovycha/darken_color.js), drawing's done on inkscape
- Pan/Zoom is handled by this [library](https://github.com/ariutta/svg-pan-zoom/)
- Site testing is done using [Live Reload](https://github.com/lepture/python-livereload) + a Chrome extension which clears the Cache 

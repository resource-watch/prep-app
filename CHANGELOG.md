# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2017-12-22

### Fixed
- Bug interacting with opacity button in legend control.
- Fixed ImageService layers.
- Fixed DynamicService layers.
- Fixed FeatureService layers.

### Added
- Added tags and filtering like ResourceWatch project.
- Added support for NexGDDP layers.
- Added Support for GEE layers.
- Added basemap control in explore map.
- Including description in explore datasets.
- Resources page from API.
- Linking datasets from explore dataset list.
- Added widget editor in dataset page.
- Added support for markdown in datasets.

### Changed
- User authentication to use localStorage.
- Changed explore sidebar with tabs.
- Changed zoom and map control styles.
- Using icons component in map.
- Filter now is opened in dropdown.


## [1.1.0] - 2017-09-26

### Fixed
- Datasets with published false were been showed in explore page.
- Twitter feed was failing with new API structure.
- Widget was not been showed in dataset page.
- Description of datasets was failing in some cases.
- Published datasets was not working in dataset edition.
- Widget was broken for Vega charts created by widget editor.
- Removing `/api` in actions files to solve 404 errors.
- In admin adding a widget in dataset tab redirects to blank page. Now it redirects to correct page.

### Added
- Panel info in explore page with dataset page instead modal window.
- Showing widgets for datasets in the new panel info.
- Added download button in new panel info.
- In new panel info added map button to show dataset's layers in the map.
- In new panel info added learn more button to redirect to dataset detail.
- Added support for multilayers in legend.
- Added control for layer opacity in legend.
- Added theme file for vega charts.
- Added support for GDDP datasets in widget editor.
- Added support for rasters in widget editor.
- Added support for GDDP datasets in dataset creation form.
- Added support for rasters in dataset creation form.
- Static files has been migrated to S3 Amazon.
- Added changelog :)
- Added support for more layer providers in explore map.

### Changed
- Updated Vega to 2.6.0 version to support theme files.
- Datasets name now takes name from medata info.
- Updated widget editor.
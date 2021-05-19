/* -------------------------------------------------------------------------- */
/*                              TYPE DEFINITIONS                              */
/* -------------------------------------------------------------------------- */

/**
 * # PbixMetaData
 * ## Report/Metadata
 * @typedef { object } PbixMetaData
 * @property {number} version
 * @property {any[] } autoCreatedRelationships
 * @property {string} fileDescription
 * @property {string} createdFrom
 * @property {string} createdFromRelease
 */

/**
 * # LayoutFile
 * ## Report/Layout
 * This is the root of the Layout file
 * @typedef  { object } LayoutFile
 * @property { number } id
 * @property { object[] } resourcePackages
 * @property { LayoutSection[] } sections
 * @property { object } config
 * @property { number } layoutOptimization
 */

/**
 * # LayoutSection
 * ## Layout.sections[ LayoutSection ]
 * @typedef  { object } LayoutSection
 * @property { number } id
 * @property { string } name
 * @property { string } displayName
 * @property { object[] } filters Applied Page Filters
 * @property { number } ordinal Page Number
 * @property { VisualContainer[] } visualContainers PBI Visuals
 * @property { object } config
 * @property { 1|2|3 } displayOption Page View Options (1= fit to page, 2= fit to width, 3= actual size)
 * @property { number } width   Page Width
 * @property { number } height  Page Height
 */

/**
 * # VisualContainer
 * ## Layout.sections[ LayoutSection.visualContainers[VisualContainer] ]
 * A config for each section
 * @typedef  { object } VisualContainer
 * @property { number } x x-Axis (Left-Right)
 * @property { number } y y-Axis (Bottom-Top)
 * @property { number } z z-Axis (Layer Stack)
 * @property { number } width Width of Visualization
 * @property { number } height Height of Visualization
 * @property { string } config
 * @property { object[] } filters
 * @property { string } query Stringified Object
 * @property { string } dataTransforms
 */

/**
 * # LayoutSectionConfig
 * ## Layout.sections[ LayoutSection.config ]
 * A config for each section
 * @typedef  { object } LayoutSectionConfig
 * @property { object[] } layouts
 * @property { string } name
 * @property { SingleVisual } singleVisual
 */

/**
 * @typedef  { object } SingleVisual
 * @property { string } visualType
 * @property { Projections } projections
 * @property { object[] } prototypeQuery
 * @property { boolean } drillFilterOtherVisuals
 */

/**
 * @typedef  { object } Projections
 * @property { ProjectionValue[] } Values
 */

/**
 * @typedef  { object }   ProjectionValue
 * @property { string }   queryRef
 * @property { boolean }  active
 */

/** @ignore */
module.exports = {};

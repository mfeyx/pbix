/* -------------------------------------------------------------------------- */
/*                              TYPE DEFINITIONS                              */
/* -------------------------------------------------------------------------- */

/**
 * @typedef { object } PbixMetaData
 * @property {number} version
 * @property {any[] } autoCreatedRelationships
 * @property {string} fileDescription
 * @property {string} createdFrom
 * @property {string} createdFromRelease
 */

/**
 * ### Report/Layout
 * This is the root of the Layout file
 * @typedef  { object } LayoutFile
 * @property { number } id
 * @property { object[] } resourcePackages
 * @property { LayoutSection[] } sections
 * @property { object } config
 * @property { number } layoutOptimization
 */

/**
 * Layout.sections
 * @typedef  { object } LayoutSection
 * @property { number } id
 * @property { string } name
 * @property { string } displayName
 * @property { object[] } filters
 * @property { number } ordinal
 * @property { LayoutSectionVisualContainer[] } visualContainers
 * @property { object } config
 * @property { number } displayOption
 * @property { number } width
 * @property { number } height
 */

/**
 * ### Layout.sections[].config
 * A config for each section
 * @typedef  { object } LayoutSectionVisualContainer
 * @property { number } x
 * @property { number } y
 * @property { number } z
 * @property { number } width
 * @property { number } height
 * @property { string } config
 * @property { string } filters Stringified Array
 * @property { string } query Stringified Object
 * @property { string } dataTransforms
 */

/**
 * ### Layout.sections[].config
 * A config for each section
 * @typedef  { object } LayoutSectionConfig
 * @typedef  { object[] } layouts
 * @property { string } name
 * @property { SingleVisual } singleVisual
 */

/**
 * @typedef  { object } SingleVisual
 * @property { string } visualType
 * @property { object[] } projections
 * @property { object[] } prototypeQuery
 * @property { boolean } drillFilterOtherVisuals
 */

/**
 * @typedef  { object } Projection
 * @property { ProjectionValue[] } Values
 */

/**
 * @typedef  { object } ProjectionValue
 * @property { string } queryRef
 */

/** @ignore */
module.exports = {};

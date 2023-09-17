/**
 * @summary Exports an side bar definition
 * @returns An Export reference containing a single sidebar instance
 * @type Export = { [sideBarId: string]: SideBar }
 * @type SideBar = { [pageGroupId: string]: PageGroup }
 * @type PageGroup = { [pageId: string]: PageId[] }
 * @type PageId = string
 */
module.exports = {
  presenceBotSidebar: {
    'Presence System': [ 
      'presence-bot',
      'presence-ui',
      'presence-cube',
      'presence-twin',
      'presence-docs',
      'presence-glossary'
    ],
  }
};

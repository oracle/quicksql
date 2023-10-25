var cs = {};
cs.colors = [];

// Font
cs.FONT_FAMILY = 'var(--qs-diagram-font-family, "Arial")';

// Tables
cs.colors.TABLE_BACKGROUND = 'var(--qs-diagram-table-background-color, rgb(254,246,222))';
cs.colors.TABLE_BORDER = 'var(--qs-diagram-table-border-color, rgba(0,0,0,.1))';
cs.colors.TABLE_NAME_TEXT = 'var(--qs-diagram-table-name-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))';
cs.colors.TABLE_COLUMN_TEXT = 'var(--qs-diagram-table-column-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.8)))';
cs.colors.TABLE_DATA_TYPE_TEXT = 'var(--qs-diagram-table-data-type-text-color, var(--qs-diagram-table-text-color, rgba(0,0,0,.4)))';
cs.TABLE_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue('--qs-diagram-table-border-radius');
cs.TABLE_BORDER_RADIUS = cs.TABLE_BORDER_RADIUS ? cs.TABLE_BORDER_RADIUS : 0;

// Views (not available yet)
cs.colors.VIEW_BACKGROUND = 'var(--qs-diagram-view-background-color, rgb(236,245,231))';
cs.colors.VIEW_BORDER = 'var(--qs-diagram-view-border-color, rgba(0,0,0,.1))';
cs.colors.VIEW_NAME_TEXT = 'var(--qs-diagram-view-text-color, rgb(0,0,0))';
cs.colors.VIEW_COLUMN_TEXT = 'var(--qs-diagram-view-column-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.8)))';
cs.colors.VIEW_DATA_TYPE_TEXT = 'var(--qs-diagram-view-data-type-text-color, var(--qs-diagram-view-text-color, rgba(0,0,0,.4)))';
cs.VIEW_BORDER_RADIUS = getComputedStyle(document.documentElement).getPropertyValue('--qs-diagram-view-border-radius');
cs.VIEW_BORDER_RADIUS = cs.VIEW_BORDER_RADIUS ? cs.VIEW_BORDER_RADIUS : 4;

// Links & Arrows
cs.colors.LINK = 'var(--qs-diagram-link-color, rgba(140,140,140,1))';

export default cs;

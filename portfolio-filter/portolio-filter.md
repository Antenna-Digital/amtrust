## Portfolio Filter

v2 of finsweet list filter with finsweets custom form select
https://finsweet.com/attributes/list-filter
https://finsweet.com/attributes/custom-form-select

- one portfolio filter for all portfolio items

- filter by category (slug is 'type')
- filter by location (slug is 'location')
- both filters can be used at the same time but only one value can be selected for each filter

the filter is setup and working completely fine.

### ✅ COMPLETED - Dynamic Filter Result Text

The dynamic filter result text has been implemented in `scripts.js` using the Finsweet v2 API.

**Implementation:**
- Uses Finsweet's `cmsfilter` API to listen for filter changes
- Dynamically updates text based on active filters
- Includes fallback listeners for direct select changes and DOM mutations

**Text Output:**
- **Both filters used:** `{count} {type} properties found in {location}.`
- **Only location filter:** `{count} properties found in {location}.`
- **Only type filter:** `{count} {type} properties found.`
- **No filters:** `{count} properties found.`
- **No results:** `No properties found.`

**Required HTML Element:**
Add this element to your Webflow page where you want the result text to appear:
```html
<div class="filter-text">Loading...</div>
```

**Required Select IDs:**
- Location select: `id="location-select"`
- Type select: `id="type-select"`

**Required Attributes:**
- Portfolio list container: `fs-cmsfilter-element="list"` with class `portfolio-list`
- Portfolio items: `fs-cmsfilter-element="item"`

Current HTML:

```html
<div class="portfolio_fitlers"><div>Filter by</div><div class="w-form"><div class="css-to-overide-select w-embed"><style>
  .w-select { -webkit-appearance: none; -moz-appearance: none; }
  .fs-selectcustom_link:focus { border-color: #285780; }
  .fs-selectcustom_link:visited, .fs-selectcustom_link.w--current { color: #fff; background-color: var(--_colors---tan); }
  .fs-selectcustom_dropdown { width: 15rem; }
</style></div><form id="wf-form-Filter-Form" name="wf-form-Filter-Form" data-name="Filter Form" method="get" fs-list-element="filters" class="filter-form" data-wf-page-id="6967c4a0826c7bae582b98a4" data-wf-element-id="827c425f-2758-e008-2343-e96375c0e04d" aria-label="Filter Form"><div data-delay="0" data-hover="false" fs-selectcustom-hideinitial="true" fs-selectcustom-element="dropdown" class="fs-selectcustom_dropdown helper filter-select-field w-dropdown"><div class="fs-selectcustom_dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-0" aria-controls="w-dropdown-list-0" aria-haspopup="listbox" aria-expanded="false" role="button" tabindex="0"><div class="fs-selectcustom_icon w-icon-dropdown-toggle" aria-hidden="true"></div><div>By Location</div></div><div class="fs-selectcustom_dropdown-list w-dropdown-list" id="w-dropdown-list-0" aria-labelledby="w-dropdown-toggle-0" role="listbox" aria-multiselectable="false"><select class="select-field-2 w-select" fs-list-instance="location" fs-list-field="location" name="Select" fs-list-element="select" data-name="Select" id="Select"><option value="">By Location</option><option value="Florida">Florida</option><option value="Illinois">Illinois</option><option value="New York">New York</option><option value="Ohio">Ohio</option><option value="Arizona">Arizona</option></select><a fs-selectcustom-element="clear" href="#" class="clear_link_block w-inline-block w--current" tabindex="0" role="option" aria-selected="true" style="display: none;"><div>&lt; Clear Selection</div></a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Florida</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Illinois</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">New York</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Ohio</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Arizona</a></div></div><div data-delay="0" data-hover="false" fs-selectcustom-hideinitial="true" fs-selectcustom-element="dropdown" class="fs-selectcustom_dropdown helper filter-select-field w-dropdown"><div class="fs-selectcustom_dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-1" aria-controls="w-dropdown-list-1" aria-haspopup="listbox" aria-expanded="false" role="button" tabindex="0"><div class="fs-selectcustom_icon w-icon-dropdown-toggle" aria-hidden="true"></div><div>By Type</div></div><div class="fs-selectcustom_dropdown-list w-dropdown-list" id="w-dropdown-list-1" aria-labelledby="w-dropdown-toggle-1" role="listbox" aria-multiselectable="false"><select class="select-field-2 w-select" fs-list-instance="type" fs-list-field="type" name="Select" fs-list-element="select" data-name="Select" id="Select-Type"><option value="">By Type</option><option value="Office">Office</option><option value="Luxury Residential">Luxury Residential</option><option value="Mixed-use">Mixed-use</option></select><a fs-selectcustom-element="clear" href="#" class="clear_link_block w-inline-block w--current" tabindex="0" role="option" aria-selected="true" style="display: none;"><div>&lt; Clear Selection</div></a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Office</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Luxury Residential</a><a href="#" class="fs-selectcustom_link w-dropdown-link" tabindex="-1" role="option" aria-selected="false">Mixed-use</a></div></div></form><div class="w-form-done" tabindex="-1" role="region" aria-label="Filter Form success"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail" tabindex="-1" role="region" aria-label="Filter Form failure"><div>Oops! Something went wrong while submitting the form.</div></div></div><div class="filter-text">Use the filters to focus your search.</div><div class="hide w-dyn-list"><div fs-list-element="list" fs-list-instance="location" role="list" class="w-dyn-items"><div role="listitem" class="w-dyn-item"><div fs-list-instance="location" fs-list-element="select-value">Florida</div></div><div role="listitem" class="w-dyn-item"><div fs-list-instance="location" fs-list-element="select-value">Illinois</div></div><div role="listitem" class="w-dyn-item"><div fs-list-instance="location" fs-list-element="select-value">New York</div></div><div role="listitem" class="w-dyn-item"><div fs-list-instance="location" fs-list-element="select-value">Ohio</div></div><div role="listitem" class="w-dyn-item"><div fs-list-instance="location" fs-list-element="select-value">Arizona</div></div></div></div><div class="hide w-dyn-list"><div fs-list-instance="type" fs-list-element="list" role="list" class="w-dyn-items"><div role="listitem" class="w-dyn-item"><div fs-list-element="select-value" fs-list-instance="type">Office</div></div><div role="listitem" class="w-dyn-item"><div fs-list-element="select-value" fs-list-instance="type">Luxury Residential</div></div><div role="listitem" class="w-dyn-item"><div fs-list-element="select-value" fs-list-instance="type">Mixed-use</div></div></div></div></div>
```

## docs
https://github.com/finsweet/attributes/blob/master/packages/list/README.md
https://github.com/finsweet/attributes/blob/master/packages/selectcustom/README.md
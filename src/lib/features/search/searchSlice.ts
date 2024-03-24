import { PayloadAction, createReducer, createSlice } from "@reduxjs/toolkit"

export interface Search {
    filters: Filters
}

export type Filters = {
    type: Filter[],
    searchBy: Filter[]
}

export type Filter = {
    id: string,
    name: string,
    checked: boolean
}

const initialState: Search = {
    filters: {
        type: [
            {
                id: "USER",
                name: "User",
                checked: false
            },
            {
                id: "ORGANIZATION",
                name: "Organization",
                checked: false
            },
            {
                id: "BLOG",
                name: "Blog",
                checked: false
            }
        ],
        searchBy: [
            {
                id: "USER_NAME",
                name: "User Name",
                checked: false
            },
            {
                id: "ORGANIZATION_NAME",
                name: "Organization Name",
                checked: false
            },
            {
                id: "BLOG_TITLE",
                name: "Blog Title",
                checked: false
            },
            {
                id: "BLOG_CONTENT",
                name: "Blog Content",
                checked: false
            },
            {
                id: "PROFILE_ID",
                name: "Profile Id",
                checked: false
            }
        ]
    }
}

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.filters.type = state.filters.type.map(filter => {
                if (filter.id === id) {
                    filter.checked = !filter.checked;
                }
                return filter;
            });
            state.filters.searchBy = state.filters.searchBy.map(filter => {
                if (filter.id === id) {
                    filter.checked = !filter.checked;
                }
                return filter;
            });
        },
        setFilters: (state, action: PayloadAction<Filter[]>) => {
            const filters = action.payload;
            state.filters.type = state.filters.type.map(filter => {
                if (filters.some(filt => filt.id === filter.id)) {
                    filter.checked = true;
                } else {
                    filter.checked = false;
                }
                return filter;
            });
            state.filters.searchBy = state.filters.searchBy.map(filter => {
                if (filters.some(filt => filt.id === filter.id)) {
                    filter.checked = true;
                } else {
                    filter.checked = false;
                }
                return filter;
            });
        }
    }
});

export const { toggleFilter, setFilters } = searchSlice.actions;
export default searchSlice.reducer;
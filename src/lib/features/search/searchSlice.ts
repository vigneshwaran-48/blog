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
    checked: boolean,
    type: "type" | "searchBy"
}

const initialState: Search = {
    filters: {
        type: [
            {
                id: "USER",
                name: "User",
                checked: false,
                type: "type"
            },
            {
                id: "ORGANIZATION",
                name: "Organization",
                checked: false,
                type: "type"
            },
            {
                id: "BLOG",
                name: "Blog",
                checked: false,
                type: "type"
            }
        ],
        searchBy: [
            {
                id: "USER_NAME",
                name: "User Name",
                checked: false,
                type: "searchBy"
            },
            {
                id: "ORGANIZATION_NAME",
                name: "Organization Name",
                checked: false,
                type: "searchBy"
            },
            {
                id: "BLOG_TITLE",
                name: "Blog Title",
                checked: false,
                type: "searchBy"
            },
            {
                id: "BLOG_CONTENT",
                name: "Blog Content",
                checked: false,
                type: "searchBy"
            },
            {
                id: "PROFILE_ID",
                name: "Profile Id",
                checked: false,
                type: "searchBy"
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